import * as actionTypes from "./cartActionTypes";
import {
  SAUCE,
  SAUCE_AMOUNT,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES
} from "../../metadata/pizzaProperties";
import { CLASSIC_MARINARA, REGULAR_SAUCE } from "../../metadata/sauceMetadata";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";
import axios from "../../axios";
import { v4 as uuidv4 } from "uuid";

export const createCart = (idToken, userId) => {
  return dispatch => {
    const cart = {
      userId: userId
    };
    axios.post("/carts.json?auth=" + idToken, cart).then(res => {
      console.log(res);
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
    let cartItems = JSON.parse(localStorage.getItem("cart-items"));
    if (Object.keys(cartItems).length > 0) {
      dispatch(setCartItems(cartItems));
    }
  };
};

export const combineCarts = (
  localCartItems,
  items,
  cartId,
  userId,
  idToken
) => {
  return dispatch => {
    axios
      .patch("/carts/" + cartId + "/items.json?auth=" + idToken, localCartItems)
      .then(res => {
        localStorage.setItem("cart-items", JSON.stringify({}));
        dispatch({
          type: actionTypes.GET_CART,
          userId: userId,
          cartId: cartId,
          items: { ...items, ...localCartItems }
        });
      })
      .catch(err => console.log(err));
  };
};

export const getCart = (idToken, userId) => {
  return dispatch => {
    let items = null;
    let cartId = null;
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
          let localCartItems = JSON.parse(localStorage.getItem("cart-items"));
          if (Object.keys(localCartItems).length > 0) {
            dispatch(
              combineCarts(localCartItems, items, cartId, userId, idToken)
            );
          } else {
            dispatch({
              type: actionTypes.GET_CART,
              userId: userId,
              cartId: cartId,
              items: items
            });
          }
        } else {
          dispatch(createCart(idToken, userId));
        }
      })
      .catch(err => console.log(err));
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART
  };
};

export const addToCart = item => {
  return (dispatch, getState) => {
    if (!item[SAUCE]) {
      item[SAUCE] = CLASSIC_MARINARA;
    }
    if (!item[SAUCE_AMOUNT]) {
      item[SAUCE_AMOUNT] = REGULAR_SAUCE;
    }
    if (!item[CRUST_FLAVOR]) {
      item[CRUST_FLAVOR] = NO_CRUST_FLAVOR;
    }

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
            item: { [res.data.name]: item }
          });
        });
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart-items"));
      const itemId = uuidv4();
      cartItems[itemId] = item;
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      dispatch({
        type: actionTypes.ADD_TO_CART,
        item: { [itemId]: item }
      });
    }
  };
};

export const setCartItems = items => {
  return {
    type: actionTypes.SET_CART_ITEMS,
    items: items
  };
};

export const changeItemQuantity = (quantity, itemId) => {
  return (dispatch, getState) => {
    const item = getState().cart.items[itemId];
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
            item: item
          });
        });
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart-items"));
      cartItems[itemId] = item;
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      dispatch(setCartItems(cartItems));
    }
  };
};

export const removeItem = itemId => {
  return (dispatch, getState) => {
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
            type: actionTypes.REMOVE_ITEM,
            itemId: itemId
          });
        });
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart-items"));
      delete cartItems[itemId];
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      dispatch(setCartItems(cartItems));
    }
  };
};

export const saveToCart = (item, itemId) => {
  return (dispatch, getState) => {
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
        }).catch(err => console.log(err));
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart-items"));
      cartItems[itemId] = item;
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      dispatch(setCartItems(cartItems));
    }
  };
};
