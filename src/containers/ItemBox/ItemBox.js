import React, { Component } from "react";
import "./ItemBox.scss";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import {
  smallDropDown,
  mediumDropDown,
  largeDropDown
} from "../../components/UI/Dropdown/Dropdown";
import Button from "../../components/UI/Button/Button";
import {
  crustPriceMapping,
  sizePriceMapping,
  toppingPrice
} from "../../metadata/priceMappings";
import {
  HAND_TOSSED,
  THIN_N_CRISPY,
  ORIGINAL_PAN
} from "../../metadata/crustMetadata";
import { LARGE, MEDIUM, PERSONAL } from "../../metadata/sizeMetadata";
import { toppingMapping, COMBO } from "../../metadata/comboMetadata";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { addToCart } from "../../store/cart/cartActions";
import { Link } from "react-router-dom";
import { SIZE, CRUST, MEATS, VEGGIES } from "../../metadata/pizzaProperties";

/* UI Box that holds an item and lets user customize various pizza properties.
   Can add item to order and also build your own pizza from here. 
*/
class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        price: this.calculatePrice(LARGE, HAND_TOSSED),
        priceType: this.props.priceType,
        [CRUST]: HAND_TOSSED,
        [SIZE]: LARGE,
        [MEATS]: toppingMapping[this.props.pizzaType][MEATS],
        [VEGGIES]: toppingMapping[this.props.pizzaType][VEGGIES],
        quantity: 1
      }
    };
  }

  handleChangeQuantity = event => {
    event.persist();
    const singlePrice = this.calculatePrice(
      this.state.item.size,
      this.state.item.crust
    );
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        quantity: event.target.value,
        price: singlePrice
      }
    }));
  };

  handleChangeCrust = event => {
    event.persist();
    const singlePrice = this.calculatePrice(
      this.state.item[SIZE],
      event.target.value
    );
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        [CRUST]: event.target.value,
        price: singlePrice
      }
    }));
  };

  handleChangeSize = event => {
    event.persist();
    const singlePrice = this.calculatePrice(
      event.target.value,
      this.state.item[CRUST]
    );
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        [SIZE]: event.target.value,
        price: singlePrice
      }
    }));
  };

  calculatePrice = (size, crust) => {
    const basePrice =
      sizePriceMapping[size][this.props.priceType] +
      crustPriceMapping[size][crust];

    let meatsPrice = 0;
    let veggiesPrice = 0;
    if (this.props.priceType !== COMBO) {
      meatsPrice =
        toppingMapping[this.props.pizzaType][MEATS].length * toppingPrice;
      veggiesPrice =
        toppingMapping[this.props.pizzaType][VEGGIES].length * toppingPrice;
    }

    return (basePrice + meatsPrice + veggiesPrice).toFixed(2);
  };

  handleClickBuild = () => {
    this.props.initializePizzaBuilder(this.state.item, false);
  };

  handleAddToCart = () => {
    this.props.addToCart(this.state.item);
  };

  render() {
    const crustOptions = [HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN];

    const sizeOptions = [LARGE, MEDIUM, PERSONAL];
    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let itemAdd = null;
    let itemName = null;
    if (this.props.buildPizza) {
      itemAdd = (
          <Button onClick={this.handleClickBuild} buttonName="Get Started" />
      );
      itemName = "Build Your Own";
    } else {
      itemAdd = (
        <React.Fragment>
          <div className="item__quantity">
            <Dropdown
              onChange={this.handleChangeQuantity}
              size={smallDropDown}
              options={quantityOptions}
            />
          </div>
          <Button onClick={this.handleAddToCart} buttonName="Add to Order" />
        </React.Fragment>
      );
      itemName = this.props.pizzaType;
    }

    return (
      <div className="item">
        <div className="item__details">
          <div className="item__name-price">
            <h2 className="item__name">{itemName}</h2>
            <h3>
              ${(this.state.item.quantity * this.state.item.price).toFixed(2)}
            </h3>
          </div>
          <div className="item__options">
            <div className="item__crust">
              <Dropdown
                size={largeDropDown}
                options={crustOptions}
                onChange={this.handleChangeCrust}
              />
            </div>
            <div className="item__size">
              <Dropdown
                size={largeDropDown}
                className="item__size"
                options={sizeOptions}
                onChange={this.handleChangeSize}
              />
            </div>
            <div className="item__add">{itemAdd}</div>
          </div>
        </div>
        <img
          className="item__image"
          src={this.props.imageSrc}
          alt={this.props.itemName}
        />
      </div>
    );
  }
}

export default connect(null, { initializePizzaBuilder, addToCart })(ItemBox);
