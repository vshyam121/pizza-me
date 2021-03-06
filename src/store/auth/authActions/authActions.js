import * as actionTypes from '../authActionTypes';
import {
  signOutCart,
  getCartFromLocalStorage,
  getCart,
} from '../../cart/cartActions/cartActions';
import { getOrders } from '../../checkout/checkoutActions/checkoutActions';
import axios from '../../../shared/axiosAPI';
import { setErroredAction } from '../../ui/uiActions/uiActions';
import * as actionErrors from '../../../shared/actionErrors';
import { getOrCreateLocalCart } from '../../../shared/util';
import { history } from '../../../index';

/* To show loading in UI when authentication action has started */
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

/* Reset auth error after unmounting an auth component */
export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET,
  };
};

/* Failed to initialize app */
export const authTokenFailed = () => {
  return {
    type: actionTypes.AUTH_TOKEN_FAILED,
  };
};

/* Successfully authenticated user and received token/userid */
export const authSuccess = (authData) => {
  return (dispatch) => {
    if (authData.token) {
      localStorage.setItem('token', authData.token);
    }
    dispatch({ type: actionTypes.AUTH_SUCCESS, userId: authData.user._id });

    //Get cart for this user
    dispatch(getCart());

    //Set automatic sign out
    dispatch(checkAuthTimeout(authData.expires));

    //Get orders for this user
    dispatch(getOrders());
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
    localStorage.removeItem('token');

    dispatch(signOutCart());

    dispatch({
      type: actionTypes.AUTH_SIGNOUT,
    });

    history.push({ pathname: '/', fromSignOut: true });
  };
};

/* Sign out user when expiration time has been reached */
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    //Calculate time to expire based on exact time of expiration
    let timeToExpire = expirationTime - new Date().getTime();

    //Dispatch sign out action in time to expire
    setTimeout(() => {
      dispatch(signOutCart());
      dispatch(signOut());
    }, timeToExpire);
  };
};

/* Sign in user with email/password.
   Also get user's cart and orders once successfully signed in */
export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    return axios
      .post('/auth/signin', authData)
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        dispatch(setErroredAction(actionErrors.SIGN_IN));
        if (err.response) {
          dispatch(signInFailed(err.response));
        } else {
          dispatch(signInFailed(null));
        }
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
    };
    return axios
      .post('/auth/signup', authData)
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        dispatch(setErroredAction(actionErrors.SIGN_UP));
        if (err.response) {
          dispatch(signUpFailed(err.response));
        } else {
          dispatch(signUpFailed(null));
        }
      });
  };
};

/* Initialize application upon app load */
export const authenticateToken = () => {
  return (dispatch) => {
    getOrCreateLocalCart();

    return axios
      .get('/auth/me')
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch(() => {
        //If an error with api, then get cart from secure local storage
        dispatch(getCartFromLocalStorage());
        dispatch(setErroredAction(actionErrors.AUTH_TOKEN));
      });
  };
};
