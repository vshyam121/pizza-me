import React from 'react';
import PropTypes from 'prop-types';

/* Displays delivery address in the correct format */
const DeliveryAddress = (props) => {
  return (
    <span className='address-container'>
      <h2>Delivery Address:&nbsp;</h2>
      <span className='address'>
        <h3>
          {props.deliveryAddress.street}, Apt/Unit #
          {props.deliveryAddress.secondary}
        </h3>
        <h3>
          {props.deliveryAddress.city}, {props.deliveryAddress.state}{' '}
          {props.deliveryAddress.zipcode}
        </h3>
      </span>
    </span>
  );
};

DeliveryAddress.propTypes = {
  deliveryAddress: PropTypes.objectOf(PropTypes.string),
};

export default DeliveryAddress;
