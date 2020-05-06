import * as actionTypes from "./orderActionTypes";
import axios from "../../axios";
import { emptyCart } from "../cart/cartActions";

export const storeUserInfo = userInfo => {
  return {
    type: actionTypes.STORE_USER_INFO,
    userInfo: userInfo
  };
};

export const orderSubmit = (items, idToken, userId) => {
return dispatch => {
    const order = {
      userId: userId,
      items: items
    };
    axios.post("/orders.json?auth=" + idToken, order).then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.SUBMIT_ORDER,
        orderId: res.data.name,
        order: order
      });
    });
  };
}

/*export const getOrders = (idToken, userId) => {
  return dispatch => {
    let items = null;
    let cartId = null;
    axios
      .get(
        "/orders.json?auth=" +
          idToken +
          '&orderBy="userId"&equalTo="' +
          userId +
          '"'
      )
      .then(res => {
        console.log(res);
        let orders = {};
        if (Object.entries(res.data).length > 0) {
            Object.entries(res.data).map(([key, value]) => {

            })
          items = Object.values(res.data)[0].items || {};
          cartId = Object.keys(res.data)[0];
          else {
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
};*/
