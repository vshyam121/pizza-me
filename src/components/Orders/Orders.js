import React from 'react';
import './Orders.scss';
import Order from '../../components/Order/Order';
import { getReadableDate } from '../../shared/util';
import { SyncLoader } from 'react-spinners';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress';
import PropTypes from 'prop-types';

/* List of all submitted orders */
const Orders = (props) => {
  let orders = null;
  if (
    !props.userId ||
    props.gettingOrders ||
    props.getOrdersError ||
    Object.entries(props.orders).length === 0
  ) {
    let ordersContent = null;
    if (!props.userId) {
      ordersContent = <h2>Sign in to see your orders!</h2>;
    } else if (props.gettingOrders) {
      ordersContent = <SyncLoader />;
    } else if (props.getOrdersError) {
      ordersContent = <h2>Unable to retrieve your orders!</h2>;
    } else {
      ordersContent = <h2>You have no orders yet!</h2>;
    }

    orders = (
      <div className='item-list-container'>
        <div className='item-list'>
          <div className='item-list__title'>
            <h1>Orders</h1>
          </div>
          <div className='item-list__empty'>{ordersContent}</div>
        </div>
      </div>
    );
  } else {
    orders = (
      <React.Fragment>
        {props.orders.reverse().map((order) => {
          let orderType = null;

          if (order.deliveryAddress) {
            orderType = (
              <DeliveryAddress deliveryAddress={order.deliveryAddress} />
            );
          } else {
            orderType = <h2>Carryout Order</h2>;
          }
          return (
            <div key={order._id} className='item-list-container'>
              <div className='item-list item-list--order'>
                <div className='item-list__title'>
                  <span className='order__date-address'>
                    <span className='order__date'>
                      <h2>Order placed on:&nbsp;</h2>
                      <h3> {getReadableDate(order.orderDate)}</h3>
                    </span>
                    {orderType}
                  </span>

                  <span className='order__total'>
                    <h2>Total:&nbsp;</h2>
                    <h3>${order.total}</h3>
                  </span>
                </div>

                {Object.entries(order.items).map(([itemId, item]) => {
                  return (
                    <Order
                      key={itemId}
                      quantity={item.quantity}
                      pizza={item.pizza}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  return orders;
};

Orders.propTypes = {
  userId: PropTypes.string,
  orders: PropTypes.array.isRequired,
  gettingOrders: PropTypes.bool,
  getOrdersError: PropTypes.bool,
};

export default Orders;
