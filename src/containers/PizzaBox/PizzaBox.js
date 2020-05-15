import React, { Component } from "react";
import "./PizzaBox.scss";
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

/* UI Box that holds an pizza and lets user customize various pizza properties.
   Can add pizza to order and also build your own pizza from here. 
*/
class PizzaBox extends Component {
  constructor(props) {
    super(props);
    const initialState = this.getInitialState();
    this.state = {
      width: window.innerWidth,
      ...initialState
    };
  }

  getInitialState = () => {
    let initialState = {
      pizza: {
        price: this.calculatePrice(LARGE, HAND_TOSSED),
        priceType: this.props.priceType,
        [COMBO_NAME]: this.props.pizzaType,
        [CRUST]: HAND_TOSSED,
        [SIZE]: LARGE
      },
      quantity: 1
    };

    if (toppingMapping[this.props.pizzaType][MEATS]) {
      initialState = {
        ...initialState,
        pizza: {
          ...initialState.pizza,
          [MEATS]: toppingMapping[this.props.pizzaType][MEATS]
        }
      };
    }

    if (toppingMapping[this.props.pizzaType][VEGGIES]) {
      initialState = {
        ...initialState,
        pizza: {
          ...initialState.pizza,
          [VEGGIES]: toppingMapping[this.props.pizzaType][VEGGIES]
        }
      };
    }

    return initialState;
  };

  componentDidMount() {
    this.setState({
      pizza: {
        ...this.state.pizza,
        price: calculatePrice(this.state.pizza, false)
      }
    });
  }

  resetState = () => {
    this.setState(this.getInitialState());
  };

  handleChangeQuantity = event => {
    event.persist();
    const singlePrice = this.calculatePrice(
      this.state.pizza.size,
      this.state.pizza.crust
    );
    this.setState({
      pizza: {
        ...this.state.pizza,
        price: singlePrice
      },
      quantity: event.target.value
    });
  };

  handleChangeCrust = event => {
    event.persist();
    const singlePrice = this.calculatePrice(
      this.state.pizza[SIZE],
      event.target.value
    );
    this.setState({
      pizza: {
        ...this.state.pizza,
        [CRUST]: event.target.value,
        price: singlePrice
      }
    });
  };

  handleChangeSize = event => {
    event.persist();
    const singlePrice = this.calculatePrice(
      event.target.value,
      this.state.pizza[CRUST]
    );
    this.setState({
      pizza: {
        ...this.state.pizza,
        [SIZE]: event.target.value,
        price: singlePrice
      }
    });
  };

  calculatePrice = (size, crust) => {
    const basePrice =
      sizePriceMapping[size][this.props.priceType] +
      crustPriceMapping[size][crust];

    let meatsPrice = 0;
    let veggiesPrice = 0;
    if (this.props.priceType !== COMBO) {
      const meats = toppingMapping[this.props.pizzaType][MEATS];
      const veggies = toppingMapping[this.props.pizzaType][VEGGIES];
      meatsPrice = meats ? meats.length * toppingPrice : 0;
      veggiesPrice = veggies ? veggies.length * toppingPrice : 0;
    }

    return (basePrice + meatsPrice + veggiesPrice).toFixed(2);
  };

  handleClickBuild = () => {
    this.props.initializePizzaBuilder(this.state.pizza, this.state.quantity);
    this.resetState();
  };

  handleAddToCart = () => {
    this.props.addToCart(this.state.pizza, this.state.quantity);
    this.resetState();
  };

  render() {
    const crustOptions = [HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN];

    const sizeOptions = [LARGE, MEDIUM, PERSONAL];
    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let pizzaAdd = null;
    let pizzaName = null;
    let customize = null;
    if (this.props.buildPizza) {
      pizzaAdd = (
        <Button type={primary} onClick={this.handleClickBuild}>
          Get Started
        </Button>
      );
      pizzaName = "Build Your Own";
      customize = <div className="empty-button"></div>;
    } else {
      pizzaAdd = (
        <React.Fragment>
          <div className="pizza__quantity">
            <Dropdown
              onChange={this.handleChangeQuantity}
              size={smallDropDown}
              options={quantityOptions}
              value={this.state.quantity}
            />
          </div>
          <Button type={primary} onClick={this.handleAddToCart}>
            Add to Order
          </Button>
        </React.Fragment>
      );
      pizzaName = this.props.pizzaType;
      customize = (
        <Button type={secondary} onClick={this.handleClickBuild}>
          Customize
        </Button>
      );
    }

    return (
      <div className="pizza">
        <div className="pizza__details">
          <div className="pizza__name-price">
            <h3 className="pizza__name">{pizzaName} Pizza</h3>
            <h4>
              ${(this.state.quantity * this.state.pizza.price).toFixed(2)}
            </h4>
          </div>
          <div className="pizza__options">
            <div className="pizza__crust">
              <Dropdown
                options={crustOptions}
                onChange={this.handleChangeCrust}
                value={this.state.pizza.crust}
              />
            </div>
            <div className="pizza__size">
              <Dropdown
                className="pizza__size"
                options={sizeOptions}
                onChange={this.handleChangeSize}
                value={this.state.pizza.size}
              />
            </div>
            <div className="pizza__add">{pizzaAdd}</div>
          </div>
        </div>
        <div className="pizza__right">
          <img
            className="pizza__image"
            src={this.props.imageSrc}
            alt={this.props.pizzaName}
          />
          {customize}
        </div>
      </div>
    );
  }
}

export default connect(null, { initializePizzaBuilder, addToCart })(PizzaBox);
