import * as actionTypes from './checkoutActionTypes';

export const initialState = {
  userInfo: null,
  orders: {},
  validatingAddress: false,
  addressValid: false,
  addressValidationError: null,
  deliveryAddress: null,
  gettingOrders: false,
  submittingOrder: false,
  submitOrderError: false,
  getOrdersError: false,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    //set loading for submit order
    case actionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        submittingOrder: true,
        submitOrderError: false,
      };
    //add submitted order to list of orders
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      const orders = { ...state.orders, [action.orderId]: action.order };
      return {
        ...state,
        orders: orders,
        submittingOrder: false,
      };
    //finish loading when submit order failed
    case actionTypes.SUBMIT_ORDER_FAILED:
      return {
        ...state,
        submittingOrder: false,
        submitOrderError: true,
      };
    //set loading before getting orders
    case actionTypes.GET_ORDERS_START:
      return {
        ...state,
        gettingOrders: true,
        getOrdersError: false,
      };
    //successfully got orders, set orders
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        gettingOrders: false,
        orders: action.orders,
      };
    //finish loading when getting orders failed
    case actionTypes.GET_ORDERS_FAILED:
      return {
        ...state,
        gettingOrders: false,
        getOrdersError: true,
      };
    //successfully validated address, stop loading and set address
    case actionTypes.VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressValid: true,
        addressValidationError: null,
        validatingAddress: false,
        deliveryAddress: action.deliveryAddress,
      };
    //finish loading when validating adddress failed
    case actionTypes.VALIDATE_ADDRESS_FAILED:
      return {
        ...state,
        addressValid: false,
        addressValidationError: action.error,
        validatingAddress: false,
      };
    //set loading
    case actionTypes.VALIDATE_ADDRESS_START:
      return {
        ...state,
        validatingAddress: true,
        addressValidationError: null,
      };
    //reset all address validation properties
    case actionTypes.VALIDATE_ADDRESS_RESET:
      return {
        ...state,
        validatingAddress: false,
        addressValid: false,
        addressValidationError: null,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
