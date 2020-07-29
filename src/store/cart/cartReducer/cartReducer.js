import * as actionTypes from '../cartActionTypes';

export const initialState = {
  cartId: null,

  //Array of cart items
  //Each item contains a pizza object and item quantity
  items: [],

  //Cart quantity
  quantity: 0,

  //Number of items just added. For item add notification.
  numItemsAdded: 0,

  //Loading true when changing a cart item. i.e. update or remove
  loadingCartItem: false,

  //Loading when getting the cart
  loadingCart: true,

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
    //Combine local storage cart with backend cart
    case actionTypes.COMBINE_CARTS:
      return {
        ...state,
        cartId: action.cartId,
        items: action.items,
        quantity: action.quantity,
        numItemsAdded: action.numItemsAdded,
      };
    //Done loading cart
    case actionTypes.GET_CART_DONE:
      return {
        ...state,
        loadingCart: false,
      };
    //Set cart items
    case actionTypes.SET_CART:
      return {
        ...state,
        cartId: action.cartId,
        items: action.items,
        quantity: action.quantity,
      };
    //Change item quantity
    case actionTypes.CHANGE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: action.items,
        quantity: action.quantity,
        loadingCartItem: false,
      };
    //Set loading before changing cart item
    case actionTypes.CHANGE_CART_ITEM_START:
      return {
        ...state,
        loadingCartItem: true,
        itemIdBeingChanged: action.itemIdBeingChanged,
      };
    //Failed to change cart item, done loading
    case actionTypes.CHANGE_CART_ITEM_FAILED:
      return {
        ...state,
        loadingCartItem: false,
        itemIdBeingChanged: null,
      };
    //Empty cart and all metadata
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        items: [],
        quantity: 0,
        numItemsAdded: 0,
      };
    //Clear cart after signing out
    case actionTypes.SIGN_OUT_CART:
      return {
        ...state,
        cartId: null,
        items: [],
        quantity: 0,
        numItemsAdded: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
