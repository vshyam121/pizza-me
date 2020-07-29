import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Orders from '../components/Orders/Orders';

/* Container for showing a list of all submitted orders */
const OrdersContainer = (props) => {
  return <Orders {...props} />;
};

OrdersContainer.propTypes = {
  userId: PropTypes.string,
  orders: PropTypes.array.isRequired,
  loadingOrders: PropTypes.bool.isRequired,
  getOrdersError: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  orders: state.checkout.orders,
  loadingOrders: state.checkout.loadingOrders,
  getOrdersError: state.checkout.getOrdersError,
});

export default connect(mapStateToProps, null)(OrdersContainer);
