import React from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { changeItemQuantity, removeItem } from "../../store/cart/cartActions";
import CartItems from "../../components/CartItems/CartItems";
import CartItem from "../../components/CartItems/CartItem/CartItem";
import Button, { primary } from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";
import {
  handleEditItem,
  handleChangeItemQuantity,
  handleRemoveItem
} from "../../shared/util";

const Cart = props => {
  const calculateSubTotal = () => {
    let subTotal = 0;
    Object.values(props.items).forEach(item => {
      subTotal += item.price * item.quantity;
    });
    return subTotal.toFixed(2);
  };

  const calculateTax = subTotal => {
    return (subTotal * 0.1).toFixed(2);
  };

  const subTotal = calculateSubTotal();
  const tax = calculateTax(subTotal);
  const total = (+subTotal + +tax).toFixed(2);

  return (
    <div className="cart">
      <h1 className="cart__title">My Cart</h1>
      <CartItems
        handleEditItem={(item, itemId) => handleEditItem(props, item, itemId)}
        handleRemoveItem={itemId => handleRemoveItem(props, itemId)}
        handleChangeItemQuantity={(event, itemId) =>
          handleChangeItemQuantity(props, event, itemId)
        }
        items={props.items}
      />
      <div className="cart__totals-container">
        <div className="cart__totals">
          <div className="cart__total-line-items">
            <div className="cart__total-line-item">
              <h3>Subtotal:</h3> <h3>${subTotal}</h3>
            </div>
          </div>

          <Link
            to={{
              pathname: props.isAuthenticated
                ? "/checkout/order-type"
                : "/signin",
              checkout: "true"
            }}
          >
            <Button type={primary}>
              <span>Checkout</span>
            </Button>
          </Link>
          {/*<div className="cart__total-line-item">
              <span>Tax:</span> <span>${tax}</span>
            </div>
            <div className="cart__total-line-item">
              <span>Total:</span> <span>${total}</span>
    </div> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.cart.items,
  cartId: state.cart.cartId,
  isAuthenticated: state.auth.idToken
});

export default connect(mapStateToProps, {
  initializePizzaBuilder,
  changeItemQuantity,
  removeItem
})(Cart);
