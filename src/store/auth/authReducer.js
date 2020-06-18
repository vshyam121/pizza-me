import * as actionTypes from "./authActionTypes";

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //set loading to true and reset error
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    //successfully authenticated 
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        idToken: action.idToken,
        userId: action.userId,
        error: null
      };
    //set error and reset loading when auth failed
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    //reset user data on signout
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
