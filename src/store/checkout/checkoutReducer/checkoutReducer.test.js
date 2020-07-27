import checkoutReducer from './checkoutReducer';
import { initialState } from './checkoutReducer';
import * as actionTypes from '../checkoutActionTypes';

describe('Checkout Reducer', () => {
  it('Should return default state', () => {
    const newState = checkoutReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return correct new state if receiving type SUBMIT_ORDER_START', () => {
    const inputInitialState = { ...initialState, submitOrderError: true };
    const newState = checkoutReducer(inputInitialState, {
      type: actionTypes.SUBMIT_ORDER_START,
    });

    const expectedState = {
      ...initialState,
      submittingOrder: true,
      submitOrderError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SUBMIT_ORDER_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.SUBMIT_ORDER_SUCCESS,
      order: 'test order',
    };
    const inputInitialState = { ...initialState, submittingOrder: true };
    const newState = checkoutReducer(inputInitialState, testPayload);
    const expectedState = {
      ...initialState,
      orders: [testPayload.order],
      submittingOrder: false,
      submitOrderError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SUBMIT_ORDER_FAILED', () => {
    const inputInitialState = { ...initialState, submittingOrder: true };

    const newState = checkoutReducer(inputInitialState, {
      type: actionTypes.SUBMIT_ORDER_FAILED,
    });

    const expectedState = {
      ...initialState,
      submittingOrder: false,
      submitOrderError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_ORDERS_START', () => {
    const newState = checkoutReducer(initialState, {
      type: actionTypes.GET_ORDERS_START,
    });

    const expectedState = {
      ...initialState,
      gettingOrders: true,
      getOrdersError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_ORDERS_FAILED', () => {
    const inputInitialState = { ...initialState, gettingOrders: true };

    const newState = checkoutReducer(inputInitialState, {
      type: actionTypes.GET_ORDERS_FAILED,
    });

    const expectedState = {
      ...initialState,
      gettingOrders: false,
      getOrdersError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_ORDERS_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.GET_ORDERS_SUCCESS,
      orders: [{ test }],
    };
    const newState = checkoutReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      orders: testPayload.orders,
      gettingOrders: false,
    };

    expect(newState).toEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_DELIVERY_ADDRESS_START', () => {
    const newState = checkoutReducer(initialState, {
      type: actionTypes.VALIDATE_DELIVERY_ADDRESS_START,
    });

    const expectedState = {
      ...initialState,
      validatingAddress: true,
      addressValidationError: null,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_DELIVERY_ADDRESS_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.VALIDATE_DELIVERY_ADDRESS_SUCCESS,
      deliveryAddress: 'test delivery address',
    };

    const inputInitialState = {
      ...initialState,
      deliveryAddress: null,
      validatingAddress: true,
      addressValid: false,
    };
    const newState = checkoutReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      validatingAddress: false,
      addressValid: true,
      addressValidationError: null,
      deliveryAddress: testPayload.deliveryAddress,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_DELIVERY_ADDRESS_FAILED', () => {
    const testPayload = {
      type: actionTypes.VALIDATE_DELIVERY_ADDRESS_FAILED,
      error: 'test error',
    };

    const inputInitialState = {
      ...initialState,
      validatingAddress: true,
      addressValidationError: 'test error',
    };
    const newState = checkoutReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      validatingAddress: false,
      addressValid: false,
      addressValidationError: testPayload.error,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_DELIVERY_ADDRESS_RESET', () => {
    const testPayload = {
      type: actionTypes.VALIDATE_DELIVERY_ADDRESS_RESET,
    };

    const inputInitialState = {
      ...initialState,
      deliveryAddress: 'test delivery address',
    };
    const newState = checkoutReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});
