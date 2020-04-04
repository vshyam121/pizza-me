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
  sizePriceMapping
} from "../../metadata/priceMappings";
import {
  HAND_TOSSED,
  THIN_N_CRISPY,
  ORIGINAL_PAN
} from "../../metadata/pizzaMetadata";
import { LARGE, MEDIUM, PERSONAL } from "../../metadata/pizzaMetadata";
import { toppingMapping } from "../../metadata/pizzaMetadata";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { addToCart } from "../../store/cart/cartActions";

/* UI Box that holds an item and lets user customize various pizza properties.
   Can add item to order and also build your own pizza from here. 
*/
class ItemBox extends Component {
  state = {
    showPizzaBuilder: false,
    price:
      crustPriceMapping[LARGE][HAND_TOSSED] +
      sizePriceMapping[this.props.priceType][LARGE],
    crust: HAND_TOSSED,
    size: LARGE,
    toppings: toppingMapping[this.props.pizzaType],
    quantity: 1
  };

  handleChangeQuantity = event => {
    const singlePrice =
      crustPriceMapping[this.state.size][this.state.crust] +
      sizePriceMapping[this.props.priceType][this.state.size];
    const totalPrice = singlePrice * event.target.value;
    this.setState({
      quantity: event.target.value,
      price: totalPrice.toFixed(2)
    });
  };

  handleChangeCrust = event => {
    const singlePrice =
      crustPriceMapping[this.state.size][event.target.value] +
      sizePriceMapping[this.props.priceType][this.state.size];
    const totalPrice = singlePrice * this.state.quantity;
    this.setState({ crust: event.target.value, price: totalPrice.toFixed(2) });
  };

  handleChangeSize = event => {
    const singlePrice =
      sizePriceMapping[this.props.priceType][event.target.value] +
      crustPriceMapping[event.target.value][this.state.crust];
    const totalPrice = singlePrice * this.state.quantity;
    this.setState({ size: event.target.value, price: totalPrice.toFixed(2) });
  };

  handleClickBuild = () => {
    this.props.initializePizzaBuilder(
      this.state.crust,
      this.state.size,
      this.state.toppings
    );
  };

  handleAddToCart = () => {
    this.props.addToCart({
      crust: this.state.crust,
      size: this.state.size,
      toppings: this.state.toppings
    });
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
            <h3>${this.state.price}</h3>
          </div>
          <div className="item__options">
            <Dropdown
              size={largeDropDown}
              className="item__crust"
              options={crustOptions}
              onChange={this.handleChangeCrust}
            />
            <Dropdown
              size={largeDropDown}
              className="item__size"
              options={sizeOptions}
              onChange={this.handleChangeSize}
            />
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
