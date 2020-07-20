import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, saveToCart } from '../store/cart/cartActions/cartActions';
import {
  closePizzaBuilder,
  setProperty,
  toggleTopping,
  setToppingAmount,
  setToppingPortion,
} from '../store/pizzaBuilder/pizzaBuilderActions/pizzaBuilderActions';
import PropTypes from 'prop-types';
import PizzaBuilder from '../components/PizzaBuilder/PizzaBuilder';

/* Stages that are possible for pizza builder.
   Set in state. */
export const SIZE_CRUST = 'SIZE_CRUST';
export const CHEESE_SAUCE = 'CHEESE_SAUCE';
export const TOPPINGS = 'TOPPINGS';

/* Main container for entire pizza builder */
class PizzaBuilderContainer extends Component {
  state = {
    stage: SIZE_CRUST,
  };

  /* Set current stage of pizza builder based on 
    PizzaBuilderProgres component */
  handleClickStage = (event) => {
    this.setState({ stage: event.target.value });
  };

  /* Set current stage of pizza builder based on
     Back/Next buttons */
  handleClickAction = (stage) => {
    this.setState({ stage: stage });
  };

  /* Reset to first stage and close pizza builder */
  handleCloseBuilder = () => {
    this.setState({ stage: SIZE_CRUST });
    this.props.closePizzaBuilder();
  };

  render() {
    return (
      <PizzaBuilder
        stage={this.state.stage}
        handleClickAction={this.handleClickAction}
        handleClickStage={this.handleClickStage}
        handleCloseBuilder={this.handleCloseBuilder}
        {...this.props}
      />
    );
  }
}

PizzaBuilderContainer.propTypes = {
  itemId: PropTypes.string,
  pizza: PropTypes.object,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showPizzaBuilder: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  itemId: state.pizzaBuilder.itemId,
  pizza: state.pizzaBuilder.pizza,
  quantity: state.pizzaBuilder.quantity,
  showPizzaBuilder: state.pizzaBuilder.showPizzaBuilder,
});

export default connect(mapStateToProps, {
  closePizzaBuilder,
  setProperty,
  toggleTopping,
  setToppingAmount,
  setToppingPortion,
  addToCart,
  saveToCart,
})(PizzaBuilderContainer);
