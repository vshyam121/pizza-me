import React from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { changeItemQuantity, removeItem } from "../../store/cart/cartActions";
import CartItems from "../../components/CartItems/CartItems";
import CartItem from "./CartItem/CartItem";
import Button, { primary } from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";
import {
  handleEditItem,
  handleChangeItemQuantity,
  handleRemoveItem,
} from "../../shared/util";
import { SyncLoader } from "react-spinners";

const Cart = (props) => {
  const calculateSubTotal = () => {
    let subTotal = 0;
    Object.values(props.items).forEach((item) => {
      subTotal += item.pizza.price * item.quantity;
    });
    return subTotal.toFixed(2);
  };

  const subTotal = calculateSubTotal();

  let cart = null;
  if (props.loading) {
    cart = (
      <div className="cart__empty">
        <SyncLoader />
      </div>
    );
  } else if (Object.keys(props.items).length > 0) {
    cart = (
      <React.Fragment>
        <CartItems
          handleEditItem={(pizza, quantity, itemId) =>
            handleEditItem(props, pizza, quantity, itemId)
          }
          handleRemoveItem={(itemId, pizza) =>
            handleRemoveItem(props, itemId, pizza)
          }
          handleChangeItemQuantity={(event, itemId) =>
            handleChangeItemQuantity(props, itemId, event.target.value)
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
                checkout: "true",
              }}
            >
              <Button type={primary}>
                <span>Checkout</span>
              </Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    cart = (
      <div className="cart__empty">
        <h2>Your cart is empty!</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart">
        <h1 className="cart__title">Shopping Cart</h1>
        {cart}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  cartId: state.cart.cartId,
  loading: state.cart.loadingCart,
  error: state.cart.errorCart,
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, {
  initializePizzaBuilder,
  changeItemQuantity,
  removeItem,
})(Cart);
