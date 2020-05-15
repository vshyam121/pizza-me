import React, { Component } from "react";
import "./Checkout.scss";
import CartItems from "../../components/CartItems/CartItems";
import {
  handleEditItem,
  handleChangeItemQuantity,
  handleRemoveItem
} from "../../shared/util";
import { Link } from "react-router-dom";
import Button, { primary } from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { orderSubmit } from "../../store/checkout/checkoutActions";
import { emptyCart } from "../../store/cart/cartActions";
import { changeItemQuantity, removeItem } from "../../store/cart/cartActions";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";


const Checkout = props => {
  const calculateSubTotal = () => {
    let subTotal = 0;
    Object.values(props.items).forEach(item => {
      subTotal += item.pizza.price * item.quantity;
    });
    return subTotal.toFixed(2);
  };

  const calculateTax = subTotal => {
    return (subTotal * 0.1).toFixed(2);
  };

  const subTotal = calculateSubTotal();
  const tax = calculateTax(subTotal);
  const total = (+subTotal + +tax).toFixed(2);

  const handleOrderSubmit = () => {
      if(props.idToken){
        props.orderSubmit(props.items, props.idToken, props.userId);
      }
      props.emptyCart(props.userId);
  };

  return (
    <div className="order-summary">
      <h1 className="order-summary__title">Order Summary</h1>
      <CartItems
          handleEditItem={(pizza, quantity, itemId) => handleEditItem(props, pizza, quantity, itemId)}
          handleRemoveItem={(itemId, pizza) => handleRemoveItem(props, itemId, pizza)}
          handleChangeItemQuantity={(event, itemId) =>
            handleChangeItemQuantity(props, itemId, event.target.value)
          }
          checkout
          items={props.items}
        />
      <div className="order-summary__totals-container">
        <div className="order-summary__totals">
          <div className="order-summary__total-line-items">
            <div className="order-summary__total-line-item">
              <h3>Subtotal:</h3> <h3>${subTotal}</h3>
            </div>
            <div className="order-summary__total-line-item">
              <span>Tax:</span> <span>${tax}</span>
            </div>
            <div className="order-summary__total-line-item">
              <span>Total:</span> <span>${total}</span>
            </div>
          </div>
          <Link
            to={{
              pathname: "/thank-you",
              checkout: "true"
            }}
          >
            <Button onClick={handleOrderSubmit} type={primary}>
              <span>Place Order</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.cart.items,
  idToken: state.auth.idToken,
  userId: state.auth.userId
});

export default connect(mapStateToProps, { orderSubmit, emptyCart, removeItem, initializePizzaBuilder, changeItemQuantity })(Checkout);
