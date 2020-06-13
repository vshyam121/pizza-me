import React from "react";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { changeItemQuantity, removeItem } from "../../store/cart/cartActions";
import CartItems from "../../components/CartItems/CartItems";
import Button, { primary } from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";
import {
  handleEditItem,
  handleChangeItemQuantity,
  handleRemoveItem,
} from "../../shared/util";
import { SyncLoader } from "react-spinners";
import { calculateSubTotal } from "../../shared/util";
import axiosDB from "../../axiosDB";
import withErrorHandler from "../../hoc/withErrorHandler";

const Cart = (props) => {
  const subTotal = calculateSubTotal(props.items);

  let cart = null;
  if (props.loading) {
    cart = (
      <div className="item-list__empty">
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
        <div className="item-list__bottom">
          <div className="totals">
            <div className="totals__line-items">
              <div className="totals__line-item">
                <h3>Subtotal:</h3> <h3>${subTotal}</h3>
              </div>
            </div>

            <Link
              to={{
                pathname: props.isAuthenticated
                  ? "/checkout/order-type"
                  : "/signin",
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
      <div className="item-list__empty">
        <h2>Your cart is empty!</h2>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <div className="item-list">
        <h1 className="item-list__title">Shopping Cart</h1>
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
})(withErrorHandler(Cart, axiosDB));
