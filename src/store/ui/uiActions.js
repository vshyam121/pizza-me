import * as actionTypes from "./uiActionTypes";

/* open/close the sidebar menu */
export const toggleSidebar = () => {
  return {
    type: actionTypes.TOGGLE_SIDEBAR
  };
};

/* close the sidebar menu */
export const closeSidebar = () => {
  return {
    type: actionTypes.CLOSE_SIDEBAR
  }
}

/* set error for withErrorHandler HOC to pickup */
export const setErroredAction = (erroredAction) => {
  return {
    type: actionTypes.SET_ERRORED_ACTION,
    erroredAction: erroredAction
  };
};
