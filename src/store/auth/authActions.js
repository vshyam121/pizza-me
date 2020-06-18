import * as actionTypes from "./authActionTypes";
import {
  clearCart,
  getCart,
  getCartFromLocalStorage,
} from "../cart/cartActions";
import { getOrders } from "../checkout/checkoutActions";
import axios from "axios";
import { secureStorage } from "../../shared/secureStorage";
import { setErroredAction } from "../ui/uiActions";
import * as actionDisplays from "../ui/actionDisplays";

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
export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

/* Clear user data and cart on sign out */
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
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

/* Sign in user with email/password */
export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.REACT_APP_API_KEY,
        authData
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem(
          "expirationTime",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
        dispatch(getCart(res.data.idToken, res.data.localId));
        dispatch(getOrders(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        dispatch(setErroredAction(actionDisplays.SIGN_IN));
        dispatch(authFailed(err.response.data.error));
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          process.env.REACT_APP_API_KEY,
        authData
      )
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res));
      })
      .catch((err) => {
        dispatch(setErroredAction(actionDisplays.SIGN_UP));
        dispatch(authFailed(err.response.data.error));
      });
  };
};

/* Initialize application upon app load */
export const initApp = () => {
  return (dispatch) => {
    let localCart = null;
    try {
      localCart = secureStorage.getItem("cart");
    } catch (error) {
      console.log(error);
    }
    if (!localCart) {
      let emptyCart = { items: {}, quantity: 0 };
      secureStorage.setItem("cart", emptyCart);
    }
    const idToken = localStorage.getItem("idToken");
    if (idToken) {
      const userId = localStorage.getItem("userId");
      const expirationTime = localStorage.getItem("expirationTime");
      dispatch(authSuccess(idToken, userId));
      dispatch(
        checkAuthTimeout(
          (new Date(expirationTime).getTime() - new Date().getTime()) / 1000
        )
      );
      dispatch(getCart(idToken, userId));
      dispatch(getOrders(idToken, userId));
    } else {
      dispatch(getCartFromLocalStorage());
    }
  };
};
