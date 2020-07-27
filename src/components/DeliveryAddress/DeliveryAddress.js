import React from 'react';
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
    <React.Fragment>
      <h2>Delivery Address:&nbsp;</h2>
      <span className='address'>
        <h4>{props.deliveryAddress.streetAddress}</h4>
        {secondaryAddress}
        <h4>
          {props.deliveryAddress.city}, {props.deliveryAddress.state}{' '}
          {props.deliveryAddress.zipcode}
        </h4>
      </span>
    </React.Fragment>
  );
};

DeliveryAddress.propTypes = {
  deliveryAddress: PropTypes.objectOf(PropTypes.string),
};

export default DeliveryAddress;
