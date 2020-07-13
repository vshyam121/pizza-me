import * as actionTypes from '../authActionTypes';

const initialState = {
  idToken: null,
  userId: null,
  signInError: null,
  signUpError: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //set loading to true and reset error
    case actionTypes.AUTH_START:
      return {
        ...state,
        signInError: null,
        signUpError: null,
        loading: true,
      };
    //successfully authenticated
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        idToken: action.idToken,
        userId: action.userId,
        signInError: null,
      };
    //set error and reset loading when sign in failed
    case actionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        signInError: action.error,
      };
    //set error and reset loading when sign up failed
    case actionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        signUpError: action.error,
      };
    //reset user data on signout
    case actionTypes.AUTH_SIGNOUT:
      return {
        ...state,
        idToken: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
