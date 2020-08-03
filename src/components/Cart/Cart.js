import React from 'react';
import CartItems from './CartItems/CartItems';
import Button, { primary } from '../../components/Theme/Button/Button';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { calculateSubTotal } from '../../shared/util';
import PropTypes from 'prop-types';

/* Shopping cart with all added cart items */
const Cart = (props) => {
  const subTotal = calculateSubTotal(props.items);

  let cart = null;
  if (props.loadingCart) {
    cart = (
      <div className='item-list__empty'>
        <SyncLoader />
      </div>
    );
  } else if (props.items.length > 0) {
    cart = (
      <React.Fragment>
        <CartItems
          initializePizzaBuilder={props.initializePizzaBuilder}
          removeItem={props.removeItem}
          changeItemQuantity={props.changeItemQuantity}
          items={props.items}
          loadingCartItem={props.loadingCartItem}
          itemIdBeingChanged={props.itemIdBeingChanged}
          cartId={props.cartId}
        />
        <div className='item-list__bottom'>
          <div className='totals'>
            <div className='totals__line-items'>
              <div className='totals__line-item'>
                <h2>Subtotal:</h2> <h2>${subTotal}</h2>
              </div>
            </div>

            <Link
              to={{
                pathname: props.userId ? '/checkout/order-type' : '/signin',
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
    if (props.signInError || props.signUpError) {
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
};

Cart.propTypes = {
  items: PropTypes.array.isRequired,
  loadingCart: PropTypes.bool.isRequired,
  loadingCartItem: PropTypes.bool.isRequired,
  itemIdBeingChanged: PropTypes.string,
  userId: PropTypes.string,
  cartId: PropTypes.string,
  signInError: PropTypes.string,
  signUpError: PropTypes.string,
};

export default Cart;
