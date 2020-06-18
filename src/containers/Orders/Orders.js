import React, { Component } from "react";
import "./Orders.scss";
import { getOrders } from "../../store/checkout/checkoutActions";
import { connect } from "react-redux";
import Order from "./Order/Order";
import { getReadableDate } from "../../shared/util";
import { SyncLoader } from "react-spinners";
import DeliveryAddress from "../../components/DeliveryAddress/DeliveryAddress";
import axiosFirebase from "../../axiosFirebase";
import withErrorHandler from "../../hoc/withErrorHandler";

/* Contains a list of all submitted orders */
class Orders extends Component {
  render() {
    let orders = null;
    if (
      !this.props.idToken ||
      this.props.gettingOrders ||
      this.props.getOrdersError ||
      Object.entries(this.props.orders).length === 0
    ) {
      let ordersContent = null;
      if (!this.props.idToken) {
        ordersContent = <h2>Sign in to see your orders!</h2>;
      } else if (this.props.gettingOrders) {
        ordersContent = <SyncLoader />;
      } else if (this.props.getOrdersError) {
        ordersContent = <h2>Unable to retrieve your orders!</h2>;
      } else {
        ordersContent = <h2>You have no orders yet!</h2>
      }

      orders = (
        <div className="item-list-container">
          <div className="item-list">
            <div className="item-list__title">
              <h1>Orders</h1>
            </div>
            <div className="item-list__empty">{ordersContent}</div>
          </div>
        </div>
      );
    } else {
      orders = (
        <React.Fragment>
          {Object.entries(this.props.orders)
            .sort(([itemId1, item1], [itemId2, item2]) => {
              const item1Time = new Date(item1.date).getTime();
              const item2Time = new Date(item2.date).getTime();
              return -(item1Time - item2Time);
            })
            .map(([orderId, order]) => {
              let orderType = null;

              if (order.deliveryAddress) {
                orderType = (
                  <DeliveryAddress deliveryAddress={order.deliveryAddress} />
                );
              } else {
                orderType = <h2>Carryout Order</h2>;
              }
              return (
                <div key={orderId} className="item-list-container">
                  <div className="item-list item-list--order">
                    <div className="item-list__title">
                      <span className="order__date-address">
                        <span className="order__date">
                          <h2>Order placed on:&nbsp;</h2>
                          <h3> {getReadableDate(order.date)}</h3>
                        </span>
                        {orderType}
                      </span>

                      <span className="order__total">
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
  }
}

const mapStateToProps = (state) => ({
  idToken: state.auth.idToken,
  userId: state.auth.userId,
  orders: state.checkout.orders,
  gettingOrders: state.checkout.gettingOrders,
  getOrdersError: state.checkout.getOrdersError
});

export default connect(mapStateToProps, { getOrders })(
  withErrorHandler(Orders, axiosFirebase)
);
