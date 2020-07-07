import React from 'react';
import PizzaPreview from '../../components/PizzaPreview/PizzaPreview';
import PizzaDescription from '../../components/PizzaDescription/PizzaDescription';
import PropTypes from 'prop-types';

/* Represents a single submitted order */
const Order = (props) => {
  return (
    <div className='item item--order'>
      <div className='item__pizza'>
        <div className='item__preview'>
          <PizzaPreview small pizza={props.pizza} />
        </div>
        <div className='item__description'>
          <PizzaDescription
            order
            quantity={props.quantity}
            pizza={props.pizza}
          />
        </div>
      </div>
    </div>
  );
};

Order.propTypes = {
  pizza: PropTypes.object.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Order;
