import * as actionTypes from "./cartActionTypes";

const initialState = {
  cartId: null,
  userId: null,
  items: {}
};

const getIndexOfMatchingItem = (state, itemId) => {
  return state.items.findIndex(item => item.id === itemId);
};

const cartReducer = (state = initialState, action) => {
  let items = null;
  let itemIndex = null;
  let item = null;
  switch (action.type) {
    case actionTypes.CREATE_CART:
      return {
        ...state,
        cartId: action.cartId,
        userId: action.userId
      };
    case actionTypes.ADD_TO_CART:
      items = { ...state.items, ...action.item };
      console.log(items);
      return {
        ...state,
        items: items
      };
    case actionTypes.GET_CART:
      return {
        ...state,
        cartId: action.cartId,
        userId: action.userId,
        items: action.items
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartId: null,
        userId: null,
        items: {}
      };
    case actionTypes.SET_CART_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case actionTypes.CHANGE_ITEM_QUANTITY:
      items = { ...state.items };
      items[action.itemId] = action.item;
      return {
        ...state,
        items: items
      };
    case actionTypes.REMOVE_ITEM:
      items = { ...state.items };
      delete items[action.itemId];
      return {
        ...state,
        items: items
      };
    case actionTypes.SAVE_TO_CART:
      items = { ...state.items };
      items[action.itemId] = action.item;
      return {
        ...state,
        items: items
      };
    case actionTypes.EMPTY_CART:
      items = {};
      return {
        ...state,
        items: items
      };
    default:
      return state;
  }
};

export default cartReducer;
