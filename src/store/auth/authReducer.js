import * as actionTypes from "./authActionTypes";

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        idToken: action.idToken,
        userId: action.userId,
        error: null
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.AUTH_SIGNOUT:
      return {
        ...state,
        idToken: null,
        userId: null
      };
    default:
      return state;
  }
};

export default authReducer;
