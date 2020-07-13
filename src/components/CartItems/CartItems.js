import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import PropTypes from 'prop-types';

/* All cart items to display in cart and order summary pages */
const CartItems = (props) => {
  return Object.keys(props.items).map((itemId) => {
    const item = props.items[itemId];
    return (
      <CartItem
        key={itemId}
        itemId={itemId}
        pizza={item.pizza}
        quantity={item.quantity}
        changeItemQuantity={props.changeItemQuantity}
        removeItem={props.removeItem}
        initializePizzaBuilder={props.initializePizzaBuilder}
        checkout={props.checkout}
        loadingCartItem={props.loadingCartItem}
        itemBeingChanged={props.itemBeingChanged}
      />
    );
  });
};

CartItems.propTypes = {
  items: PropTypes.objectOf(PropTypes.object).isRequired,
  loadingCartItem: PropTypes.bool,
  itemBeingChanged: PropTypes.object,
};

export default CartItems;
