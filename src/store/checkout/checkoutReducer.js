import * as actionTypes from "./checkoutActionTypes";

const initialState = {
  userInfo: null,
  orders: {},
  validatingAddress: false,
  addressValid: false,
  addressValidationError: null
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      };
    case actionTypes.SUBMIT_ORDER:
      const orders = { ...state.orders, [action.orderId]: action.order };
      return {
        ...state,
        orders: orders
      };
    case actionTypes.VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressValid: true,
        addressValidationError: null,
        validatingAddress: false
      };
    case actionTypes.VALIDATE_ADDRESS_FAILED:
      return {
        ...state,
        addressValid: false,
        addressValidationError: action.error,
        validatingAddress: false
      };
    case actionTypes.VALIDATE_ADDRESS_START:
      return {
        ...state,
        validatingAddress: true,
        addressValidationError: null
      };
    case actionTypes.VALIDATE_ADDRESS_RESET:
      return {
        ...state,
        validatingAddress: false,
        addressValid: false,
        addressValidationError: false
      };
    default:
      return state;
  }
};

export default checkoutReducer;
