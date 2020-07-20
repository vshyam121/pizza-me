import React from 'react';
import { connect } from 'react-redux';
import { submitOrder } from '../store/checkout/checkoutActions/checkoutActions';
import {
  emptyCart,
  changeItemQuantity,
  removeItem,
} from '../store/cart/cartActions/cartActions';
import { initializePizzaBuilder } from '../store/pizzaBuilder/pizzaBuilderActions/pizzaBuilderActions';
import PropTypes from 'prop-types';
import Checkout from '../components/Checkout/Checkout';

/* Container for order summary and ability to submit an order */
const CheckoutContainer = (props) => {
  return <Checkout {...props} />;
};

CheckoutContainer.propTypes = {
  items: PropTypes.object.isRequired,
  idToken: PropTypes.string,
  userId: PropTypes.string,
  loadingCart: PropTypes.bool,
  loadingCartItem: PropTypes.bool,
  itemBeingChanged: PropTypes.object,
  submitOrderError: PropTypes.bool,
  submittingOrder: PropTypes.bool,
  deliveryAddress: PropTypes.object,
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  idToken: state.auth.idToken,
  userId: state.auth.userId,
  loadingCart: state.cart.loadingCart,
  loadingCartItem: state.cart.loadingCartItem,
  itemBeingChanged: state.cart.itemBeingChanged,
  submittingOrder: state.checkout.submittingOrder,
  deliveryAddress: state.checkout.deliveryAddress,
  submitOrderError: state.checkout.submitOrderError,
});

export default connect(mapStateToProps, {
  submitOrder,
  emptyCart,
  removeItem,
  initializePizzaBuilder,
  changeItemQuantity,
})(CheckoutContainer);
