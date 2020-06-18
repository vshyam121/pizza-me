import * as actionTypes from "./cartActionTypes";
import hash from "object-hash";

const initialState = {
  cartId: null,
  userId: null,
  items: {},
  quantity: 0,
  itemHashMap: {},
  itemAdded: false,
  loadingCart: false,
  loadingCartItem: false,
  itemBeingChanged: null,
  erroredAction: null,
};

const cartReducer = (state = initialState, action) => {
  let items = null;
  let itemHashMap = null;
  let quantity;
  let itemAdded = false;
  switch (action.type) {
    //set cart id and user id once cart has been created 
    case actionTypes.CREATE_CART:
      return {
        ...state,
        cartId: action.cartId,
        userId: action.userId,
      };
    //add item to cart, update pizza to item id hashmap and quantity
    case actionTypes.ADD_TO_CART:
      items = { ...state.items, [action.itemId]: action.item };
      quantity = state.quantity + +action.item.quantity;
      itemHashMap = { ...state.itemHashMap };
      itemHashMap[hash(action.item.pizza)] = action.itemId;
      console.log(items);
      return {
        ...state,
        items: items,
        quantity: quantity,
        itemHashMap: itemHashMap,
        itemAdded: action.item.quantity,
      };
    case actionTypes.GET_CART_START:
      return {
        ...state,
        loadingCart: true,
        errorCart: null,
      };
    case actionTypes.GET_CART_FAILED:
      return {
        ...state,
        loadingCart: false,
      };
    case actionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        cartId: action.cartId,
        userId: action.userId,
        items: action.items,
        quantity: action.quantity,
        itemHashMap: action.itemHashMap,
        loadingCart: false,
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartId: null,
        userId: null,
        items: {},
        quantity: 0,
        itemHashMap: {},
        itemAdded: null,
      };
    case actionTypes.SET_CART_ITEMS:
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        itemHashMap: action.itemHashMap,
      };
    case actionTypes.CHANGE_ITEM_QUANTITY:
      items = { ...state.items };
      quantity = state.quantity - items[action.itemId].quantity;
      items[action.itemId].quantity = action.quantity;
      quantity += parseInt(action.quantity);
      if (state.quantity < quantity) {
        itemAdded = quantity - state.quantity;
      }
      return {
        ...state,
        items: items,
        quantity: quantity,
        itemAdded: itemAdded,
        loadingCartItem: false
      };
    case actionTypes.CHANGE_CART_ITEM_START:
      return {
        ...state,
        loadingCartItem: true,
        itemBeingChanged: action.itemBeingChanged,
      };
    case actionTypes.CHANGE_CART_ITEM_FAILED:
      return {
        ...state,
        loadingCartItem: false,
        itemBeingChanged: null,
      };
    case actionTypes.REMOVE_ITEM_SUCCESS:
      items = { ...state.items };
      itemHashMap = { ...state.itemHashMap };
      quantity = state.quantity - items[action.itemId].quantity;
      delete items[action.itemId];
      delete itemHashMap[hash(action.pizza)];
      return {
        ...state,
        items: items,
        quantity: quantity,
        itemHashMap: itemHashMap,
        itemAdded: null,
        loadingCartItem: false,
        itemBeingChanged: null,
      };
    case actionTypes.SAVE_TO_CART:
      items = { ...state.items };
      quantity = state.quantity - items[action.itemId].quantity;
      items[action.itemId] = action.item;
      quantity += +action.item.quantity;
      return {
        ...state,
        items: items,
        quantity: quantity,
        itemAdded: null,
        loadingCartItem: false
      };
    case actionTypes.EMPTY_CART:
      items = {};
      return {
        ...state,
        items: items,
        quantity: 0,
        itemAdded: null,
        itemHashMap: {}
      };
    default:
      return state;
  }
};

export default cartReducer;
