import cartReducer from './cartReducer';
import { initialState } from './cartReducer';
import * as actionTypes from '../cartActionTypes';
import hash from 'object-hash';

describe('Cart Reducer', () => {
  it('Should return default state', () => {
    const newState = cartReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return correct new state if receiving type CREATE_CART', () => {
    const testPayload = {
      type: actionTypes.CREATE_CART,
      userId: 'test user id',
      cartId: 'test cart id',
    };
    const newState = cartReducer(undefined, testPayload);

    const expectedState = {
      cartId: testPayload.cartId,
      userId: testPayload.userId,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type ADD_TO_CART', () => {
    const testItemId = 'test item id';
    const testItems = { [testItemId]: { pizza: { test: test }, quantity: 1 } };
    const testPayload = {
      type: actionTypes.ADD_TO_CART,
      items: testItems,
      itemHashMap: { [hash(testItems[testItemId].pizza)]: testItemId },
      quantity: 1,
      numItemsAdded: 1,
    };
    const newState = cartReducer(initialState, testPayload);
    const expectedState = {
      cartId: null,
      userId: null,
      items: testPayload.items,
      quantity: testPayload.quantity,
      itemHashMap: testPayload.itemHashMap,
      numItemsAdded: testPayload.numItemsAdded,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_CART_START', () => {
    const newState = cartReducer(undefined, {
      type: actionTypes.GET_CART_START,
    });

    const expectedState = {
      cartId: null,
      userId: null,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: true,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_CART_FAILED', () => {
    const newState = cartReducer(undefined, {
      type: actionTypes.GET_CART_FAILED,
    });

    const expectedState = {
      cartId: null,
      userId: null,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: true,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type GET_CART_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.GET_CART_SUCCESS,
      cartId: 'test cart id',
      userId: 'test user id',
      items: { test: test },
      quantity: 1,
      itemHashMap: { test: test },
    };

    const newState = cartReducer(initialState, testPayload);

    const expectedState = {
      cartId: testPayload.cartId,
      userId: testPayload.userId,
      items: testPayload.items,
      quantity: testPayload.quantity,
      itemHashMap: testPayload.itemHashMap,
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CLEAR_CART', () => {
    const inputInitialState = {
      ...initialState,
      cartId: 'test cart id',
      userId: 'test user id',
      items: { test: test },
      itemHashMap: { test: test },
      quantity: 1,
      numItemsAdded: 1,
    };
    const newState = cartReducer(inputInitialState, {
      type: actionTypes.CLEAR_CART,
    });

    const expectedState = {
      cartId: null,
      userId: null,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SET_CART_ITEMS', () => {
    const testPayload = {
      type: actionTypes.SET_CART_ITEMS,
      items: { test: test },
      quantity: 1,
      itemHashMap: { test: test },
    };

    let inputInitialState = {
      ...initialState,
      cartId: 'test cart id',
      userId: 'test user id',
    };
    const newState = cartReducer(inputInitialState, testPayload);

    const expectedState = {
      cartId: inputInitialState.cartId,
      userId: inputInitialState.userId,
      items: testPayload.items,
      quantity: testPayload.quantity,
      itemHashMap: testPayload.itemHashMap,
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CHANGE_ITEM_QUANTITY', () => {
    const inputTestItems = {
      'test item id': { pizza: { test: test }, quantity: 1 },
    };

    const testPayload = {
      type: actionTypes.CHANGE_ITEM_QUANTITY,
      items: inputTestItems,
      numItemsAdded: 0,
      quantity: 1,
    };

    const initialTestItems = { ...inputTestItems, quantity: 2 };

    let inputInitialState = {
      ...initialState,
      cartId: 'test cart id',
      userId: 'test user id',
      items: initialTestItems,
      quantity: 2,
      itemHashMap: { test: test },
    };
    const newState = cartReducer(inputInitialState, testPayload);

    const expectedState = {
      cartId: inputInitialState.cartId,
      userId: inputInitialState.userId,
      items: inputTestItems,
      quantity: 1,
      itemHashMap: inputInitialState.itemHashMap,
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CHANGE_CART_ITEM_START', () => {
    const testPayload = {
      type: actionTypes.CHANGE_CART_ITEM_START,
      itemBeingChanged: { test: test },
    };
    const newState = cartReducer(undefined, testPayload);

    const expectedState = {
      cartId: null,
      userId: null,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: true,
      itemBeingChanged: testPayload.itemBeingChanged,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CHANGE_CART_ITEM_FAILED', () => {
    const newState = cartReducer(undefined, {
      type: actionTypes.CHANGE_CART_ITEM_FAILED,
    });

    const expectedState = {
      cartId: null,
      userId: null,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type REMOVE_ITEM_SUCCESS', () => {
    const testItemId = 'test item id';
    const testItems = { [testItemId]: { pizza: { test: test }, quantity: 1 } };
    const testPayload = {
      type: actionTypes.REMOVE_ITEM_SUCCESS,
      items: testItems,
      itemHashMap: { [hash(testItems[testItemId].pizza)]: testItemId },
      quantity: 1,
    };

    const inputInitialState = {
      ...initialState,
      loadingCartItem: true,
      itemBeingChanged: { test: test },
    };
    const newState = cartReducer(inputInitialState, testPayload);
    const expectedState = {
      cartId: null,
      userId: null,
      items: testPayload.items,
      quantity: testPayload.quantity,
      itemHashMap: testPayload.itemHashMap,
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SAVE_TO_CART', () => {
    const testItemId = 'test item id';
    const testItems = { [testItemId]: { pizza: { test: test }, quantity: 1 } };
    const testPayload = {
      type: actionTypes.SAVE_TO_CART,
      items: testItems,
      itemHashMap: { [hash(testItems[testItemId].pizza)]: testItemId },
      quantity: 1,
      numItemsAdded: 1,
    };

    const inputInitialState = {
      ...initialState,
      items: { [testItemId]: { test: test } },
      itemHashMap: { test: test },
      quantity: 1,
    };
    const newState = cartReducer(initialState, testPayload);
    const expectedState = {
      cartId: null,
      userId: null,
      items: testPayload.items,
      quantity: testPayload.quantity,
      itemHashMap: testPayload.itemHashMap,
      numItemsAdded: testPayload.numItemsAdded,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type EMPTY_CART', () => {
    const inputInitialState = {
      ...initialState,
      cartId: 'test cart id',
      userId: 'test user id',
      items: { test: test },
      itemHashMap: { test: test },
      quantity: 1,
      numItemsAdded: 1,
    };
    const newState = cartReducer(inputInitialState, {
      type: actionTypes.EMPTY_CART,
    });

    const expectedState = {
      cartId: inputInitialState.cartId,
      userId: inputInitialState.userId,
      items: {},
      quantity: 0,
      itemHashMap: {},
      numItemsAdded: 0,
      loadingCart: false,
      loadingCartItem: false,
      itemBeingChanged: null,
      getCartError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});
