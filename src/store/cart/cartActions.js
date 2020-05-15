import * as actionTypes from "./cartActionTypes";
import {
  SAUCE,
  SAUCE_AMOUNT,
  CRUST_FLAVOR,
  CHEESE_AMOUNT
} from "../../metadata/pizzaProperties";
import { CLASSIC_MARINARA, REGULAR_SAUCE } from "../../metadata/sauceMetadata";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";
import axios from "../../axios";
import { v4 as uuidv4 } from "uuid";
import { REGULAR_CHEESE } from "../../metadata/cheeseMetadata";
import hash from "object-hash";

export const createCart = (idToken, userId) => {
  return dispatch => {
    const cart = {
      userId: userId
    };
    axios.post("/carts.json?auth=" + idToken, cart).then(res => {
      dispatch({
        type: actionTypes.CREATE_CART,
        cartId: res.data.name,
        userId: userId
      });
    });
  };
};

export const getCartFromLocalStorage = () => {
  return dispatch => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart.quantity > 0) {
      dispatch(setCartItems(cart));
    }
  };
};

export const combineCarts = (localCart, items, cartId, userId, idToken) => {
  return dispatch => {
    let emptyCart = { items: {}, quantity: 0 };
    localStorage.setItem("cart", JSON.stringify(emptyCart));
    const remoteItemsQuantity = getTotalQuantity(items);
    let itemHashMap = generateItemHashMap(items);
    let localItems = {};
    Object.entries(localCart.items).forEach(([itemId, item]) => {
      const pizzaHash = hash(item.pizza);
      if (itemHashMap[pizzaHash]) {
        items[itemHashMap[pizzaHash]].quantity += parseInt(item.quantity);
      } else {
        itemHashMap[pizzaHash] = itemId;
        items[itemId] = item;
        localItems[itemId] = item;
      }
    });
    if (Object.keys(localItems)) {
      axios
        .patch("/carts/" + cartId + "/items.json?auth=" + idToken, localItems)
        .then(res => {
          dispatch({
            type: actionTypes.GET_CART_SUCCESS,
            userId: userId,
            cartId: cartId,
            items: items,
            quantity: parseInt(localCart.quantity) + remoteItemsQuantity,
            itemHashMap: itemHashMap
          });
        })
        .catch(err => console.log(err));
    } else {
      dispatch({
        type: actionTypes.GET_CART_SUCCESS,
        userId: userId,
        cartId: cartId,
        items: items,
        quantity: localCart.quantity + remoteItemsQuantity,
        itemHashMap: itemHashMap
      });
    }
  };
};

const getTotalQuantity = items => {
  let totalQuantity = 0;
  Object.values(items).forEach(item => {
    totalQuantity += parseInt(item.quantity);
  });

  return totalQuantity;
};

const getCartStart = () => {
  return {
    type: actionTypes.GET_CART_START
  }
}

const getCartFailed = (error) => {
  return {
    type: actionTypes.GET_CART_FAILED,
    error: error
  }
}

export const getCart = (idToken, userId) => {
  return dispatch => {

    dispatch(getCartStart());
    let items = null;
    let cartId = null;
    let quantity;
    axios
      .get(
        "/carts.json?auth=" +
          idToken +
          '&orderBy="userId"&equalTo="' +
          userId +
          '"'
      )
      .then(res => {
        console.log(res);
        if (Object.entries(res.data).length > 0) {
          items = Object.values(res.data)[0].items || {};
          cartId = Object.keys(res.data)[0];
          let localCart = JSON.parse(localStorage.getItem("cart"));
          if (localCart.quantity > 0) {
            dispatch(combineCarts(localCart, items, cartId, userId, idToken));
          } else {
            const itemHashMap = generateItemHashMap(items);
            quantity = getTotalQuantity(items);
            dispatch({
              type: actionTypes.GET_CART_SUCCESS,
              userId: userId,
              cartId: cartId,
              items: items,
              quantity: quantity,
              itemHashMap: itemHashMap
            });
          }
        } else {
          dispatch(createCart(idToken, userId));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(getCartFailed(err.response.data.error));
      });
  };
};

const generateItemHashMap = items => {
  let itemHashMap = {};
  Object.entries(items).forEach(([itemId, item]) => {
    itemHashMap[hash(item.pizza)] = itemId;
  });

  return itemHashMap;
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART
  };
};

const addNewItemToCart = (pizza, quantity) => {
  return (dispatch, getState) => {
    const item = { pizza: pizza, quantity: quantity };
    if (getState().cart.cartId) {
      axios
        .post(
          "/carts/" +
            getState().cart.cartId +
            "/items.json?auth=" +
            getState().auth.idToken,
          item
        )
        .then(res => {
          console.log(res);
          dispatch({
            type: actionTypes.ADD_TO_CART,
            itemId: res.data.name,
            item: item
          });
        });
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const itemId = uuidv4();
      cart.items[itemId] = item;
      cart.quantity += parseInt(item.quantity);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: actionTypes.ADD_TO_CART,
        itemId: itemId,
        item: item
      });
    }
  };
};

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

export const setCartItems = cart => {
  let itemHashMap = generateItemHashMap(cart.items);
  return {
    type: actionTypes.SET_CART_ITEMS,
    items: cart.items,
    quantity: cart.quantity,
    itemHashMap: itemHashMap
  };
};

export const changeItemQuantity = (itemId, quantity) => {
  return (dispatch, getState) => {
    const item = { ...getState().cart.items[itemId] };
    item.quantity = quantity;
    if (getState().cart.cartId) {
      axios
        .put(
          "/carts/" +
            getState().cart.cartId +
            "/items/" +
            itemId +
            ".json?auth=" +
            getState().auth.idToken,
          item
        )
        .then(res => {
          dispatch({
            type: actionTypes.CHANGE_ITEM_QUANTITY,
            itemId: itemId,
            quantity: quantity
          });
        });
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.quantity -= cart.items[itemId].quantity;
      cart.quantity += quantity;
      cart.items[itemId].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: actionTypes.CHANGE_ITEM_QUANTITY,
        itemId: itemId,
        quantity: quantity
      });
    }
  };
};

const removeItemStart = (pizza) => {
  return {
    type: actionTypes.REMOVE_ITEM_START,
    itemBeingRemoved: pizza
  }
}

const removeItemFailed = (error) => {
  return {
    type: actionTypes.REMOVE_ITEM_FAILED,
    error: error
  }
}

export const removeItem = (itemId, pizza) => {
  return (dispatch, getState) => {
    dispatch(removeItemStart(pizza));
    if (getState().cart.cartId) {
      axios
        .delete(
          "/carts/" +
            getState().cart.cartId +
            "/items/" +
            itemId +
            ".json?auth=" +
            getState().auth.idToken
        )
        .then(res => {
          dispatch({
            type: actionTypes.REMOVE_ITEM_SUCCESS,
            itemId: itemId,
            pizza: pizza
          });
        });
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.quantity -= cart.items[itemId].quantity;
      delete cart.items[itemId];
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: actionTypes.REMOVE_ITEM_SUCCESS,
        itemId: itemId,
        pizza: pizza
      });
    }
  };
};

export const emptyCart = userId => {
  return (dispatch, getState) => {
    console.log("in empty cart");
    if (getState().cart.cartId) {
      let emptyCart = {
        userId: userId
      };
      axios
        .put(
          "/carts/" +
            getState().cart.cartId +
            ".json?auth=" +
            getState().auth.idToken,
          emptyCart
        )
        .then(res => {
          dispatch({
            type: actionTypes.EMPTY_CART
          });
        })
        .catch(err => console.log(err));
    } else {
      let emptyCart = { items: {}, quantity: 0 };
      localStorage.setItem("cart", JSON.stringify(emptyCart));
      dispatch({
        type: actionTypes.EMPTY_CART
      });
    }
  };
};

export const saveToCart = (pizza, quantity, itemId) => {
  return (dispatch, getState) => {
    const item = { pizza: pizza, quantity: quantity };

    if (getState().cart.cartId) {
      axios
        .put(
          "/carts/" +
            getState().cart.cartId +
            "/items/" +
            itemId +
            ".json?auth=" +
            getState().auth.idToken,
          item
        )
        .then(res => {
          dispatch({
            type: actionTypes.SAVE_TO_CART,
            itemId: itemId,
            item: item
          });
        })
        .catch(err => console.log(err));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.quantity -= cart.items[itemId].quantity;
      cart.items[itemId] = item;
      cart.quantity += item.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: actionTypes.SAVE_TO_CART,
        itemId: itemId,
        item: item
      });
    }
  };
};
