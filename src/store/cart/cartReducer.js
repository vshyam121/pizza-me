import * as actionTypes from './cartActionTypes';
import hash from 'object-hash';

const initialState = {
  cartId: null,
  userId: null,
  //key: item id, value: item object (item consists of pizza object and quantity)
  items: {},
  quantity: 0,
  //hash of pizza object to item id
  itemHashMap: {},
  numItemsAdded: 0,
  loadingCart: false,
  loadingCartItem: false,
  itemBeingChanged: null,
  erroredAction: null,
};

const cartReducer = (state = initialState, action) => {
  let items = null;
  let itemHashMap = null;
  let quantity;
  let numItemsAdded = 0;
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
      quantity = parseInt(state.quantity) + parseInt(action.item.quantity);
      itemHashMap = {
        ...state.itemHashMap,
        [hash(action.item.pizza)]: action.itemId,
      };
      return {
        ...state,
        items: items,
        quantity: quantity,
        itemHashMap: itemHashMap,
        numItemsAdded: action.item.quantity,
      };
    //set loading before getting cart
    case actionTypes.GET_CART_START:
      return {
        ...state,
        loadingCart: true,
        errorCart: null,
      };
    //finish loading when getting cart failed
    case actionTypes.GET_CART_FAILED:
      return {
        ...state,
        loadingCart: false,
      };
    //successfully got cart for user, set cart metadata
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
    //clear cart after logging out
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartId: null,
        userId: null,
        items: {},
        quantity: 0,
        itemHashMap: {},
        numItemsAdded: 0,
      };
    //set cart items
    case actionTypes.SET_CART_ITEMS:
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        itemHashMap: action.itemHashMap,
      };
    //change item quantity
    case actionTypes.CHANGE_ITEM_QUANTITY:
      items = { ...state.items };
      quantity = state.quantity - items[action.itemId].quantity;
      items[action.itemId].quantity = action.quantity;
      quantity += parseInt(action.quantity);
      if (state.quantity < quantity) {
        numItemsAdded = quantity - state.quantity;
      }
      return {
        ...state,
        items: items,
        quantity: quantity,
        numItemsAdded: numItemsAdded,
        loadingCartItem: false,
      };
    //set loading before changing cart item
    case actionTypes.CHANGE_CART_ITEM_START:
      return {
        ...state,
        loadingCartItem: true,
        itemBeingChanged: action.itemBeingChanged,
      };
    //failed to change cart item, done loading
    case actionTypes.CHANGE_CART_ITEM_FAILED:
      return {
        ...state,
        loadingCartItem: false,
        itemBeingChanged: null,
      };
    //update cart metadata with removed item
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
        numItemsAdded: 0,
        loadingCartItem: false,
        itemBeingChanged: null,
      };
    //save item to list of items and update quantity
    case actionTypes.SAVE_TO_CART:
      items = { ...state.items };
      quantity = state.quantity - items[action.itemId].quantity;
      items[action.itemId] = action.item;
      quantity += parseInt(action.item.quantity);
      return {
        ...state,
        items: items,
        quantity: quantity,
        numItemsAdded: 0,
        loadingCartItem: false,
      };
    //empty cart and all metadata
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        items: {},
        quantity: 0,
        numItemsAdded: 0,
        itemHashMap: {},
      };
    default:
      return state;
  }
};

export default cartReducer;
