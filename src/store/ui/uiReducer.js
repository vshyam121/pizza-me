import * as actionTypes from "./uiActionTypes";

const initialState = {
  sidebarOpen: false,
  erroredAction: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      let sidebarOpen = state.sidebarOpen;
      return {
        ...state,
        sidebarOpen: !sidebarOpen,
      };
    case actionTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false,
      };
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
