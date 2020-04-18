import React, { Component } from "react";
import Dropdown from "../../UI/Dropdown/Dropdown";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import PizzaDescription from "../PizzaDescription/PizzaDescription";
import { smallDropDown } from "../../UI/Dropdown/Dropdown";
import "./PizzaDetails.scss";
import { SIZE, CRUST, MEATS, VEGGIES } from "../../../metadata/pizzaProperties";
import { COMBO } from "../../../metadata/comboMetadata";
import {
  sizePriceMapping,
  crustPriceMapping,
  toppingPrice
} from "../../../metadata/priceMappings";

class PizzaDetails extends Component {
  state = {
    quantity: this.props.item.quantity
  };

  calculatePrice = () => {
    const basePrice =
      sizePriceMapping[this.props.item[SIZE]][this.props.item.priceType] +
      crustPriceMapping[this.props.item[SIZE]][this.props.item[CRUST]];

    let meatsPrice = 0;
    let veggiesPrice = 0;
    if (this.props.item.priceType !== COMBO) {
      meatsPrice = this.props.item[MEATS].length * toppingPrice;
      veggiesPrice = this.props.item[VEGGIES].length * toppingPrice;
    }

    return (basePrice + meatsPrice + veggiesPrice).toFixed(2);
  };

  handleChangeQuantity = event => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    const price = this.calculatePrice();

    let save = null;
    if (this.props.item.alreadyInCart) {
      save = (
        <Link to="/cart">
          <Button
            onClick={() => this.props.saveToCart(price, this.state.quantity)}
            buttonName="Save Changes"
          />
        </Link>
      );
    } else {
      save = (
        <Link to="/cart">
          <Button
            onClick={() => this.props.addToCart(price, this.state.quantity)}
            buttonName="Add to Cart"
          />
        </Link>
      );
    }

    return (
      <div className="pizza">
        <div className="pizza__description">
          <PizzaDescription item={this.props.item} />
        </div>
        <div className="pizza__options">
          {(price * this.state.quantity).toFixed(2)}
          <Dropdown
            size={smallDropDown}
            className="item__size"
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            onChange={this.handleChangeQuantity}
          />
          {save}
        </div>
      </div>
    );
  }
}
export default PizzaDetails;
