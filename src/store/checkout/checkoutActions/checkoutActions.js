import * as actionTypes from '../checkoutActionTypes';
import axios from '../../../shared/axiosAPI';
import axiosGeolocation from 'axios';
import * as actionDisplays from '../../ui/actionDisplays';
import { setErroredAction } from '../../ui/uiActions/uiActions';

/* To set loading in UI when starting to submit order */
export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START,
  };
};

/* Submit an order for a user */
export const submitOrder = (total, items, deliveryAddress, userId, cartId) => {
  return (dispatch) => {
    dispatch(submitOrderStart());
    let order = {
      _id: cartId,
      orderDate: new Date(),
      total: total,
    };

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

export const clearDeliveryAddress = () => {
  return {
    type: actionTypes.CLEAR_DELIVERY_ADDRESS,
  };
};
/* Reset all address validation properties */
export const validateDeliveryAddressReset = () => {
  return {
    type: actionTypes.VALIDATE_DELIVERY_ADDRESS_RESET,
  };
};

export const validateDeliveryAddressStart = () => {
  return {
    type: actionTypes.VALIDATE_DELIVERY_ADDRESS_START,
  };
};

/* Call smarty streets geolocation api to validate delivery address */
export const validateDeliveryAddress = (addressForm) => {
  return (dispatch) => {
    let params = {
      key: process.env.REACT_APP_SMARTY_STREETS_KEY,
      street: addressForm.street.value,
      secondary: addressForm.unit.value,
      city: addressForm.city.value,
      state: addressForm.state.value,
      zipcode: addressForm.zipcode.value,
      candidates: 1,
    };

    axiosGeolocation
      .get(process.env.REACT_APP_SMARTY_STREETS_BASE_URL, {
        params: params,
      })
      .then((res) => {
        const matchCode = res.data[0].analysis.dpv_match_code;
        if (matchCode === 'Y') {
          dispatch({
            type: actionTypes.VALIDATE_DELIVERY_ADDRESS_SUCCESS,
            deliveryAddress: {
              streetAddress: addressForm.street.value,
              secondaryAddress: addressForm.unit.value,
              city: addressForm.city.value,
              state: addressForm.state.value,
              zipcode: addressForm.zipcode.value,
            },
          });
        } else if (matchCode === 'S' || matchCode === 'D') {
          dispatch(
            validateDeliveryAddressFailed(
              'Missing or incorrect secondary address (apt/unit)'
            )
          );
        } else {
          dispatch(
            validateDeliveryAddressFailed('The address you entered is invalid')
          );
        }
      })
      .catch(() => {
        dispatch(setErroredAction(actionDisplays.VALIDATE_DELIVERY_ADDRESS));
        dispatch(validateDeliveryAddressFailed());
      });
  };
};

export const validateDeliveryAddressFailed = (error) => {
  return {
    type: actionTypes.VALIDATE_DELIVERY_ADDRESS_FAILED,
    error: error,
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
