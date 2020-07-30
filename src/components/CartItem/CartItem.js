import React from 'react';
import './CartItem.scss';
import PizzaDescription from '../../components/PizzaDescription/PizzaDescription';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import PizzaPreview from '../../components/PizzaPreview/PizzaPreview';
import { SyncLoader } from 'react-spinners';
import { isEqual } from 'lodash';
import { calculatePrice } from '../../shared/util';
import PropTypes from 'prop-types';

/* Single cart item with pizza description, price, quantity and edit/remove options */
const CartItem = (props) => {
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  /* Open the pizza builder for editing a pizza */
  const handleEditItem = () => {
    props.initializePizzaBuilder(props.pizza, props.quantity, props.itemId);
  };

  /* Change the quantity of an item in redux store */
  const handleChangeItemQuantity = (event) => {
    props.changeItemQuantity(
      props.cartId,
      props.itemId,
      props.pizza,
      parseInt(event.target.value)
    );
  };

  /* Remove item from cart */
  const handleRemoveItem = () => {
    props.removeItem(props.cartId, props.itemId, props.pizza);
  };

  let remove = null;
  if (!props.checkout) {
    remove = (
      <span className='link' onClick={handleRemoveItem}>
        Remove
      </span>
    );
  }

  let overallPrice = (calculatePrice(props.pizza) * props.quantity).toFixed(2);

  let cartItem = null;
  if (
    props.loadingCartItem &&
    isEqual(props.itemIdBeingChanged, props.itemId)
  ) {
    cartItem = (
      <div className='item__empty'>
        <SyncLoader />
      </div>
    );
  } else {
    cartItem = (
      <div className='item'>
        <div className='item__pizza u-margin-right'>
          <div className='item__preview'>
            <PizzaPreview small pizza={props.pizza} />
          </div>
          <div className='item__description'>
            <PizzaDescription
              cart
              pizza={props.pizza}
              quantity={props.quantity}
            />
          </div>
        </div>
        <div className='item__details'>
          <div className='item__price'>${overallPrice}</div>
          <div className='item__quantity'>
            <Dropdown
              onChange={handleChangeItemQuantity}
              options={quantityOptions}
              value={props.quantity}
              label='quantity'
            />
          </div>
          <div className='item__actions'>
            <span className='item__edit link' onClick={handleEditItem}>
              Edit
            </span>
            {remove}
          </div>
        </div>
      </div>
    );
  }

  return cartItem;
};

CartItem.propTypes = {
  cartId: PropTypes.string,
  itemIdBeingChanged: PropTypes.string,
  loadingCartItem: PropTypes.bool,
  pizza: PropTypes.object.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checkout: PropTypes.bool,
};

export default CartItem;
