import * as actionTypes from '../authActionTypes';

export const initialState = {
  userId: null,
  signInError: null,
  signUpError: null,
  loadingUser: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //Set loading to true and reset error
    case actionTypes.AUTH_START:
      return {
        ...state,
        signInError: null,
        signUpError: null,
        loadingUser: true,
      };
    case actionTypes.AUTH_TOKEN_FAILED:
      return {
        ...state,
        loadingUser: false,
      };
    //Reset auth errors
    case actionTypes.AUTH_RESET:
      return {
        ...state,
        signInError: null,
        signUpError: null,
      };
    //Successfully authenticated
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        userId: action.userId,
        signInError: null,
      };
    //Set error and reset loading when sign in failed
    case actionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        loadingUser: false,
        signInError: action.error,
      };
    //Set error and reset loading when sign up failed
    case actionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        loadingUser: false,
        signUpError: action.error,
      };
    //Reset user data on signout
    case actionTypes.AUTH_SIGNOUT:
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
