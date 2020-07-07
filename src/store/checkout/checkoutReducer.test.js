import checkoutReducer from './checkoutReducer';
import { initialState } from './checkoutReducer';
import * as actionTypes from './checkoutActionTypes';
import {
  CRUST,
  SIZE,
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES,
  COMBO_NAME,
  REGULAR_TOPPING,
  WHOLE,
  EXTRA_TOPPING,
  LEFT_HALF,
} from '../../metadata/pizzaProperties';
import { CHEESE, REGULAR } from '../../metadata/comboMetadata';

describe('Checkout Reducer', () => {
  it('Should return default state', () => {
    const newState = checkoutReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return correct new state if receiving type SUBMIT_ORDER_START', () => {
    const newState = checkoutReducer(undefined, {
      type: actionTypes.SUBMIT_ORDER_START,
    });

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: true,
      submitOrderError: false,
      getOrdersError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SUBMIT_ORDER_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.SUBMIT_ORDER_SUCCESS,
      orderId: 'test order id',
      order: 'test order',
    };
    const newState = checkoutReducer(
      { ...initialState, submittingOrder: true },
      testPayload
    );
    const expectedState = {
      userInfo: null,
      orders: { [testPayload.orderId]: testPayload.order },
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SUBMIT_ORDER_FAILED', () => {
    const newState = checkoutReducer(
      { ...initialState, submittingOrder: true },
      {
        type: actionTypes.SUBMIT_ORDER_FAILED,
      }
    );

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: true,
      getOrdersError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_ORDERS_START', () => {
    const newState = checkoutReducer(undefined, {
      type: actionTypes.GET_ORDERS_START,
    });

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: true,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_ORDERS_FAILED', () => {
    const newState = checkoutReducer(
      { ...initialState, gettingOrders: true },
      {
        type: actionTypes.GET_ORDERS_FAILED,
      }
    );

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: true,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_ORDERS_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.GET_ORDERS_SUCCESS,
      orders: { test: test },
    };
    const newState = checkoutReducer(undefined, testPayload);

    const expectedState = {
      userInfo: null,
      orders: testPayload.orders,
      validatingAddress: false,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_ADDRESS_START', () => {
    const newState = checkoutReducer(undefined, {
      type: actionTypes.VALIDATE_ADDRESS_START,
    });

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: true,
      addressValid: false,
      addressValidationError: null,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_ADDRESS_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.VALIDATE_ADDRESS_SUCCESS,
      deliveryAddress: 'test delivery address',
    };
    const newState = checkoutReducer(undefined, testPayload);

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: false,
      addressValid: true,
      addressValidationError: null,
      deliveryAddress: testPayload.deliveryAddress,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_ADDRESS_FAILED', () => {
    const testPayload = {
      type: actionTypes.VALIDATE_ADDRESS_FAILED,
      error: 'test error',
    };
    const newState = checkoutReducer(undefined, testPayload);

    const expectedState = {
      userInfo: null,
      orders: {},
      validatingAddress: false,
      addressValid: false,
      addressValidationError: testPayload.error,
      deliveryAddress: null,
      gettingOrders: false,
      submittingOrder: false,
      submitOrderError: false,
      getOrdersError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type VALIDATE_ADDRESS_RESET', () => {
    const testPayload = {
      type: actionTypes.VALIDATE_ADDRESS_RESET,
    };
    const newState = checkoutReducer(undefined, testPayload);

    const expectedState = {
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
    expect(newState).toStrictEqual(expectedState);
  });
});
