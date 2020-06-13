import * as actionTypes from "./checkoutActionTypes";
import axiosDB from "../../axiosDB";
import axiosGeolocation from "axios";
import * as actionDisplays from "../ui/actionDisplays";
import { setErroredAction } from "../ui/uiActions";

export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START,
  };
};

export const submitOrder = (total, items, idToken, userId) => {
  return (dispatch, getState) => {
    dispatch(submitOrderStart());
    let order = {
      userId: userId,
      items: items,
      date: new Date(),
      total: total,
    };

    const deliveryAddress = getState().checkout.deliveryAddress;
    if (deliveryAddress) {
      order = { ...order, deliveryAddress: deliveryAddress };
    }
    axiosDB
      .post("/orders.json?auth=" + idToken, order)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SUBMIT_ORDER,
          orderId: res.data.name,
          order: order,
        });
      })
      .catch((err) => {
        dispatch(setErroredAction(actionDisplays.SUBMIT_ORDER));
        dispatch(submitOrderFailed());
      });
  };
};

export const submitOrderFailed = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAILED,
  };
};

export const validateAddressReset = () => {
  return {
    type: actionTypes.VALIDATE_ADDRESS_RESET,
  };
};

export const validateAddress = (addressForm) => {
  return (dispatch) => {
    let params = {
      key: process.env.REACT_APP_SMARTY_STREETS_KEY,
      street: addressForm.street.value,
      secondary: addressForm.unit.value,
      city: addressForm.city.value,
      state: addressForm.state.value,
      zipcode: addressForm.zipcode.value,
      candidates: 10,
    };

    dispatch({
      type: actionTypes.VALIDATE_ADDRESS_START,
    });

    axiosGeolocation
      .get("https://us-street.api.smartystreets.com/street-address", {
        params: params,
      })
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          const matchCode = res.data[0].analysis.dpv_match_code;
          if (matchCode === "Y") {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_SUCCESS,
              deliveryAddress: {
                street: addressForm.street.value,
                secondary: addressForm.unit.value,
                city: addressForm.city.value,
                state: addressForm.state.value,
                zipcode: addressForm.zipcode.value,
              },
            });
          } else if (matchCode === "N") {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_FAILED,
              error: "The address you entered is invalid",
            });
          } else if (matchCode === "S" || matchCode === "D") {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_FAILED,
              error: "Missing or incorrect secondary address (apt/unit)",
            });
          }
        } else {
          dispatch({
            type: actionTypes.VALIDATE_ADDRESS_FAILED,
            error: "The address you entered is invalid",
          });
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        dispatch({
          type: actionTypes.VALIDATE_ADDRESS_FAILED,
        });
      });
  };
};

const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START,
  };
};

const getOrdersFailed = () => {
  return {
    type: actionTypes.GET_ORDERS_FAILED,
  };
};

export const getOrders = (idToken, userId) => {
  return (dispatch) => {
    dispatch(getOrdersStart());
    axiosDB
      .get(
        "/orders.json?auth=" +
          idToken +
          '&orderBy="userId"&equalTo="' +
          userId +
          '"'
      )
      .then((res) => {
        const orders = res.data;
        console.log(orders);
        dispatch({
          type: actionTypes.GET_ORDERS_SUCCESS,
          orders: orders,
        });
      })
      .catch(() => {
        dispatch(setErroredAction(actionDisplays.GET_ORDERS));
        dispatch(getOrdersFailed());
      });
  };
};
