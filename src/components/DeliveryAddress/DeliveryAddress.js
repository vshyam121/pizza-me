import React from 'react';
import './DeliveryAddress.scss';
import PropTypes from 'prop-types';

/* Displays delivery address in the correct format */
const DeliveryAddress = (props) => {
  let secondaryAddress = null;
  if (props.deliveryAddress.secondaryAddress) {
    secondaryAddress = (
      <h4> Apt/Unit #{props.deliveryAddress.secondaryAddress}</h4>
    );
  }
  return (
    <div className='address-container'>
      <h2>Delivery Address:</h2>
      <div className='address'>
        <h4>{props.deliveryAddress.streetAddress}</h4>
        {secondaryAddress}
        <h4>
          {props.deliveryAddress.city}, {props.deliveryAddress.state}{' '}
          {props.deliveryAddress.zipcode}
        </h4>
      </div>
    </div>
  );
};

DeliveryAddress.propTypes = {
  deliveryAddress: PropTypes.objectOf(PropTypes.string),
};

export default DeliveryAddress;
