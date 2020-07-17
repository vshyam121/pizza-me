import * as actionTypes from '../cartActionTypes';
import axiosFirebase from '../../../shared/axiosFirebase';
import { v4 as uuidv4 } from 'uuid';
import hash from 'object-hash';
import { secureStorage } from '../../../shared/secureStorage';
import * as actionDisplays from '../../ui/actionDisplays';
import { setErroredAction } from '../../ui/uiActions/uiActions';

/* Create cart in backend for a particular user */
export const createCart = (idToken, userId) => {
  return (dispatch) => {
    const cart = {
      userId: userId,
    };
    axiosFirebase.post(`/carts.json?auth=${idToken}`, cart).then((res) => {
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
    let cart = secureStorage.getItem('cart');
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
    let combinedItems = {};

    //Update quantities of matching item in backend cart and add new items from local cart
    //For each local cart item
    Object.entries(localCart.items).forEach(([itemId, item]) => {
      const pizzaHash = hash(item.pizza);
      const matchingItemId = itemHashMap[pizzaHash];

      //If local cart item already exists in item hash map,
      //then update quantity and add it to combined items
      if (matchingItemId) {
        const matchingItem = items[matchingItemId];
        matchingItem.quantity =
          parseInt(matchingItem.quantity) + parseInt(item.quantity);
        combinedItems[matchingItemId] = matchingItem;
      }
      //If only in local cart, then add it to combined items
      else {
        itemHashMap[pizzaHash] = itemId;
        items[itemId] = item;
        combinedItems[itemId] = item;
      }
    });
    //Patch REST API call to update backend with combined items from local cart
    //and backend cart
    axiosFirebase
      .put(`/carts/${cartId}/items.json?auth=${idToken}`, combinedItems)
      .then(() => {
        let emptyCart = { items: {}, quantity: 0 };
        secureStorage.setItem('cart', emptyCart);
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
      .get(`/carts.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`)
      .then((res) => {
        //If cart already exists
        if (Object.entries(res.data).length > 0) {
          items = Object.values(res.data)[0].items || {};
          cartId = Object.keys(res.data)[0];
          let localCart = secureStorage.getItem('cart');

          //Combine local cart with backend cart if there are items in local cart
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
        }
        //If cart doesn't exist yet, then create it
        else {
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
    let item = { pizza: pizza, quantity: quantity };
    const idToken = secureStorage.getItem('idToken');
    const cart = { ...getState().cart };

    //If user is signed in, then add to backend cart
    if (idToken) {
      axiosFirebase
        .post(`/carts/${cart.cartId}/items.json?auth=${idToken}`, item)
        .then((res) => {
          //Update cart state with new item if POST call successful
          const itemId = res.data.name;

          //Add new item to items object
          const itemsWithNewItem = { ...cart.items, [itemId]: item };

          //Update overall cart quantity
          const newQuantity = parseInt(cart.quantity) + parseInt(item.quantity);

          //Update item hash map with new item
          const newItemHashMap = {
            ...cart.itemHashMap,
            [hash(item.pizza)]: itemId,
          };

          //Dispatch to update state
          dispatch({
            type: actionTypes.ADD_TO_CART,
            items: itemsWithNewItem,
            itemHashMap: newItemHashMap,
            quantity: newQuantity,
            numItemsAdded: item.quantity,
          });
        })
        .catch(() => {
          dispatch(setErroredAction(actionDisplays.ADD_ITEM_TO_CART));
        });
    } else {
      dispatch(addNewItemToLocalCart(item, cart));
    }
  };
};

/* If user not signed in, add to local storage cart */
const addNewItemToLocalCart = (item, cart) => {
  return (dispatch) => {
    let localCart = secureStorage.getItem('cart');

    //Generate new item id
    const itemId = uuidv4();

    //Add item and quantity to local cart
    localCart.items[itemId] = item;
    localCart.quantity += parseInt(item.quantity);
    secureStorage.setItem('cart', localCart);

    //Update item hash map with new item
    const newItemHashMap = {
      ...cart.itemHashMap,
      [hash(item.pizza)]: itemId,
    };

    //Dispatch to update state
    dispatch({
      type: actionTypes.ADD_TO_CART,
      items: localCart.items,
      itemHashMap: newItemHashMap,
      quantity: localCart.quantity,
      numItemsAdded: item.quantity,
    });
  };
};

/* Add to cart, either new item or increase quantity for already existing item */
export const addToCart = (pizza, quantity) => {
  return (dispatch, getState) => {
    const cart = { ...getState().cart };

    const matchedItemIdInCart = cart.itemHashMap[hash(pizza)];
    //If item already in cart
    if (matchedItemIdInCart) {
      //Get updated quantity for item
      const newQuantity =
        parseInt(cart.items[matchedItemIdInCart].quantity) + parseInt(quantity);

      //Change item's quantity
      dispatch(changeItemQuantity(matchedItemIdInCart, newQuantity));
    }
    //Add new item to cart because it's not in cart already
    else {
      dispatch(addNewItemToCart(pizza, quantity));
    }
  };
};

/* Set cart items and metadata in redux store */
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
    const cart = { ...getState().cart };
    const item = { quantity: quantity };

    const currentItem = cart.items[itemId];
    dispatch(changeCartItemStart(currentItem.pizza));

    //if user signed in, PUT call to change item quantity in backend cart
    if (cart.cartId) {
      axiosFirebase
        .patch(
          `/carts/${
            cart.cartId
          }/items/${itemId}/.json?auth=${secureStorage.getItem('idToken')}`,
          item
        )
        .then(() => {
          //update cart state with new quantity
          let newQuantity = cart.quantity - currentItem.quantity;
          newQuantity += parseInt(quantity);

          //update current item's quantity
          currentItem.quantity = quantity;

          //Get number of items added
          let numItemsAdded = 0;
          if (cart.quantity < newQuantity) {
            numItemsAdded = newQuantity - cart.quantity;
          }
          dispatch({
            type: actionTypes.CHANGE_ITEM_QUANTITY,
            items: cart.items,
            quantity: newQuantity,
            numItemsAdded: numItemsAdded,
          });
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
    let localCart = secureStorage.getItem('cart');

    //Get old cart quantity
    let oldQuantity = localCart.quantity;

    //Update cart quantity
    localCart.quantity -= localCart.items[itemId].quantity;
    localCart.quantity += parseInt(quantity);

    //Update cart quantity
    localCart.items[itemId].quantity = quantity;
    secureStorage.setItem('cart', localCart);

    //Get number of items added from new cart quantity and old cart quantity
    let numItemsAdded = 0;
    if (oldQuantity < localCart.quantity) {
      numItemsAdded = localCart.quantity - oldQuantity;
    }

    //Dispatch to update cart state
    dispatch({
      type: actionTypes.CHANGE_ITEM_QUANTITY,
      quantity: localCart.quantity,
      items: localCart.items,
      numItemsAdded: numItemsAdded,
    });
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

/* Remove item from cart in backend if user signed in or from cart in local storage if not */
export const removeItem = (itemId, pizza) => {
  return (dispatch, getState) => {
    dispatch(changeCartItemStart(pizza));

    const cart = { ...getState().cart };
    //If user signed in, DELETE call to remove item from backend cart
    if (cart.cartId) {
      axiosFirebase
        .delete(
          `/carts/${
            cart.cartId
          }/items/${itemId}.json?auth=${secureStorage.getItem('idToken')}`
        )
        .then(() => {
          //Get new cart quantity
          let newQuantity = cart.quantity - cart.items[itemId].quantity;

          //Delete from items and item hash map
          delete cart.items[itemId];
          delete cart.itemHashMap[hash(pizza)];

          //Dispatch to set new cart state
          dispatch({
            type: actionTypes.REMOVE_ITEM_SUCCESS,
            items: cart.items,
            itemHashMap: cart.itemHashMap,
            quantity: newQuantity,
          });
        })
        .catch(() => {
          dispatch(changeCartItemFailed());
          dispatch(setErroredAction(actionDisplays.REMOVE_ITEM));
        });
    } else {
      dispatch(removeItemFromLocalCart(itemId, pizza, cart));
    }
  };
};

/* If user not signed in, remove item from local storage cart */
const removeItemFromLocalCart = (itemId, pizza, cart) => {
  return (dispatch) => {
    let localCart = secureStorage.getItem('cart');

    //Get new cart quantity
    localCart.quantity -= parseInt(localCart.items[itemId].quantity);

    //Remove from items
    delete localCart.items[itemId];
    secureStorage.setItem('cart', localCart);

    //Remove from item hash map
    delete cart.itemHashMap[hash(pizza)];

    //Dispatch to set cart state
    dispatch({
      type: actionTypes.REMOVE_ITEM_SUCCESS,
      items: localCart.items,
      itemHashMap: cart.itemHashMap,
      quantity: localCart.quantity,
    });
  };
};

export const emptyCart = (userId) => {
  return (dispatch, getState) => {
    const cart = { ...getState().cart };
    //If user signed in, PUT call to empty backend cart
    if (cart.cartId) {
      let emptyCart = {
        userId: userId,
      };
      axiosFirebase
        .put(
          `/carts/${cart.cartId}.json?auth=${secureStorage.getItem('idToken')}`,
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
    }
    //If user not signed in, empty local storage cart
    else {
      let emptyCart = { items: {}, quantity: 0 };
      secureStorage.setItem('cart', emptyCart);
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
    const cart = { ...getState().cart };
    dispatch(changeCartItemStart(cart.items[itemId].pizza));
    //If user signed in, PUT call to make change to backend cart
    if (cart.cartId) {
      axiosFirebase
        .put(
          `/carts/${
            cart.cartId
          }/items/${itemId}.json?auth=${secureStorage.getItem('idToken')}`,
          item
        )
        .then(() => {
          const oldItem = cart.items[itemId];

          //Get new overall cart quantity
          let newQuantity = cart.quantity - oldItem.quantity;
          newQuantity += parseInt(item.quantity);

          //Update item hash map
          delete cart.itemHashMap[hash(oldItem.pizza)];
          cart.itemHashMap[[hash(item.pizza)]] = itemId;

          //Update items
          cart.items[itemId] = item;

          //Get number of items added
          let numItemsAdded = 0;
          if (cart.quantity < newQuantity) {
            numItemsAdded = newQuantity - cart.quantity;
          }

          //Dispatch to set cart state
          dispatch({
            type: actionTypes.SAVE_TO_CART,
            items: cart.items,
            itemHashMap: cart.itemHashMap,
            quantity: newQuantity,
            numItemsAdded: numItemsAdded,
          });
        })
        .catch(() => {
          dispatch(changeCartItemFailed());
          dispatch(setErroredAction(actionDisplays.SAVE_TO_CART));
        });
    }
    //if user not signed in, make change to local storage cart
    else {
      dispatch(saveToLocalCart(itemId, item, cart));
    }
  };
};

/* If user not signed in, make change to local storage cart */
const saveToLocalCart = (itemId, item, cart) => {
  return (dispatch) => {
    let localCart = secureStorage.getItem('cart');
    let oldQuantity = localCart.quantity;
    let oldItem = localCart.items[itemId];

    //Update quantity
    localCart.quantity -= oldItem.quantity;
    localCart.quantity += parseInt(item.quantity);

    //Update item in local cart
    localCart.items[itemId] = item;

    //Save back to local storage
    secureStorage.setItem('cart', localCart);

    //Get num items added
    let numItemsAdded = 0;
    if (oldQuantity < localCart.quantity) {
      numItemsAdded = localCart.quantity - oldQuantity;
    }

    //Update item hash map
    delete cart.itemHashMap[hash(oldItem.pizza)];
    cart.itemHashMap[[hash(item.pizza)]] = itemId;

    //Dispatch to set cart state
    dispatch({
      type: actionTypes.SAVE_TO_CART,
      quantity: localCart.quantity,
      items: localCart.items,
      itemHashMap: cart.itemHashMap,
      numItemsAdded: numItemsAdded,
    });
  };
};
