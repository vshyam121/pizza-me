import React, { Component } from 'react';
import { HAND_TOSSED } from '../metadata/crustMetadata';
import { LARGE } from '../metadata/sizeMetadata';
import { toppingMapping } from '../metadata/comboMetadata';
import { connect } from 'react-redux';
import { initializePizzaBuilder } from '../store/pizzaBuilder/pizzaBuilderActions/pizzaBuilderActions';
import { addToCart } from '../store/cart/cartActions/cartActions';
import { SIZE, CRUST, COMBO_NAME } from '../metadata/pizzaProperties';
import { normalizePizza, getCrust } from '../shared/util';
import PropTypes from 'prop-types';
import PizzaBox from '../components/PizzaBox/PizzaBox';

/* Container for PizzaBox component */
class PizzaBoxContainer extends Component {
  constructor(props) {
    super(props);
    const initialState = this.getInitialState();
    this.state = {
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
    pizza.crust = getCrust(pizza.crust);
    this.props.initializePizzaBuilder(
      normalizePizza(pizza),
      this.state.quantity
    );
    this.resetState();
  };

  render() {
    return (
      <PizzaBox
        handleClickBuild={this.handleClickBuild}
        handleChangeSize={this.handleChangeSize}
        handleChangeCrust={this.handleChangeCrust}
        handleChangeQuantity={this.handleChangeQuantity}
        resetState={this.resetState}
        {...this.props}
        {...this.state}
      />
    );
  }
}

PizzaBoxContainer.propTypes = {
  priceType: PropTypes.string.isRequired,
  pizzaType: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  pizzaName: PropTypes.string,
};

export default connect(null, { initializePizzaBuilder, addToCart })(
  PizzaBoxContainer
);
