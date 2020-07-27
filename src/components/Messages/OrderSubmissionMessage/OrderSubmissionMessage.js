import React from 'react';
import './OrderSubmissionMessage.scss';
import { Link } from 'react-router-dom';

/* A thank you message to be displayed after successfully submitting an order */
const OrderSubmission = () => {
  return (
    <div className='order-submission' data-test='order-submission'>
      <h3
        style={{ display: 'inline' }}
        className='order-submission__thanks'
        data-test='thanks'
      >
        Thank you for ordering at PizzaTime! View your{' '}
        <Link
          className='order-submission__orders'
          to='/my-orders'
          data-test='orders'
        >
          orders
        </Link>
      </h3>
    </div>
  );
};

export default OrderSubmission;
