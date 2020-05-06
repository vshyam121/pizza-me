import * as actionTypes from "./authActionTypes";
import { clearCart, getCart, getCartFromLocalStorage } from "../cart/cartActions";
import axios from "axios";


export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET
  }
}
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    dispatch(clearCart());
    dispatch({
      type: actionTypes.AUTH_SIGNOUT
    });
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime * 1000);
  };
};

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.REACT_APP_API_KEY,
        authData
      )
      .then(res => {
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
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(authFailed(err.response.data.error));
      });
  };
};

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          process.env.REACT_APP_API_KEY,
        authData
      )
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err.response.data.error));
      });
  };
};

export const checkAuthentication = () => {
  return dispatch => {
    const localCartItems = localStorage.getItem("cart-items");
    if(!localCartItems){
      localStorage.setItem("cart-items", JSON.stringify({}));
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
    }
    else {
      dispatch(getCartFromLocalStorage());
    }
  };
};
