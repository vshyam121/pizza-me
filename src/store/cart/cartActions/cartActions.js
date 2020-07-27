import * as actionTypes from '../cartActionTypes';
import axios from '../../../shared/axiosAPI';
import { v4 as uuidv4 } from 'uuid';
import hash from 'object-hash';
import { secureStorage } from '../../../shared/secureStorage';
import * as actionDisplays from '../../ui/actionDisplays';
import { setErroredAction } from '../../ui/uiActions/uiActions';
import { getOrCreateLocalCart } from '../../../shared/util';

/* Set cart in redux store from cart in local storage */
export const getCartFromLocalStorage = () => {
  return (dispatch) => {
    let localCart = secureStorage.getItem('cart');
    if (localCart.quantity > 0) {
      dispatch(setCartItemsFromLocalCart(localCart));
    }
  };
};

/* Combine local cart with backend cart */
export const combineCarts = (user) => {
  return (dispatch) => {
    const localCart = getOrCreateLocalCart();

    axios
      .post(`/carts/${user._id}/items`, Object.values(localCart.items))
      .then((res) => {
        //Dispatch to update state with combined cart
        dispatch({
          type: actionTypes.ADD_TO_CART,
          items: res.data.cart.items,
          quantity: res.data.cart.quantity,
          numItemsAdded: res.data.cart.quantity - localCart.quantity,
        });

        //Empty the local cart
        const emptyCart = { items: {}, quantity: 0, pizzaHashMap: {} };
        secureStorage.setItem('cart', emptyCart);
      });
  };
};

/* Just clear cart items from redux store only. 
   Different from empty cart which empties cart in backend as well */
export const signOutCart = () => {
  return {
    type: actionTypes.SIGN_OUT_CART,
  };
};

/* If user not signed in, add to local storage cart */
const addToLocalCart = (item) => {
  return (dispatch) => {
    //Get local cart
    let localCart = getOrCreateLocalCart();

    //Hash of pizza to be added
    let pizzaHash = hash(item.pizza);

    //Local pizza hash map
    let pizzaHashMap = localCart.pizzaHashMap;
    let items = localCart.items;

    //If pizza to be added has hash in hash map
    if (pizzaHash in pizzaHashMap) {
      //Update quantity of that item
      items[pizzaHashMap[pizzaHash]].quantity += item.quantity;
    }
    //Otherwise, add new item to local cart
    else {
      const itemId = uuidv4();
      pizzaHashMap[pizzaHash] = itemId;
      item = { _id: itemId, ...item };
      items[itemId] = item;
    }

    let itemsArr = Object.values(items);
    localCart.quantity += item.quantity;

    secureStorage.setItem('cart', localCart);

    //Dispatch to update state
    dispatch({
      type: actionTypes.ADD_TO_CART,
      items: itemsArr,
      quantity: localCart.quantity,
      numItemsAdded: item.quantity,
    });
  };
};

/* Add to cart, either new item or increase quantity for already existing item */
export const addToCart = (userId, pizza, quantity) => {
  return (dispatch) => {
    const item = { pizza, quantity };
    if (userId) {
      axios
        .post(`/carts/${userId}/items`, [item])
        .then((res) => {
          dispatch({
            type: actionTypes.ADD_TO_CART,
            items: res.data.cart.items,
            quantity: res.data.cart.quantity,
            numItemsAdded: quantity,
          });
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.ADD_ITEM_TO_CART));
        });
    } else {
      dispatch(addToLocalCart(item));
    }
  };
};

/* Set cart items and metadata in redux store */
export const setCartItems = (cart) => {
  return {
    type: actionTypes.SET_CART_ITEMS,
    cartId: cart._id,
    items: cart.items,
    quantity: cart.quantity,
  };
};

/* Set cart items and metadata in redux store */
export const setCartItemsFromLocalCart = (localCart) => {
  return {
    type: actionTypes.SET_CART_ITEMS,
    items: Object.values(localCart.items),
    quantity: localCart.quantity,
  };
};

export const changeCartItemSuccess = (items, quantity) => {
  return {
    type: actionTypes.CHANGE_CART_ITEM_SUCCESS,
    items: items,
    quantity: quantity,
  };
};

/* Set new item quantity and update total quantity */
export const changeItemQuantity = (userId, itemId, pizza, quantity) => {
  return (dispatch) => {
    const quantityPatch = { quantity: quantity };

    dispatch(changeCartItemStart(itemId));

    //if user signed in, PUT call to change item quantity in backend cart
    if (userId) {
      axios
        .patch(`/carts/${userId}/items/${itemId}`, quantityPatch)
        .then((res) => {
          const cart = res.data.cart;
          dispatch(changeCartItemSuccess(cart.items, cart.quantity));
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.CHANGE_ITEM_QUANTITY));
          dispatch(changeCartItemFailed());
        });
    }
    //if user not signed in, change item quantity in local storage cart
    else {
      dispatch(changeItemQuantityInLocalCart(itemId, quantity));
    }
  };
};

/* If user not signed in, change item quantity in local storage cart */
const changeItemQuantityInLocalCart = (itemId, quantity) => {
  return (dispatch) => {
    let localCart = getOrCreateLocalCart();

    //If for some reason cart has been deleted from local storage,
    //reset cart
    if (Object.keys(localCart.items).length === 0) {
      dispatch(
        changeCartItemSuccess(
          Object.values(localCart.items),
          localCart.quantity
        )
      );
      return;
    }

    let items = localCart.items;

    //Update total cart quantity
    localCart.quantity -= items[itemId].quantity;
    localCart.quantity += quantity;

    //Update item quantity
    items[itemId].quantity = quantity;

    //Set back in local storage
    secureStorage.setItem('cart', localCart);

    //Dispatch to update cart state
    dispatch(changeCartItemSuccess(Object.values(items), localCart.quantity));
  };
};

/* To set loading in UI when making change to a cart item */
const changeCartItemStart = (itemId) => {
  return {
    type: actionTypes.CHANGE_CART_ITEM_START,
    itemIdBeingChanged: itemId,
  };
};

/* To stop loading cart item in UI if changing cart item failed */
const changeCartItemFailed = () => {
  return {
    type: actionTypes.CHANGE_CART_ITEM_FAILED,
  };
};

/* Remove item from cart in backend if user signed in or from cart in local storage if not */
export const removeItem = (userId, itemId, pizza) => {
  return (dispatch) => {
    dispatch(changeCartItemStart(itemId));

    //If user signed in, DELETE call to remove item from backend cart
    if (userId) {
      axios
        .delete(`/carts/${userId}/items/${itemId}`)
        .then((res) => {
          const cart = res.data.cart;
          dispatch(changeCartItemSuccess(cart.items, cart.quantity));
        })
        .catch(() => {
          dispatch(changeCartItemFailed());
          dispatch(setErroredAction(actionDisplays.REMOVE_ITEM));
        });
    } else {
      dispatch(removeItemFromLocalCart(itemId, pizza));
    }
  };
};

/* If user not signed in, remove item from local storage cart */
const removeItemFromLocalCart = (itemId, pizza) => {
  return (dispatch) => {
    let localCart = getOrCreateLocalCart();

    //If for some reason cart has been deleted from local storage,
    //reset cart
    if (Object.keys(localCart.items).length === 0) {
      dispatch(setCartItemsFromLocalCart(localCart));
      return;
    }

    //Get new cart quantity
    localCart.quantity -= localCart.items[itemId].quantity;

    //Remove from items
    delete localCart.items[itemId];
    delete localCart.pizzaHashMap[hash(pizza)];
    secureStorage.setItem('cart', localCart);

    //Dispatch to set cart state
    dispatch(
      changeCartItemSuccess(Object.values(localCart.items), localCart.quantity)
    );
  };
};

export const emptyCart = (userId) => {
  return (dispatch) => {
    //If user signed in, PUT call to empty backend cart
    if (userId) {
      let emptyCart = {
        items: [],
      };
      axios
        .put(`/carts/${userId}`, emptyCart)
        .then(() => {
          dispatch({
            type: actionTypes.EMPTY_CART,
          });
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.EMPTY_CART));
        });
    }
    //If user not signed in, empty local storage cart
    else {
      let emptyCart = { items: {}, pizzaHashMap: {}, quantity: 0 };
      secureStorage.setItem('cart', emptyCart);
      dispatch({
        type: actionTypes.EMPTY_CART,
      });
    }
  };
};

/* Save item to cart in backend if user signed in or in local storage if not */
export const saveToCart = (userId, pizza, quantity, cartQuantity, itemId) => {
  return (dispatch) => {
    const item = { pizza: pizza, quantity: quantity };
    dispatch(changeCartItemStart(itemId));

    //If user signed in, PUT call to make change to backend cart
    if (userId) {
      axios
        .put(`/carts/${userId}/items/${itemId}`, item)
        .then((res) => {
          const cart = res.data.cart;
          //Dispatch to set cart state
          dispatch(changeCartItemSuccess(cart.items, cart.quantity));
        })
        .catch(() => {
          dispatch(changeCartItemFailed());
          dispatch(setErroredAction(actionDisplays.SAVE_TO_CART));
        });
    }
    //if user not signed in, make change to local storage cart
    else {
      dispatch(saveToLocalCart(itemId, item));
    }
  };
};

/* If user not signed in, make change to local storage cart */
const saveToLocalCart = (itemId, item) => {
  return (dispatch) => {
    let localCart = getOrCreateLocalCart();

    //If for some reason cart has been deleted from local storage,
    //reset cart
    if (Object.keys(localCart.items).length === 0) {
      localCart.items = { [itemId]: { _id: itemId, ...item } };
      localCart.pizzaHashMap[hash(item.pizza)] = itemId;
      localCart.quantity = item.quantity;
      secureStorage.setItem('cart', localCart);
      dispatch(
        changeCartItemSuccess(
          Object.values(localCart.items),
          localCart.quantity
        )
      );
      return;
    }

    //Local cart items
    let items = localCart.items;

    //Local pizza hash map
    let pizzaHashMap = localCart.pizzaHashMap;

    //Hash of pizza to be saved
    let pizzaHash = hash(item.pizza);

    //Item that needs to be updated
    let currentItem = items[itemId];

    localCart.quantity += item.quantity - items[itemId].quantity;

    //If hash of pizza to be saved is in hash map
    if (pizzaHash in pizzaHashMap) {
      //If matching hash item's id doesn't match
      if (pizzaHashMap[pizzaHash] !== itemId) {
        //Then update matching hash item's quantity
        items[pizzaHashMap[pizzaHash]].quantity += item.quantity;

        delete pizzaHashMap[items[itemId].pizza];

        //And delete the old item
        delete items[itemId];
      } else {
        currentItem.quantity = item.quantity;
      }
    } else {
      delete pizzaHashMap[hash(currentItem.pizza)];
      items[itemId] = { _id: itemId, ...item };
      pizzaHashMap[pizzaHash] = itemId;
    }

    //Save back to local storage
    secureStorage.setItem('cart', localCart);

    //Dispatch to set cart state
    dispatch(changeCartItemSuccess(Object.values(items), localCart.quantity));
  };
};
