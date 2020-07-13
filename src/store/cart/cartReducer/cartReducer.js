import * as actionTypes from '../cartActionTypes';

export const initialState = {
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
  getCartError: false,
  itemBeingChanged: null,
};

const cartReducer = (state = initialState, action) => {
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
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        itemHashMap: action.itemHashMap,
        numItemsAdded: action.numItemsAdded,
      };
    //set loading before getting cart
    case actionTypes.GET_CART_START:
      return {
        ...state,
        loadingCart: true,
        getCartError: false,
      };
    //finish loading when getting cart failed
    case actionTypes.GET_CART_FAILED:
      return {
        ...state,
        loadingCart: false,
        getCartError: true,
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
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        numItemsAdded: action.numItemsAdded,
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
      return {
        ...state,
        items: action.items,
        itemHashMap: action.itemHashMap,
        quantity: action.quantity,
        loadingCartItem: false,
        itemBeingChanged: null,
      };
    //save item to list of items and update quantity
    case actionTypes.SAVE_TO_CART:
      return {
        ...state,
        items: action.items,
        itemHashMap: action.itemHashMap,
        quantity: action.quantity,
        numItemsAdded: action.numItemsAdded,
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
