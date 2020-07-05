import * as actionTypes from "./uiActionTypes";

export const initialState = {
  sidebarOpen: false,
  erroredAction: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    // open/close sidebar
    case actionTypes.TOGGLE_SIDEBAR:
      let sidebarOpen = state.sidebarOpen;
      return {
        ...state,
        sidebarOpen: !sidebarOpen,
      };
    //close sidebar
    case actionTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false,
      };
    //set action that produced the error
    case actionTypes.SET_ERRORED_ACTION:
      return {
        ...state,
        erroredAction: action.erroredAction,
      };
    default:
      return state;
  }
};

export default uiReducer;
