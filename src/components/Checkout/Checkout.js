import React, { Component } from 'react';
import './Checkout.scss';
import CartItems from '../../components/CartItems/CartItems';
import Button, { primary } from '../../components/UI/Button/Button';
import { calculateSubTotal, calculateTax } from '../../shared/util';
import { SyncLoader } from 'react-spinners';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress';
import PropTypes from 'prop-types';

/* Order summary and ability to submit an order */
class Checkout extends Component {
  handleSubmitOrder = (total) => {
    this.props.submitOrder(
      total,
      this.props.items,
      this.props.deliveryAddress,
      this.props.cartId
    );
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.submittingOrder &&
      !this.props.submittingOrder &&
      !this.props.submitOrderError
    ) {
      this.props.history.push({ pathname: '/', fromCheckout: true });
      this.props.emptyCart(this.props.cartId);
    }
  }

  render() {
    const subTotal = calculateSubTotal(this.props.items);
    const tax = calculateTax(subTotal);
    const total = (+subTotal + +tax).toFixed(2);
    let deliveryAddress = null;
    if (this.props.deliveryAddress) {
      deliveryAddress = (
        <DeliveryAddress deliveryAddress={this.props.deliveryAddress} />
      );
    }

    let submitOrder = null;
    if (this.props.submittingOrder) {
      submitOrder = (
        <Button type={primary}>
          <SyncLoader color='white' size='10px' />
        </Button>
      );
    } else {
      submitOrder = (
        <Button onClick={() => this.handleSubmitOrder(total)} type={primary}>
          Place Order
        </Button>
      );
    }

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
            checkout
            items={this.props.items}
            loadingCartItem={this.props.loadingCartItem}
            itemIdBeingChanged={this.props.itemIdBeingChanged}
            cartId={this.props.cartId}
          />
          <div className='item-list__bottom'>
            <div className='delivery-address'>{deliveryAddress}</div>
            <div className='totals'>
              <div className='totals__line-items'>
                <div className='totals__line-item'>
                  <h4>Subtotal:</h4> <h4>${subTotal}</h4>
                </div>
                <div className='totals__line-item'>
                  <h4>Tax:</h4> <h4>${tax}</h4>
                </div>
                <div className='totals__line-item'>
                  <h2>Total:</h2> <h2>${total}</h2>
                </div>
              </div>

              {submitOrder}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      cart = (
        <div className='item-list__empty'>
          <h2>Your cart is empty!</h2>
        </div>
      );
    }

    return (
      <div className='item-list-container'>
        <div className='item-list'>
          <h1 className='item-list__title'>Checkout</h1>
          {cart}
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  items: PropTypes.array.isRequired,
  loadingCart: PropTypes.bool,
  loadingCartItem: PropTypes.bool,
  itemIdBeingChanged: PropTypes.string,
  submitOrderError: PropTypes.bool,
  submittingOrder: PropTypes.bool,
  deliveryAddress: PropTypes.object,
};

export default Checkout;
