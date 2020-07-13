import * as actionTypes from '../authActionTypes';
import {
  clearCart,
  getCart,
  getCartFromLocalStorage,
} from '../../cart/cartActions/cartActions';
import { getOrders } from '../../checkout/checkoutActions/checkoutActions';
import axios from 'axios';
import { secureStorage } from '../../../shared/secureStorage';
import { setErroredAction } from '../../ui/uiActions/uiActions';
import * as actionDisplays from '../../ui/actionDisplays';

/* To show loading in UI when authentication action has started */
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

/* Successfully authenticated user and received token/userid */
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

/* Set error to be displayed in UI when authentication has failed */
export const signInFailed = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    error: error,
  };
};

/* Set error to be displayed in UI when authentication has failed */
export const signUpFailed = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    error: error,
  };
};

/* Clear user data and cart on sign out */
export const signOut = () => {
  return (dispatch) => {
    secureStorage.removeItem('idToken');
    secureStorage.removeItem('expirationTime');
    secureStorage.removeItem('userId');
    dispatch(clearCart());
    dispatch({
      type: actionTypes.AUTH_SIGNOUT,
    });
  };
};

/* Sign out user when expiration time has been reached */
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime * 1000);
  };
};

/* Sign in user with email/password.
   Also get user's cart and orders onced successfully signed in */
export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        authData
      )
      .then((res) => {
        secureStorage.setItem('idToken', res.data.idToken);

        secureStorage.setItem(
          'expirationTime',
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        secureStorage.setItem('userId', res.data.localId);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
        dispatch(getCart(res.data.idToken, res.data.localId));
        dispatch(getOrders(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        dispatch(setErroredAction(actionDisplays.SIGN_IN));
        dispatch(signInFailed(err.response.data.error));
      });
  };
};

/* Sign up user with email/password */
export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        authData
      )
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        dispatch(setErroredAction(actionDisplays.SIGN_UP));
        dispatch(signUpFailed(err.response.data.error));
      });
  };
};

/* Initialize application upon app load */
export const initApp = () => {
  return (dispatch) => {
    const emptyCart = { items: {}, quantity: 0 };
    let localCart = null;
    try {
      localCart = secureStorage.getItem('cart');
    } catch (error) {
      secureStorage.setItem('cart', emptyCart);
    }

    if (!localCart) {
      secureStorage.setItem('cart', emptyCart);
    }

    const idToken = secureStorage.getItem('idToken');
    let timeToExpire = 0;
    //if user's session still alive, get user's cart and orders
    if (idToken) {
      const expirationTime = secureStorage.getItem('expirationTime');
      timeToExpire = new Date(expirationTime).getTime() - new Date().getTime();
      if (timeToExpire > 0) {
        const userId = secureStorage.getItem('userId');
        dispatch(authSuccess(idToken, userId));
        dispatch(checkAuthTimeout(timeToExpire / 1000));
        dispatch(getCart(idToken, userId));
        dispatch(getOrders(idToken, userId));
      }
    }
    //if user's session expired, get local storage cart
    else if (!idToken || timeToExpire <= 0) {
      dispatch(getCartFromLocalStorage());
    }
  };
};
