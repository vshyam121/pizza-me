import React, { Component } from 'react';
import './PizzaBuilder.scss';
import { connect } from 'react-redux';
import PizzaBuilderPreview from '../../components/PizzaBuilder/PizzaBuilderPreview/PizzaBuilderPreview';
import { addToCart, saveToCart } from '../../store/cart/cartActions';
import PizzaDetails from '../../components/PizzaBuilder/PizzaDetails/PizzaDetails';
import PizzaBuilderProgress from '../../components/PizzaBuilder/PizzaBuilderProgress/PizzaBuilderProgress';
import Modal from '../../components/UI/Modal/Modal';
import SizeCrustBuilder from '../../components/PizzaBuilder/Builders/SizeCrustBuilder/SizeCrustBuilder';
import CheeseSauceBuilder from '../../components/PizzaBuilder/Builders/CheeseSauceBuilder/CheeseSauceBuilder';
import ToppingsBuilder from '../../components/PizzaBuilder/Builders/ToppingsBuilder/ToppingsBuilder';
import {
  closePizzaBuilder,
  setProperty,
  toggleTopping,
  setToppingAmount,
  setToppingPortion,
} from '../../store/pizzaBuilder/pizzaBuilderActions';
import Button, { primary } from '../../components/UI/Button/Button';
import PropTypes from 'prop-types';

/* Stages that are possible for pizza builder.
   Set in state. */
export const SIZE_CRUST = 'SIZE_CRUST';
export const CHEESE_SAUCE = 'CHEESE_SAUCE';
export const TOPPINGS = 'TOPPINGS';

/* Main container for entire pizza builder */
class PizzaBuilder extends Component {
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

  /* Set provided value on given property on current pizza */
  handleClickProperty = (event, property) => {
    this.props.setProperty(property, event.currentTarget.dataset.value);
  };

  /* Toggle given topping on current pizza */
  handleClickTopping = (event, property) => {
    this.props.toggleTopping(property, event.currentTarget.dataset.value);
  };

  handleClickAmount = (event, property) => {
    this.props.setToppingAmount(
      property,
      event.currentTarget.dataset.topping,
      event.currentTarget.dataset.value
    );
  };

  handleClickPortion = (event, property) => {
    this.props.setToppingPortion(
      property,
      event.currentTarget.dataset.topping,
      event.currentTarget.dataset.value
    );
  };

  /* Add current pizza to cart and close pizza builder */
  handleAddToCart = (quantity) => {
    this.props.addToCart(this.props.pizza, quantity);
    this.handleCloseBuilder();
  };

  /* Save current pizza to cart and close pizza builder */
  handleSaveToCart = (quantity) => {
    this.props.saveToCart(this.props.pizza, quantity, this.props.itemId);
    this.handleCloseBuilder();
  };

  render() {
    let builder = null;
    let back = null;
    let next = null;

    /* helper function that returns button that moves
       pizza builder to specified stage */
    const getActionButton = (stage, buttonName) => {
      return (
        <div className='builder-action__step'>
          <Button type={primary} onClick={() => this.handleClickAction(stage)}>
            {buttonName}
          </Button>
        </div>
      );
    };

    /* set SizeCrustBuilder for SIZE_CRUST stage
       and appopriate next button */
    if (this.state.stage === SIZE_CRUST) {
      builder = (
        <SizeCrustBuilder
          pizza={this.props.pizza}
          onClick={this.handleClickProperty}
        />
      );
      next = getActionButton(CHEESE_SAUCE, 'Next');
    } else if (this.state.stage === CHEESE_SAUCE) {
      /* set CheeseSauceBuilder for CHEESE_SAUCE stage
       and appropriate back/next buttons */
      builder = (
        <CheeseSauceBuilder
          pizza={this.props.pizza}
          onClick={this.handleClickProperty}
        />
      );
      back = getActionButton(SIZE_CRUST, 'Back');
      next = getActionButton(TOPPINGS, 'Next');
    } else if (this.state.stage === TOPPINGS) {
      /* set ToppingsBuilder for TOPPINGS stage
       and appropriate back button */
      builder = (
        <ToppingsBuilder
          pizza={this.props.pizza}
          onClick={this.handleClickTopping}
          onClickAmount={this.handleClickAmount}
          onClickPortion={this.handleClickPortion}
        />
      );
      back = getActionButton(CHEESE_SAUCE, 'Back');
    }

    let totalBuilder = null;
    if (this.props.showPizzaBuilder) {
      totalBuilder = (
        <div className='totalBuilder'>
          <div className='totalBuilder__mypizza'>
            <div className='totalBuilder__details'>
              <PizzaDetails
                addToCart={this.handleAddToCart}
                saveToCart={this.handleSaveToCart}
                pizza={this.props.pizza}
                quantity={this.props.quantity}
                itemId={this.props.itemId}
              />
            </div>
            <div className='totalBuilder__preview'>
              <PizzaBuilderPreview pizza={this.props.pizza} />
            </div>
          </div>
          <div className='totalBuilder__builder'>
            <h3 className='builder-title'>Pizza Builder</h3>
            <div className='builder-progress'>
              <PizzaBuilderProgress
                stage={this.state.stage}
                onClick={this.handleClickStage}
              />
            </div>
            {builder}
            <div className='builder-action'>
              {back}
              {next}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Modal
        show={this.props.showPizzaBuilder}
        modalClosed={this.handleCloseBuilder}
      >
        {totalBuilder}
      </Modal>
    );
  }
}

PizzaBuilder.propTypes = {
  itemId: PropTypes.string,
  pizza: PropTypes.object,
  quantity: PropTypes.number,
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
})(PizzaBuilder);
