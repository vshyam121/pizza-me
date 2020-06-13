import * as actionTypes from "./checkoutActionTypes";

const initialState = {
  userInfo: null,
  orders: {},
  validatingAddress: false,
  addressValid: false,
  addressValidationError: null,
  deliveryAddress: null,
  gettingOrders: false,
  submittingOrder: false,
  submitOrderError: false,
  getOrdersError: false
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        submittingOrder: true,
        submitOrderError: false
      };
    case actionTypes.SUBMIT_ORDER:
      const orders = { ...state.orders, [action.orderId]: action.order };
      return {
        ...state,
        orders: orders,
        submittingOrder: false,
      };
    case actionTypes.SUBMIT_ORDER_FAILED:
      return {
        ...state,
        submittingOrder: false,
        submitOrderError: true
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        gettingOrders: false,
        orders: action.orders,
      };
    case actionTypes.GET_ORDERS_START:
      return {
        ...state,
        gettingOrders: true,
        getOrdersError: false
      };
    case actionTypes.GET_ORDERS_FAILED:
      return {
        ...state,
        gettingOrders: false,
        getOrdersError: true
      };
    case actionTypes.VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressValid: true,
        addressValidationError: null,
        validatingAddress: false,
        deliveryAddress: action.deliveryAddress,
      };
    case actionTypes.VALIDATE_ADDRESS_FAILED:
      return {
        ...state,
        addressValid: false,
        addressValidationError: action.error,
        validatingAddress: false,
      };
    case actionTypes.VALIDATE_ADDRESS_START:
      return {
        ...state,
        validatingAddress: true,
        addressValidationError: null,
      };
    case actionTypes.VALIDATE_ADDRESS_RESET:
      return {
        ...state,
        validatingAddress: false,
        addressValid: false,
        addressValidationError: false,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
