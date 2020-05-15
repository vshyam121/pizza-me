import React from "react";
import "./CartItem.scss";
import PizzaDescription from "../../../components/PizzaBuilder/PizzaDescription/PizzaDescription";
import Dropdown from "../../../components/UI/Dropdown/Dropdown";
import { smallDropDown } from "../../../components/UI/Dropdown/Dropdown";
import PizzaPreview from "../../../components/PizzaBuilder/PizzaPreview/PizzaPreview";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { isEqual } from "lodash";

const CartItem = props => {
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log(props.pizza);

  let remove = null;
  if (!props.checkout) {
    remove = (
      <span className="link" onClick={props.removeItem}>
        Remove
      </span>
    );
  }

  let cartItem = null;
  if (props.loading && isEqual(props.itemBeingRemoved, props.pizza)) {
    cartItem = (
      <div className="cart__empty">
        <SyncLoader />
      </div>
    );
  } else {
    cartItem = (
      <div className="cart-item">
        <div className="cart-item__pizza">
          <div className="cart-item__preview">
            <PizzaPreview inCart pizza={props.pizza} />
          </div>
          <div className="cart-item__description">
            <PizzaDescription
              editItem={props.editItem}
              inCart
              pizza={props.pizza}
            />
          </div>
        </div>
        <div className="cart-item__details">
          <div className="cart-item__price">
            ${(props.pizza.price * props.quantity).toFixed(2)}
          </div>
          <div className="cart-item__quantity">
            <Dropdown
              onChange={props.changeItemQuantity}
              size={smallDropDown}
              options={quantityOptions}
              value={props.quantity}
            />
          </div>
          {remove}
        </div>
      </div>
    );
  }

  return cartItem;
};

const mapStateToProps = state => ({
  loading: state.cart.loadingCartItem,
  error: state.cart.errorCartItem,
  itemBeingRemoved: state.cart.itemBeingRemoved
});

export default connect(mapStateToProps, null)(CartItem);
