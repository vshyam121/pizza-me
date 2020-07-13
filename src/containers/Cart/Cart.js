import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializePizzaBuilder } from '../../store/pizzaBuilder/pizzaBuilderActions/pizzaBuilderActions';
import {
  changeItemQuantity,
  removeItem,
} from '../../store/cart/cartActions/cartActions';
import CartItems from '../../components/CartItems/CartItems';
import Button, { primary } from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { calculateSubTotal } from '../../shared/util';
import PropTypes from 'prop-types';

/* Shopping cart with all added cart items */
class Cart extends Component {
  render() {
    const subTotal = calculateSubTotal(this.props.items);

    let cart = null;
    if (this.props.loadingCart) {
      cart = (
        <div className='item-list__empty'>
          <SyncLoader />
        </div>
      );
    } else if (Object.keys(this.props.items).length > 0) {
      cart = (
        <React.Fragment>
          <CartItems
            initializePizzaBuilder={this.props.initializePizzaBuilder}
            removeItem={this.props.removeItem}
            changeItemQuantity={this.props.changeItemQuantity}
            items={this.props.items}
            loadingCartItem={this.props.loadingCartItem}
            itemBeingChanged={this.props.itemBeingChanged}
          />
          <div className='item-list__bottom'>
            <div className='totals'>
              <div className='totals__line-items'>
                <div className='totals__line-item'>
                  <h3>Subtotal:</h3> <h3>${subTotal}</h3>
                </div>
              </div>

              <Link
                to={{
                  pathname: this.props.isAuthenticated
                    ? '/checkout/order-type'
                    : '/signin',
                  fromCheckout: true,
                }}
              >
                <Button type={primary}>Checkout</Button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      const emptyCartMessage = <h2>Your cart is empty!</h2>;
      const errorMessage = <h2>Unable to retrieve your cart!</h2>;

      let message = null;
      if (this.props.getCartError) {
        message = errorMessage;
      } else {
        message = emptyCartMessage;
      }
      cart = <div className='item-list__empty'>{message}</div>;
    }

    return (
      <div className='item-list-container'>
        <div className='item-list'>
          <h1 className='item-list__title'>Shopping Cart</h1>
          {cart}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
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
})(Cart);
