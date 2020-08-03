import React from 'react';
import './DeliveryAddress.scss';
import PropTypes from 'prop-types';

/* Displays delivery address in the correct format */
const DeliveryAddress = (props) => {
  let secondaryAddress = null;
  if (props.deliveryAddress.secondaryAddress) {
    secondaryAddress = (
      <span> Apt/Unit #{props.deliveryAddress.secondaryAddress}</span>
    );
  }
  return (
    <div className='address-container'>
      <h2>Delivery Address:</h2>
      <div className='address'>
        <span>{props.deliveryAddress.streetAddress}</span>
        {secondaryAddress}
        <span>
          {props.deliveryAddress.city}, {props.deliveryAddress.state}{' '}
          {props.deliveryAddress.zipcode}
        </span>
      </div>
    </div>
  );
};

DeliveryAddress.propTypes = {
  deliveryAddress: PropTypes.objectOf(PropTypes.string),
};

export default DeliveryAddress;
