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
  items: PropTypes.object.isRequired,
  loadingCart: PropTypes.bool,
  loadingCartItem: PropTypes.bool,
  itemBeingChanged: PropTypes.object,
  getCartError: PropTypes.bool,
  isAuthenticated: PropTypes.string,
  cartId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  loadingCart: state.cart.loadingCart,
  loadingCartItem: state.cart.loadingCartItem,
  itemBeingChanged: state.cart.itemBeingChanged,
  getCartError: state.cart.getCartError,
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, {
  initializePizzaBuilder,
  changeItemQuantity,
  removeItem,
})(CartContainer);
