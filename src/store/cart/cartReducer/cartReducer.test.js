import cartReducer from './cartReducer';
import { initialState } from './cartReducer';
import * as actionTypes from '../cartActionTypes';
import hash from 'object-hash';

describe('Cart Reducer', () => {
  it('Should return default state', () => {
    const newState = cartReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return correct new state if receiving type ADD_TO_CART', () => {
    const testItemId = 'test item id';
    const testItems = [{ _id: testItemId, pizza: { test }, quantity: 1 }];
    const testPayload = {
      type: actionTypes.ADD_TO_CART,
      items: testItems,
      quantity: 1,
      numItemsAdded: 1,
    };
    const newState = cartReducer(initialState, testPayload);
    const expectedState = {
      ...initialState,
      items: testPayload.items,
      quantity: testPayload.quantity,
      numItemsAdded: testPayload.numItemsAdded,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SIGN_OUT_CART', () => {
    const inputInitialState = {
      ...initialState,
      cartId: 'test cart id',
      items: [{ test }],
      quantity: 1,
      numItemsAdded: 1,
    };
    const newState = cartReducer(inputInitialState, {
      type: actionTypes.SIGN_OUT_CART,
    });

    expect(newState).toStrictEqual(initialState);
  });

  it('Should return correct new state if receiving type SET_CART', () => {
    const testPayload = {
      type: actionTypes.SET_CART,
      cartId: 'test cart id',
      items: [{ test }],
      quantity: 1,
    };

    const newState = cartReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      cartId: testPayload.cartId,
      items: testPayload.items,
      quantity: testPayload.quantity,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CHANGE_CART_ITEM_SUCCESS', () => {
    const inputTestItems = [
      { _id: 'test item id', pizza: { test }, quantity: 1 },
    ];

    const testPayload = {
      type: actionTypes.CHANGE_CART_ITEM_SUCCESS,
      items: inputTestItems,
      numItemsAdded: 0,
      quantity: 1,
    };

    const initialTestItems = { ...inputTestItems, quantity: 2 };

    let inputInitialState = {
      ...initialState,
      items: initialTestItems,
      quantity: 2,
    };
    const newState = cartReducer(inputInitialState, testPayload);

    const expectedState = {
      ...initialState,
      items: inputTestItems,
      quantity: 1,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CHANGE_CART_ITEM_START', () => {
    const testPayload = {
      type: actionTypes.CHANGE_CART_ITEM_START,
      itemIdBeingChanged: 'test item id',
    };
    const newState = cartReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      loadingCartItem: true,
      itemIdBeingChanged: testPayload.itemIdBeingChanged,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CHANGE_CART_ITEM_FAILED', () => {
    const inputInitialState = {
      ...initialState,
      itemIdBeingChanged: 'test item id',
      loadingCartItem: true,
    };
    const newState = cartReducer(inputInitialState, {
      type: actionTypes.CHANGE_CART_ITEM_FAILED,
    });

    expect(newState).toStrictEqual(initialState);
  });

  it('Should return correct new state if receiving type EMPTY_CART', () => {
    const inputInitialState = {
      ...initialState,
      cartId: 'test cart id',
      items: [{ test }],
      quantity: 1,
      numItemsAdded: 1,
    };
    const newState = cartReducer(inputInitialState, {
      type: actionTypes.EMPTY_CART,
    });

    const expectedState = {
      ...initialState,
      cartId: inputInitialState.cartId,
      items: [],
      quantity: 0,
      numItemsAdded: 0,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});
