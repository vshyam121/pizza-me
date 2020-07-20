import React, { Component } from 'react';
import CartItems from '../../components/CartItems/CartItems';
import Button, { primary } from '../../components/UI/Button/Button';
import { calculateSubTotal, calculateTax } from '../../shared/util';
import { SyncLoader } from 'react-spinners';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress';
import PropTypes from 'prop-types';

/* Order summary and ability to submit an order */
class Checkout extends Component {
  handleSubmitOrder = (total) => {
    if (this.props.idToken) {
      this.props.submitOrder(
        total,
        this.props.items,
        this.props.idToken,
        this.props.userId
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.submittingOrder &&
      !this.props.submittingOrder &&
      !this.props.submitOrderError
    ) {
      this.props.history.push({ pathname: '/', fromCheckout: true });
      this.props.emptyCart(this.props.userId);
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
          <SyncLoader color='white' />
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
    if (this.props.loading) {
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
            itemBeingChanged={this.props.itemBeingChanged}
          />
          <div className='item-list__bottom'>
            {deliveryAddress}
            <div className='totals'>
              <div className='totals__line-items'>
                <div className='totals__line-item'>
                  <h3>Subtotal:</h3> <h3>${subTotal}</h3>
                </div>
                <div className='totals__line-item'>
                  <h3>Tax:</h3> <h3>${tax}</h3>
                </div>
                <div className='totals__line-item'>
                  <h3>Total:</h3> <h3>${total}</h3>
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
          <h1 className='item-list__title'>Order Summary</h1>
          {cart}
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
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

export default Checkout;
