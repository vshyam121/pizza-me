import * as actionTypes from '../checkoutActionTypes';
import axios from '../../../shared/axiosAPI';
import axiosGeolocation from 'axios';
import * as actionDisplays from '../../ui/actionDisplays';
import { setErroredAction } from '../../ui/uiActions/uiActions';

axios.defaults.withCredentials = true;
/* To set loading in UI when starting to submit order */
export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START,
  };
};

/* Submit an order for a user */
export const submitOrder = (total, items, cartId, userId) => {
  return (dispatch, getState) => {
    dispatch(submitOrderStart());
    let order = {
      _id: cartId,
      orderDate: new Date(),
      total: total,
    };

    const deliveryAddress = getState().checkout.deliveryAddress;
    if (deliveryAddress) {
      order = { ...order, deliveryAddress: deliveryAddress };
    }
    axios
      .post(`/orders/${userId}`, order)
      .then((res) => {
        dispatch({
          type: actionTypes.SUBMIT_ORDER_SUCCESS,
          order: res.data.order,
        });
      })
      .catch(() => {
        dispatch(setErroredAction(actionDisplays.SUBMIT_ORDER));
        dispatch(submitOrderFailed());
      });
  };
};

/* Stop loading in UI when submitting order failed */
export const submitOrderFailed = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAILED,
  };
};

/* Reset all address validation properties */
export const validateAddressReset = () => {
  return {
    type: actionTypes.VALIDATE_ADDRESS_RESET,
  };
};

/* Call smarty streets geolocation api to validate delivery address */

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
      .get(process.env.REACT_APP_SMARTY_STREETS_BASE_URL, {
        params: params,
      })
      .then((res) => {
        if (res.data.length > 0) {
          const matchCode = res.data[0].analysis.dpv_match_code;
          if (matchCode === 'Y') {
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
          } else if (matchCode === 'N') {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_FAILED,
              error: 'The address you entered is invalid',
            });
          } else if (matchCode === 'S' || matchCode === 'D') {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_FAILED,
              error: 'Missing or incorrect secondary address (apt/unit)',
            });
          }
        } else {
          dispatch({
            type: actionTypes.VALIDATE_ADDRESS_FAILED,
            error: 'The address you entered is invalid',
          });
        }
      })
      .catch(() => {
        dispatch(setErroredAction(actionDisplays.VALIDATE_ADDRESS));
        dispatch({
          type: actionTypes.VALIDATE_ADDRESS_FAILED,
        });
      });
  };
};

/* To set loading in UI when getting orders */
const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START,
  };
};

/* To finish loading in UI after getting orders failed */
const getOrdersFailed = () => {
  return {
    type: actionTypes.GET_ORDERS_FAILED,
  };
};

/* Get all past orders for a particular user */
export const getOrders = (userId) => {
  return (dispatch) => {
    dispatch(getOrdersStart());
    axios
      .get(`/orders/${userId}`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_ORDERS_SUCCESS,
          orders: res.data.orders,
        });
      })
      .catch(() => {
        dispatch(setErroredAction(actionDisplays.GET_ORDERS));
        dispatch(getOrdersFailed());
      });
  };
};
