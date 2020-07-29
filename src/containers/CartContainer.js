import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializePizzaBuilder } from '../store/pizzaBuilder/pizzaBuilderActions/pizzaBuilderActions';
import {
  changeItemQuantity,
  removeItem,
} from '../store/cart/cartActions/cartActions';
import PropTypes from 'prop-types';
import Cart from '../components/Cart/Cart';

/* Shopping cart container with all added cart items */
class CartContainer extends Component {
  render() {
    return <Cart {...this.props} />;
  }
}

CartContainer.propTypes = {
  items: PropTypes.array.isRequired,
  loadingCart: PropTypes.bool.isRequired,
  loadingCartItem: PropTypes.bool,
  itemIdBeingChanged: PropTypes.string,
  userId: PropTypes.string,
  cartId: PropTypes.string,
  signInError: PropTypes.string,
  signUpError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  loadingCart: state.cart.loadingCart,
  loadingCartItem: state.cart.loadingCartItem,
  itemIdBeingChanged: state.cart.itemIdBeingChanged,
  userId: state.auth.userId,
  cartId: state.cart.cartId,
  signInError: state.auth.signInError,
  signUpError: state.auth.signUpError,
});

export default connect(mapStateToProps, {
  initializePizzaBuilder,
  changeItemQuantity,
  removeItem,
})(CartContainer);
