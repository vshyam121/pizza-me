import * as actionTypes from '../checkoutActionTypes';

export const initialState = {
  orders: [],
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
    //Set loading for submit order
    case actionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        submittingOrder: true,
        submitOrderError: false,
      };
    //Add submitted order to list of orders
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      const orders = [...state.orders, action.order];
      return {
        ...state,
        orders: orders,
        submittingOrder: false,
      };
    //Finish loading when submit order failed
    case actionTypes.SUBMIT_ORDER_FAILED:
      return {
        ...state,
        submittingOrder: false,
        submitOrderError: true,
      };
    //Set loading before getting orders
    case actionTypes.GET_ORDERS_START:
      return {
        ...state,
        gettingOrders: true,
        getOrdersError: false,
      };
    //Successfully got orders, set orders
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        gettingOrders: false,
        orders: action.orders,
      };
    //Finish loading when getting orders failed
    case actionTypes.GET_ORDERS_FAILED:
      return {
        ...state,
        gettingOrders: false,
        getOrdersError: true,
      };
    //Successfully validated address, stop loading and set address
    case actionTypes.VALIDATE_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        addressValid: true,
        addressValidationError: null,
        validatingAddress: false,
        deliveryAddress: action.deliveryAddress,
      };
    //Finish loading when validating adddress failed
    case actionTypes.VALIDATE_DELIVERY_ADDRESS_FAILED:
      return {
        ...state,
        addressValid: false,
        addressValidationError: action.error,
        validatingAddress: false,
      };
    //Set loading
    case actionTypes.VALIDATE_DELIVERY_ADDRESS_START:
      return {
        ...state,
        validatingAddress: true,
        addressValidationError: null,
      };
    //Reset all address validation properties
    case actionTypes.VALIDATE_DELIVERY_ADDRESS_RESET:
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
