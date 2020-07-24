import * as actionTypes from '../cartActionTypes';

export const initialState = {
  //Array of cart items
  //Each item contains a pizza object and item quantity
  items: [],

  //Cart quantity
  quantity: 0,

  //Number of items just added. For item add notification.
  numItemsAdded: 0,

  //Loading true when changing a cart item. i.e. update or remove
  loadingCartItem: false,

  //Item id of item being changed to know which item to show loading sign
  itemIdBeingChanged: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    //Add item to cart, update pizza to item id hashmap and quantity
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        numItemsAdded: action.numItemsAdded,
      };
    //Clear cart after logging out
    case actionTypes.SIGN_OUT_CART:
      return {
        ...state,
        userId: null,
        items: [],
        quantity: 0,
        numItemsAdded: 0,
      };
    //set cart items
    case actionTypes.SET_CART_ITEMS:
      return {
        ...state,
        cartId: action.cart._id,
        items: action.cart.items,
        quantity: action.quantity,
      };
    //change item quantity
    case actionTypes.CHANGE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        loadingCartItem: false,
      };
    //set loading before changing cart item
    case actionTypes.CHANGE_CART_ITEM_START:
      return {
        ...state,
        loadingCartItem: true,
        itemIdBeingChanged: action.itemIdBeingChanged,
      };
    //failed to change cart item, done loading
    case actionTypes.CHANGE_CART_ITEM_FAILED:
      return {
        ...state,
        loadingCartItem: false,
        itemIdBeingChanged: null,
      };
    //update cart metadata with removed item
    case actionTypes.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        loadingCartItem: false,
      };
    //empty cart and all metadata
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        items: [],
        quantity: 0,
        numItemsAdded: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
