import React, { Component } from "react";
import "./ItemBox.scss";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import { smallDropDown } from "../../components/UI/Dropdown/Dropdown";
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
import {
  SIZE,
  CRUST,
  MEATS,
  VEGGIES,
  COMBO_NAME
} from "../../metadata/pizzaProperties";
import { primary, secondary } from "../../components/UI/Button/Button";
import { calculatePrice } from "../../shared/util";

/* UI Box that holds an item and lets user customize various pizza properties.
   Can add item to order and also build your own pizza from here. 
*/
class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      item: {
        priceType: this.props.priceType,
        [COMBO_NAME]:
          this.props.priceType === COMBO ? this.props.pizzaType : null,
        [CRUST]: HAND_TOSSED,
        [SIZE]: LARGE,
        [MEATS]: toppingMapping[this.props.pizzaType][MEATS],
        [VEGGIES]: toppingMapping[this.props.pizzaType][VEGGIES],
        quantity: 1
      }
    };
  }

  componentDidMount() {
    const item = {...this.state.item};
    this.setState({item: {...item, price: calculatePrice(item, false)}});
  }

  resetState = () => {
    this.setState({
      item: {
        price: this.calculatePrice(LARGE, HAND_TOSSED),
        priceType: this.props.priceType,
        [COMBO_NAME]:
          this.props.priceType === COMBO ? this.props.pizzaType : null,
        [CRUST]: HAND_TOSSED,
        [SIZE]: LARGE,
        [MEATS]: toppingMapping[this.props.pizzaType][MEATS],
        [VEGGIES]: toppingMapping[this.props.pizzaType][VEGGIES],
        quantity: 1
      }
    });
  };

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
    this.props.initializePizzaBuilder(this.state.item);
    this.resetState();
  };

  handleAddToCart = () => {
    this.props.addToCart(this.state.item);
    this.resetState();
  };

  render() {
    const crustOptions = [HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN];

    const sizeOptions = [LARGE, MEDIUM, PERSONAL];
    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let itemAdd = null;
    let itemName = null;
    let customize = null;
    if (this.props.buildPizza) {
      itemAdd = (
        <Button type={primary} onClick={this.handleClickBuild}>
          Get Started
        </Button>
      );
      itemName = "Build Your Own";
      customize = <div className="empty-button"></div>;
    } else {
      itemAdd = (
        <React.Fragment>
          <div className="item__quantity">
            <Dropdown
              onChange={this.handleChangeQuantity}
              size={smallDropDown}
              options={quantityOptions}
              value={this.state.item.quantity}
            />
          </div>
          <Button type={primary} onClick={this.handleAddToCart}>
            Add to Order
          </Button>
        </React.Fragment>
      );
      itemName = this.props.pizzaType;
      customize = (
        <Button type={secondary} onClick={this.handleClickBuild}>
          Customize
        </Button>
      );
    }

    return (
      <div className="item">
        <div className="item__details">
          <div className="item__name-price">
            <h3 className="item__name">{itemName} Pizza</h3>
            <h4>
              ${(this.state.item.quantity * this.state.item.price).toFixed(2)}
            </h4>
          </div>
          <div className="item__options">
            <div className="item__crust">
              <Dropdown
                options={crustOptions}
                onChange={this.handleChangeCrust}
                value={this.state.item.crust}
              />
            </div>
            <div className="item__size">
              <Dropdown
                className="item__size"
                options={sizeOptions}
                onChange={this.handleChangeSize}
                value={this.state.item.size}
              />
            </div>
            <div className="item__add">{itemAdd}</div>
          </div>
        </div>
        <div className="item__right">
          <img
            className="item__image"
            src={this.props.imageSrc}
            alt={this.props.itemName}
          />
          {customize}
        </div>
      </div>
    );
  }
}

export default connect(null, { initializePizzaBuilder, addToCart })(ItemBox);
