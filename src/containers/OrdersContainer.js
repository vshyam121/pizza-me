import React from 'react';
import { getOrders } from '../store/checkout/checkoutActions/checkoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Orders from '../components/Orders/Orders';

/* Container for showing a list of all submitted orders */
const OrdersContainer = (props) => {
  return <Orders {...props} />;
};

OrdersContainer.propTypes = {
  idToken: PropTypes.string,
  userId: PropTypes.string,
  orders: PropTypes.object.isRequired,
  gettingOrders: PropTypes.bool,
  getOrdersError: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  idToken: state.auth.idToken,
  userId: state.auth.userId,
  orders: state.checkout.orders,
  gettingOrders: state.checkout.gettingOrders,
  getOrdersError: state.checkout.getOrdersError,
});

export default connect(mapStateToProps, { getOrders })(OrdersContainer);
