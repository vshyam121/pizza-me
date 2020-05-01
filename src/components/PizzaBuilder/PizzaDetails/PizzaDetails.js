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
    quantity: this.props.item.quantity
  };

  calculatePrice = () => {
    const basePrice =
      sizePriceMapping[this.props.item[SIZE]][this.props.item.priceType] +
      crustPriceMapping[this.props.item[SIZE]][this.props.item[CRUST]];

    let meatsPrice = 0;
    let veggiesPrice = 0;
    if (this.props.item.priceType !== COMBO) {
      meatsPrice = this.props.item[MEATS]
        ? this.props.item[MEATS].length * toppingPrice
        : 0;
      veggiesPrice = this.props.item[VEGGIES]
        ? this.props.item[VEGGIES].length * toppingPrice
        : 0;
    } else {
      if (this.props.item[MEATS]) {
        this.props.item[MEATS].map(meat => {
          if (
            !toppingMapping[this.props.item[COMBO_NAME]][MEATS].includes(meat)
          ) {
            meatsPrice += toppingPrice;
          }
        });
      }
      if (this.props.item[VEGGIES]) {
        this.props.item[VEGGIES].map(veggy => {
          if (
            !toppingMapping[this.props.item[COMBO_NAME]][VEGGIES].includes(
              veggy
            )
          ) {
            veggiesPrice += toppingPrice;
          }
        });
      }
    }

    return (basePrice + meatsPrice + veggiesPrice).toFixed(2);
  };

  handleChangeQuantity = event => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    const price = calculatePrice(this.props.item, true);

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
      <div className="pizza">
        <div className="pizza__description">
          <PizzaDescription item={this.props.item} />
        </div>
        <div className="pizza__options">
          <div className="pizza__price">
            ${(price * this.state.quantity).toFixed(2)}
          </div>
          <div className="pizza__quantity">
            <Dropdown
              size={smallDropDown}
              className="item__size"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              value={this.state.quantity}
              onChange={this.handleChangeQuantity}
            />
          </div>
          <div className="pizza__save">{save}</div>
        </div>
      </div>
    );
  }
}
export default PizzaDetails;
