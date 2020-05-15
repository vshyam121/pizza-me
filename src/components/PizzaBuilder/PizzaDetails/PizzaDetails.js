import React, { Component } from "react";
import Dropdown from "../../UI/Dropdown/Dropdown";
import Button, { primary } from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import PizzaDescription from "../PizzaDescription/PizzaDescription";
import { smallDropDown } from "../../UI/Dropdown/Dropdown";
import "./PizzaDetails.scss";
import {
  SIZE,
  CRUST,
  MEATS,
  VEGGIES,
  COMBO_NAME
} from "../../../metadata/pizzaProperties";
import { COMBO, toppingMapping } from "../../../metadata/comboMetadata";
import {
  sizePriceMapping,
  crustPriceMapping,
  toppingPrice
} from "../../../metadata/priceMappings";
import { calculatePrice } from "../../../shared/util";

class PizzaDetails extends Component {
  state = {
    quantity: this.props.quantity
  };

  handleChangeQuantity = event => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    const price = calculatePrice(this.props.pizza, true);

    let save = null;
    if (this.props.itemId) {
      save = (
        <Button
          type={primary}
          onClick={() => this.props.saveToCart(price, this.state.quantity)}
        >
          Save Changes
        </Button>
      );
    } else {
      save = (
        <Button
          type={primary}
          onClick={() => this.props.addToCart(price, this.state.quantity)}
        >
          Add to Cart
        </Button>
      );
    }

    return (
      <div className="pizza-details">
        <h3 className="builder-title">My Pizza</h3>
        <div className="pizza-details__details">
          <div className="pizza-details__description">
            <PizzaDescription
              quantity={this.state.quantity}
              pizza={this.props.pizza}
            />
          </div>
          <div className="pizza-details__options">
            <h2 className="pizza-details__price">
              ${(price * this.state.quantity).toFixed(2)}
            </h2>
            <div className="pizza-details__quantity">
              <Dropdown
                size={smallDropDown}
                className="item__size"
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                value={this.state.quantity}
                onChange={this.handleChangeQuantity}
              />
            </div>
            <div className="pizza-details__save">{save}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default PizzaDetails;
