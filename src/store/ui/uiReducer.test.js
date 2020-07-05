import uiReducer from "./uiReducer";
import { initialState } from "./uiReducer";
import * as actionTypes from "./uiActionTypes";
import * as actionDisplays from "./actionDisplays";

describe("UI Reducer", () => {
  it("Should return default state", () => {
    const newState = uiReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("Should return new state if receiving type TOGGLE_SIDEBAR", () => {
    const newState = uiReducer(undefined, {
      type: actionTypes.TOGGLE_SIDEBAR,
    });
    expect(newState).toHaveProperty("sidebarOpen", true);
    expect(newState).toHaveProperty("erroredAction", null);
  });

  it("Should return new state if receiving type CLOSE_SIDEBAR", () => {
    initialState.sideBarOpen = true;
    const newState = uiReducer(initialState, {
      type: actionTypes.CLOSE_SIDEBAR,
    });
    expect(newState).toHaveProperty("sidebarOpen", false);
    expect(newState).toHaveProperty("erroredAction", null);
  });

  it("Should return new state if receiving type SET_ERRORED_ACTION", () => {
    const newState = uiReducer(undefined, {
      type: actionTypes.SET_ERRORED_ACTION,
      erroredAction: actionDisplays.SIGN_IN
    });
    expect(newState).toHaveProperty("sidebarOpen", false);
    expect(newState).toHaveProperty("erroredAction", actionDisplays.SIGN_IN);
  });
});
