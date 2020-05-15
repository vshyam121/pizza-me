import * as actionTypes from "./checkoutActionTypes";
import axiosDB from "../../axios";
import axios from "axios";

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
    axiosDB.post("/orders.json?auth=" + idToken, order).then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.SUBMIT_ORDER,
        orderId: res.data.name,
        order: order
      });
    });
  };
};

export const validateAddressReset = () => {
  return {
    type: actionTypes.VALIDATE_ADDRESS_RESET
  };
};

export const validateAddress = addressForm => {
  return dispatch => {
    let params = {
      key: process.env.REACT_APP_SMARTY_STREETS_KEY,
      street: addressForm.street.value,
      secondary: addressForm.unit.value,
      city: addressForm.city.value,
      state: addressForm.state.value,
      zipcode: addressForm.zipcode.value,
      candidates: 10
    };

    dispatch({
      type: actionTypes.VALIDATE_ADDRESS_START
    });

    axios
      .get("https://us-street.api.smartystreets.com/street-address", {
        params: params
      })
      .then(res => {
        console.log(res);
        if (res.data.length > 0) {
          const matchCode = res.data[0].analysis.dpv_match_code;
          if (matchCode === "Y") {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_SUCCESS
            });
          } else if (matchCode === "N") {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_FAILED,
              error: "The address you entered is invalid"
            });
          } else if (matchCode === "S" || matchCode === "D") {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_FAILED,
              error: "Missing or incorrect secondary address (apt/unit)"
            });
          }
        } else {
          dispatch({
            type: actionTypes.VALIDATE_ADDRESS_FAILED,
            error: "The address you entered is invalid"
          });
        }
      })
      .catch(err => {
        console.log(err.response.status);
        dispatch({
          type: actionTypes.VALIDATE_ADDRESS_FAILED
        });
      });

    /*params = {
      apiKey: process.env.REACT_APP_HERE_GEOCODE_API_KEY,
      additionaldata: "IncludeMicroPointAddresses,true"
    };

    params["searchtext"] =
      addressForm.street.value +
      " Unit " +
      addressForm.unit.value +
      " " +
      addressForm.city.value +
      " " +
      addressForm.state.value +
      " " +
      addressForm.zipcode.value;

    dispatch({
      type: actionTypes.VALIDATE_ADDRESS_START
    });

    axios
      .get("https://geocoder.ls.hereapi.com/search/6.2/geocode.json", {
        params: params
      })
      .then(function(response) {
        const view = response.data.Response.View;
        console.log(view);
        if (view.length > 0 && view[0].Result.length > 0) {
          const result = view[0].Result[0];
          if (
            result.Relevance === 1 &&
            result.MatchLevel === "houseNumber" &&
            result.MatchType === "pointAddress"
          ) {
            dispatch({
              type: actionTypes.VALIDATE_ADDRESS_SUCCESS
            });
          }
        } else {
          dispatch({
            type: actionTypes.VALIDATE_ADDRESS_FAILED
          });
        }
      });*/
  };
};

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
