import React from "react";
import "./CartItem.scss";
import PizzaDescription from "../../components/PizzaBuilder/PizzaDescription/PizzaDescription";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import { smallDropDown } from "../../components/UI/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import PizzaPreview from "../PizzaBuilder/PizzaPreview/PizzaPreview";

const CartItem = props => {
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log(props.item);

  return (
    <div className="cart-item">
      <div className="cart-item__pizza">
        <div className="cart-item__preview">
          <PizzaPreview item={props.item} />
        </div>
        <div className="cart-item__description">
          <PizzaDescription item={props.item} />
        </div>
      </div>
      <div className="cart-item__details">
        <div className="cart-item__price">
          ${(props.item.price * props.item.quantity).toFixed(2)}
        </div>
        <div className="cart-item__quantity">
          <Dropdown
            onChange={props.changeItemQuantity}
            size={smallDropDown}
            options={quantityOptions}
            value={props.item.quantity}
          />
        </div>
        <div className="cart-item__change">
          <a href="#" className="link" to="/cart" onClick={props.editItem}>
            Edit
          </a>
          <a href="#" className="link" to="/cart" onClick={props.removeItem}>
            Remove
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
