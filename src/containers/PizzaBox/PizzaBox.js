import React, { Component } from 'react';
import './PizzaBox.scss';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import Button from '../../components/UI/Button/Button';
import {
  HAND_TOSSED,
  crustMetadataMapping,
} from '../../metadata/crustMetadata';
import { LARGE, sizes } from '../../metadata/sizeMetadata';
import { toppingMapping } from '../../metadata/comboMetadata';
import { connect } from 'react-redux';
import { initializePizzaBuilder } from '../../store/pizzaBuilder/pizzaBuilderActions/pizzaBuilderActions';
import { addToCart } from '../../store/cart/cartActions/cartActions';
import { SIZE, CRUST, COMBO_NAME } from '../../metadata/pizzaProperties';
import { primary, secondary } from '../../components/UI/Button/Button';
import { calculatePrice } from '../../shared/util';
import PropTypes from 'prop-types';

/* UI box container that holds an pizza and lets user customize various pizza properties.
   Can add pizza to order and also build your own pizza from here. */
class PizzaBox extends Component {
  constructor(props) {
    super(props);
    const initialState = this.getInitialState();
    this.state = {
      width: window.innerWidth,
      ...initialState,
    };
  }

  getInitialState = () => {
    let initialState = {
      pizza: {
        priceType: this.props.priceType,
        [COMBO_NAME]: this.props.pizzaType,
        [CRUST]: HAND_TOSSED,
        [SIZE]: LARGE,
      },
      quantity: 1,
    };

    if (toppingMapping[this.props.pizzaType]) {
      initialState = {
        ...initialState,
        pizza: {
          ...initialState.pizza,
          ...toppingMapping[this.props.pizzaType],
        },
      };
    }

    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  handleChangeQuantity = (event) => {
    event.persist();
    this.setState({
      quantity: event.target.value,
    });
  };

  /* get only crust value from crust display value which includes price */
  getCrust = (crustDisplayValue) => {
    const regexp = /(.*) (\+\$.*)/g;
    const match = regexp.exec(crustDisplayValue);
    return match ? match[1] : crustDisplayValue;
  };

  handleChangeCrust = (event) => {
    event.persist();

    this.setState({
      pizza: {
        ...this.state.pizza,
        [CRUST]: event.target.value,
      },
    });
  };

  handleChangeSize = (event) => {
    event.persist();
    this.setState({
      pizza: {
        ...this.state.pizza,
        [SIZE]: event.target.value,
      },
    });
  };

  handleClickBuild = () => {
    let pizza = { ...this.state.pizza };
    pizza.crust = this.getCrust(pizza.crust);
    this.props.initializePizzaBuilder(pizza, this.state.quantity);
    this.resetState();
  };

  handleAddToCart = () => {
    let pizza = { ...this.state.pizza };
    pizza.crust = this.getCrust(pizza.crust);
    this.props.addToCart(pizza, this.state.quantity);
    this.resetState();
  };

  render() {
    const crustOptions = Object.entries(crustMetadataMapping).map(
      ([crust, crustMetadata]) => {
        return (
          crust +
          (crustMetadata.additionalDisplay
            ? ` ${crustMetadata.additionalDisplay}`
            : '')
        );
      }
    );

    const sizeOptions = sizes;
    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let pizza = { ...this.state.pizza };
    pizza.crust = this.getCrust(pizza.crust);
    const price = calculatePrice(pizza);

    let pizzaAdd = null;
    let pizzaName = null;
    let customize = null;
    let customizeSecondary = null;

    if (this.props.buildPizza) {
      pizzaAdd = (
        <Button type={primary} onClick={() => this.handleClickBuild(price)}>
          Get Started
        </Button>
      );
      pizzaName = 'Build Your Own';
      customize = <div className='empty-button'></div>;
    } else {
      pizzaAdd = (
        <React.Fragment>
          <div className='pizza-box__quantity'>
            <Dropdown
              onChange={this.handleChangeQuantity}
              options={quantityOptions}
              value={this.state.quantity}
            />
          </div>
          <Button type={primary} onClick={() => this.handleAddToCart()}>
            Add to Order
          </Button>
        </React.Fragment>
      );
      pizzaName = this.props.pizzaType;
      customize = (
        <Button type={secondary} onClick={() => this.handleClickBuild()}>
          Customize
        </Button>
      );
      customizeSecondary = (
        <span
          className='pizza-box__customize link'
          onClick={() => this.handleClickBuild(price)}
        >
          Customize
        </span>
      );
    }

    return (
      <div className='pizza-box'>
        <h3 className='pizza-box__name'>{pizzaName} Pizza</h3>
        <div className='pizza-box__container'>
          <div className='pizza-box__details'>
            {customizeSecondary}

            <h4 className='pizza-box__price'>
              ${(this.state.quantity * price).toFixed(2)}
            </h4>
            <div className='pizza-box__options'>
              <div className='pizza-box__crust'>
                <Dropdown
                  options={crustOptions}
                  onChange={this.handleChangeCrust}
                  value={this.state.pizza.crust}
                />
              </div>
              <div className='pizza-box__size'>
                <Dropdown
                  options={sizeOptions}
                  onChange={this.handleChangeSize}
                  value={this.state.pizza.size}
                />
              </div>
              <div className='pizza-box__add'>{pizzaAdd}</div>
            </div>
          </div>
          <div className='pizza-box__right'>
            <img
              className='pizza-box__image'
              src={this.props.imageSrc}
              alt={this.props.pizzaName}
            />
            {customize}
          </div>
        </div>
      </div>
    );
  }
}

PizzaBox.propTypes = {
  priceType: PropTypes.string.isRequired,
  pizzaType: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  pizzaName: PropTypes.string,
};

export default connect(null, { initializePizzaBuilder, addToCart })(PizzaBox);
