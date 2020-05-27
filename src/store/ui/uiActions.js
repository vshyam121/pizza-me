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
