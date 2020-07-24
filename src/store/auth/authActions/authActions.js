import * as actionTypes from '../authActionTypes';
import {
  signOutCart,
  setCartItems,
  getCartFromLocalStorage,
  combineCarts,
} from '../../cart/cartActions/cartActions';
import { getOrders } from '../../checkout/checkoutActions/checkoutActions';
import axios from '../../../shared/axiosAPI';
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
export const authSuccess = (authData) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_SUCCESS, userId: authData.user._id });
    //Get cart from secure local storage
    let localCart = secureStorage.getItem('cart');

    //If items in local cart, combine local cart with backend cart
    if (localCart.quantity > 0) {
      dispatch(combineCarts(authData.user));
    }
    //Otherwise, just set cart from backend cart
    else {
      dispatch(setCartItems(authData.user.cart));
    }

    //Set automatic sign out
    dispatch(checkAuthTimeout(authData.expires));

    //Get orders for this user
    dispatch(getOrders(authData.user._id));
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
    axios.post('/auth/logout', {}).then(() => {
      dispatch(signOutCart());

      dispatch({
        type: actionTypes.AUTH_SIGNOUT,
      });
    });
  };
};

/* Sign out user when expiration time has been reached */
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    //Calculate time to expire based on exact time of expiration
    let timeToExpire =
      new Date(expirationTime).getTime() - new Date().getTime();

    //Dispatch sign out action in time to expire
    setTimeout(() => {
      dispatch(signOut());
    }, timeToExpire);
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
    };
    await axios
      .post('/auth/login', authData)
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
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
    };
    axios
      .post('/auth/register', authData)
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
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
    const emptyCart = { items: {}, pizzaHashMap: {}, quantity: 0 };
    let localCart = null;
    try {
      localCart = secureStorage.getItem('cart');
    } catch (error) {
      secureStorage.setItem('cart', emptyCart);
    }

    if (!localCart) {
      secureStorage.setItem('cart', emptyCart);
    }

    axios
      .get('/auth/me')
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch(() => {
        //If an error with api, then get cart from secure local storage
        dispatch(getCartFromLocalStorage());
      });
  };
};
