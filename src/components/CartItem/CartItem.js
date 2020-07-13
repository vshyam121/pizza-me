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

  let remove = null;
  if (!props.checkout) {
    remove = (
      <span className='link' onClick={props.removeItem}>
        Remove
      </span>
    );
  }

  let overallPrice = (calculatePrice(props.pizza) * props.quantity).toFixed(2);

  let cartItem = null;
  console.log(props.loadingCartItem, props.itemBeingChanged);
  if (props.loadingCartItem && isEqual(props.itemBeingChanged, props.pizza)) {
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
              editItem={props.editItem}
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
              onChange={props.changeItemQuantity}
              options={quantityOptions}
              value={props.quantity}
            />
          </div>
          <div className='item__actions'>
            <span className='item__edit link' onClick={props.editItem}>
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
  itemBeingChanged: PropTypes.object,
  loadingCartItem: PropTypes.bool,
  pizza: PropTypes.object.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checkout: PropTypes.bool,
};

export default CartItem;
