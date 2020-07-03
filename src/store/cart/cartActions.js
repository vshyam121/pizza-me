import * as actionTypes from "./cartActionTypes";
import {
  SAUCE,
  SAUCE_AMOUNT,
  CRUST_FLAVOR,
  CHEESE_AMOUNT,
} from "../../metadata/pizzaProperties";
import { CLASSIC_MARINARA, REGULAR_SAUCE } from "../../metadata/sauceMetadata";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";
import axiosFirebase from "../../shared/axiosFirebase";
import { v4 as uuidv4 } from "uuid";
import { REGULAR_CHEESE } from "../../metadata/cheeseMetadata";
import hash from "object-hash";
import { secureStorage } from "../../shared/secureStorage";
import * as actionDisplays from "../ui/actionDisplays";
import { setErroredAction } from "../ui/uiActions";

/* Create cart in backend for a particular user */
export const createCart = (idToken, userId) => {
  return (dispatch) => {
    const cart = {
      userId: userId,
    };
    axiosFirebase.post("/carts.json?auth=" + idToken, cart).then((res) => {
      dispatch({
        type: actionTypes.CREATE_CART,
        cartId: res.data.name,
        userId: userId,
      });
    });
  };
};

/* Set cart in redux store from cart in local storage */
export const getCartFromLocalStorage = () => {
  return (dispatch) => {
    let cart = secureStorage.getItem("cart");
    if (cart.quantity > 0) {
      dispatch(setCartItems(cart));
    }
  };
};

/* Combine local storage cart with cart in backend */
export const combineCarts = (localCart, items, cartId, userId, idToken) => {
  return (dispatch) => {
    const remoteItemsQuantity = getTotalQuantity(items);
    let itemHashMap = generateItemHashMap(items);
    let localItems = {};
    //Update quantities of matching item in backend cart and add new items
    Object.entries(localCart.items).forEach(([itemId, item]) => {
      const pizzaHash = hash(item.pizza);
      const matchingItemId = itemHashMap[pizzaHash];
      if (matchingItemId) {
        const matchingItem = items[itemHashMap[pizzaHash]];
        matchingItem.quantity =
          parseInt(matchingItem.quantity) + parseInt(item.quantity);
        localItems[matchingItemId] = matchingItem;
      } else {
        itemHashMap[pizzaHash] = itemId;
        items[itemId] = item;
        localItems[itemId] = item;
      }
    });
    //patch REST API call to update backend with changes to items in cart
    if (Object.keys(localItems)) {
      axiosFirebase
        .patch("/carts/" + cartId + "/items.json?auth=" + idToken, localItems)
        .then(() => {
          let emptyCart = { items: {}, quantity: 0 };
          secureStorage.setItem("cart", emptyCart);
          dispatch({
            type: actionTypes.GET_CART_SUCCESS,
            userId: userId,
            cartId: cartId,
            items: items,
            quantity: parseInt(localCart.quantity) + remoteItemsQuantity,
            itemHashMap: itemHashMap,
          });
        })
        .catch(() => {
          dispatch(getCartFailed());
          dispatch(setErroredAction(actionDisplays.GET_CART));
        });
    } else {
      dispatch({
        type: actionTypes.GET_CART_SUCCESS,
        userId: userId,
        cartId: cartId,
        items: items,
        quantity: localCart.quantity + remoteItemsQuantity,
        itemHashMap: itemHashMap,
      });
    }
  };
};

/* Add up individual item quantities to get total quantity for cart */
const getTotalQuantity = (items) => {
  let totalQuantity = 0;
  Object.values(items).forEach((item) => {
    totalQuantity += parseInt(item.quantity);
  });

  return totalQuantity;
};

/* To set loading in UI when getting cart */
const getCartStart = () => {
  return {
    type: actionTypes.GET_CART_START,
  };
};

/* To stop loading cart when getting cart failed */
const getCartFailed = () => {
  return {
    type: actionTypes.GET_CART_FAILED,
  };
};

/* Get cart from backend if user signed in or from local storage if not */
export const getCart = (idToken, userId) => {
  return (dispatch) => {
    dispatch(getCartStart());
    let items = null;
    let cartId = null;
    let quantity;
    axiosFirebase
      .get(
        "/carts.json?auth=" +
          idToken +
          '&orderBy="userId"&equalTo="' +
          userId +
          '"'
      )
      .then((res) => {
        if (Object.entries(res.data).length > 0) {
          items = Object.values(res.data)[0].items || {};
          cartId = Object.keys(res.data)[0];
          let localCart = secureStorage.getItem("cart");
          //Combine local cart with backend cart if items in local cart
          if (localCart.quantity > 0) {
            dispatch(combineCarts(localCart, items, cartId, userId, idToken));
          }
          //Otherwise, just dispatch to reducer with results of get cart call
          else {
            const itemHashMap = generateItemHashMap(items);
            quantity = getTotalQuantity(items);
            dispatch({
              type: actionTypes.GET_CART_SUCCESS,
              userId: userId,
              cartId: cartId,
              items: items,
              quantity: quantity,
              itemHashMap: itemHashMap,
            });
          }
        } else {
          dispatch(createCart(idToken, userId));
        }
      })
      .catch(() => {
        dispatch(getCartFailed());
        dispatch(setErroredAction(actionDisplays.GET_CART));
      });
  };
};

/* Generate pizza to item id hashmap to take care of duplicate pizzas */
const generateItemHashMap = (items) => {
  let itemHashMap = {};
  Object.entries(items).forEach(([itemId, item]) => {
    itemHashMap[hash(item.pizza)] = itemId;
  });

  return itemHashMap;
};

/* Just clear cart items from redux store only. 
   Different from empty cart which empties cart in backend as well */
export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

/* Add new item to cart, meaning it doesn't have a match in cart already */
const addNewItemToCart = (pizza, quantity) => {
  return (dispatch, getState) => {
    //Need to delete empty objects because firebase disregards properties with empty objects
    if (
      Object.keys(pizza.meats).length === 0 &&
      pizza.meats.constructor === Object
    ) {
      delete pizza.meats;
    }
    if (
      Object.keys(pizza.veggies).length === 0 &&
      pizza.veggies.constructor === Object
    ) {
      delete pizza.veggies;
    }
    let item = { pizza: pizza, quantity: quantity };
    //if user is signed in, then add to backend cart
    if (getState().cart.cartId) {
      axiosFirebase
        .post(
          "/carts/" +
            getState().cart.cartId +
            "/items.json?auth=" +
            getState().auth.idToken,
          item
        )
        .then((res) => {
          dispatch({
            type: actionTypes.ADD_TO_CART,
            itemId: res.data.name,
            item: item,
          });
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.ADD_ITEM_TO_CART));
        });
    } else {
      //if user not signed in, add to local storage cart
      let cart = secureStorage.getItem("cart");
      const itemId = uuidv4();
      cart.items[itemId] = item;
      cart.quantity += parseInt(item.quantity);
      secureStorage.setItem("cart", cart);
      dispatch({
        type: actionTypes.ADD_TO_CART,
        itemId: itemId,
        item: item,
      });
    }
  };
};

/* Add to cart, either new item or increase quantity for already existing item */
export const addToCart = (pizza, quantity) => {
  return (dispatch, getState) => {
    if (!pizza[SAUCE]) {
      pizza[SAUCE] = CLASSIC_MARINARA;
    }
    if (!pizza[SAUCE_AMOUNT]) {
      pizza[SAUCE_AMOUNT] = REGULAR_SAUCE;
    }
    if (!pizza[CHEESE_AMOUNT]) {
      pizza[CHEESE_AMOUNT] = REGULAR_CHEESE;
    }
    if (!pizza[CRUST_FLAVOR]) {
      pizza[CRUST_FLAVOR] = NO_CRUST_FLAVOR;
    }

    const matchedItemIdInCart = getState().cart.itemHashMap[hash(pizza)];
    if (matchedItemIdInCart) {
      const newQuantity =
        parseInt(getState().cart.items[matchedItemIdInCart].quantity) +
        parseInt(quantity);
      dispatch(changeItemQuantity(matchedItemIdInCart, newQuantity));
    } else {
      dispatch(addNewItemToCart(pizza, quantity));
    }
  };
};

/* set cart items and metadata in redux store */
export const setCartItems = (cart) => {
  let itemHashMap = generateItemHashMap(cart.items);
  return {
    type: actionTypes.SET_CART_ITEMS,
    items: cart.items,
    quantity: cart.quantity,
    itemHashMap: itemHashMap,
  };
};

/* Set new item quantity and update total quantity */
export const changeItemQuantity = (itemId, quantity) => {
  return (dispatch, getState) => {
    const item = { ...getState().cart.items[itemId] };
    dispatch(changeCartItemStart(item.pizza));
    item.quantity = quantity;
    if (getState().cart.cartId) {
      axiosFirebase
        .put(
          "/carts/" +
            getState().cart.cartId +
            "/items/" +
            itemId +
            ".json?auth=" +
            getState().auth.idToken,
          item
        )
        .then(() => {
          dispatch({
            type: actionTypes.CHANGE_ITEM_QUANTITY,
            itemId: itemId,
            quantity: quantity,
          });
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.CHANGE_ITEM_QUANTITY));
          dispatch(changeCartItemFailed());
        });
    } else {
      let cart = secureStorage.getItem("cart");
      cart.quantity -= cart.items[itemId].quantity;
      cart.quantity += parseInt(quantity);
      cart.items[itemId].quantity = quantity;
      secureStorage.setItem("cart", cart);
      dispatch({
        type: actionTypes.CHANGE_ITEM_QUANTITY,
        itemId: itemId,
        quantity: quantity,
      });
    }
  };
};

/* To set loading in UI when making change to a cart item */
const changeCartItemStart = (pizza) => {
  return {
    type: actionTypes.CHANGE_CART_ITEM_START,
    itemBeingChanged: pizza,
  };
};

/* To stop loading cart item in UI if changing cart item failed */
const changeCartItemFailed = () => {
  return {
    type: actionTypes.CHANGE_CART_ITEM_FAILED,
  };
};

/* remove item from cart in backend if user signed in or from cart in local storage if not */
export const removeItem = (itemId, pizza) => {
  return (dispatch, getState) => {
    dispatch(changeCartItemStart(pizza));
    if (getState().cart.cartId) {
      axiosFirebase
        .delete(
          "/carts/" +
            getState().cart.cartId +
            "/items/" +
            itemId +
            ".json?auth=" +
            getState().auth.idToken
        )
        .then(() => {
          dispatch({
            type: actionTypes.REMOVE_ITEM_SUCCESS,
            itemId: itemId,
            pizza: pizza,
          });
        })
        .catch(() => {
          dispatch(changeCartItemFailed());
          dispatch(setErroredAction(actionDisplays.REMOVE_ITEM));
        });
    } else {
      let cart = secureStorage.getItem("cart");
      cart.quantity -= cart.items[itemId].quantity;
      delete cart.items[itemId];
      secureStorage.setItem("cart", cart);
      dispatch({
        type: actionTypes.REMOVE_ITEM_SUCCESS,
        itemId: itemId,
        pizza: pizza,
      });
    }
  };
};

export const emptyCart = (userId) => {
  return (dispatch, getState) => {
    if (getState().cart.cartId) {
      let emptyCart = {
        userId: userId,
      };
      axiosFirebase
        .put(
          "/carts/" +
            getState().cart.cartId +
            ".json?auth=" +
            getState().auth.idToken,
          emptyCart
        )
        .then(() => {
          dispatch({
            type: actionTypes.EMPTY_CART,
          });
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.EMPTY_CART));
        });
    } else {
      let emptyCart = { items: {}, quantity: 0 };
      secureStorage.setItem("cart", emptyCart);
      dispatch({
        type: actionTypes.EMPTY_CART,
      });
    }
  };
};

/* Save item to cart in backend if user signed in or in local storage if not */
export const saveToCart = (pizza, quantity, itemId) => {
  return (dispatch, getState) => {
    const item = { pizza: pizza, quantity: quantity };
    dispatch(changeCartItemStart(getState().cart.items[itemId].pizza));
    if (getState().cart.cartId) {
      axiosFirebase
        .put(
          "/carts/" +
            getState().cart.cartId +
            "/items/" +
            itemId +
            ".json?auth=" +
            getState().auth.idToken,
          item
        )
        .then(() => {
          dispatch({
            type: actionTypes.SAVE_TO_CART,
            itemId: itemId,
            item: item,
          });
        })
        .catch(() => {
          dispatch(changeCartItemFailed());
          dispatch(setErroredAction(actionDisplays.SAVE_TO_CART));
        });
    } else {
      let cart = secureStorage.getItem("cart");
      cart.quantity -= cart.items[itemId].quantity;
      cart.items[itemId] = item;
      cart.quantity += item.quantity;
      secureStorage.setItem("cart", cart);
      dispatch({
        type: actionTypes.SAVE_TO_CART,
        itemId: itemId,
        item: item,
      });
    }
  };
};
