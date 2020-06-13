import * as actionTypes from "./uiActionTypes";

export const toggleSidebar = () => {
  return {
    type: actionTypes.TOGGLE_SIDEBAR
  };
};

export const closeSidebar = () => {
  return {
    type: actionTypes.CLOSE_SIDEBAR
  }
}

export const setErroredAction = (erroredAction) => {
  return {
    type: actionTypes.SET_ERRORED_ACTION,
    erroredAction: erroredAction
  };
};
