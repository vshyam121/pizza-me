import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import PropTypes from 'prop-types';

/* All cart items to display in cart and order summary pages */
const CartItems = (props) => {
  return props.items.map((item) => {
    return (
      <CartItem
        key={item._id}
        itemId={item._id}
        pizza={item.pizza}
        quantity={item.quantity}
        changeItemQuantity={props.changeItemQuantity}
        removeItem={props.removeItem}
        initializePizzaBuilder={props.initializePizzaBuilder}
        checkout={props.checkout}
        loadingCartItem={props.loadingCartItem}
        itemIdBeingChanged={props.itemIdBeingChanged}
        cartId={props.cartId}
      />
    );
  });
};

CartItems.propTypes = {
  cartId: PropTypes.string,
  items: PropTypes.array.isRequired,
  loadingCartItem: PropTypes.bool,
  itemIdBeingChanged: PropTypes.string,
};

export default CartItems;
