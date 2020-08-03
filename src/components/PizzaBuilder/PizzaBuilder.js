import React from 'react';
import './PizzaBuilder.scss';
import PizzaBuilderPreview from './PizzaBuilderPreview/PizzaBuilderPreview';
import PizzaDetails from './PizzaDetails/PizzaDetails';
import PizzaBuilderProgress from './PizzaBuilderProgress/PizzaBuilderProgress';
import Modal from '../../components/Theme/Modal/Modal';
import SizeCrustBuilder from '../../components/PizzaBuilder/Builders/SizeCrustBuilder/SizeCrustBuilder';
import CheeseSauceBuilder from '../../components/PizzaBuilder/Builders/CheeseSauceBuilder/CheeseSauceBuilder';
import ToppingsBuilder from '../../components/PizzaBuilder/Builders/ToppingsBuilder/ToppingsBuilder';
import Button, { primary } from '../../components/Theme/Button/Button';
import PropTypes from 'prop-types';
import { normalizePizza } from '../../shared/util';
import {
  SIZE_CRUST,
  CHEESE_SAUCE,
  TOPPINGS,
} from '../../containers/PizzaBuilderContainer';

/* All controls for building your own pizza */
const PizzaBuilder = (props) => {
  /* Set provided value on given property on current pizza */
  const handleClickProperty = (event, property) => {
    props.setProperty(property, event.currentTarget.dataset.value);
  };

  /* Toggle given topping on current pizza */
  const handleClickTopping = (event, property) => {
    props.toggleTopping(
      props.pizza,
      property,
      event.currentTarget.dataset.value
    );
  };

  const handleClickAmount = (event, property) => {
    props.setToppingAmount(
      props.pizza,
      property,
      event.currentTarget.dataset.topping,
      event.currentTarget.dataset.value
    );
  };

  const handleClickPortion = (event, property) => {
    props.setToppingPortion(
      props.pizza,
      property,
      event.currentTarget.dataset.topping,
      event.currentTarget.dataset.value
    );
  };

  /* Add current pizza to cart and close pizza builder */
  const handleAddToCart = (quantity) => {
    props.addToCart(props.cartId, normalizePizza(props.pizza), quantity);
    props.handleCloseBuilder();
  };

  /* Save current pizza to cart and close pizza builder */
  const handleSaveToCart = (quantity) => {
    props.saveToCart(
      props.cartId,
      normalizePizza(props.pizza),
      quantity,
      props.cartQuantity,
      props.itemId
    );
    props.handleCloseBuilder();
  };

  let builder = null;
  let back = null;
  let next = null;

  /* helper function that returns button that moves
       pizza builder to specified stage */
  const getActionButton = (stage, buttonName) => {
    return (
      <div className='builder-action__step'>
        <Button type={primary} onClick={() => props.handleClickAction(stage)}>
          {buttonName}
        </Button>
      </div>
    );
  };

  /* set SizeCrustBuilder for SIZE_CRUST stage
       and appopriate next button */
  if (props.stage === SIZE_CRUST) {
    builder = (
      <SizeCrustBuilder pizza={props.pizza} onClick={handleClickProperty} />
    );
    next = getActionButton(CHEESE_SAUCE, 'Next');
  } else if (props.stage === CHEESE_SAUCE) {
    /* set CheeseSauceBuilder for CHEESE_SAUCE stage
       and appropriate back/next buttons */
    builder = (
      <CheeseSauceBuilder pizza={props.pizza} onClick={handleClickProperty} />
    );
    back = getActionButton(SIZE_CRUST, 'Back');
    next = getActionButton(TOPPINGS, 'Next');
  } else if (props.stage === TOPPINGS) {
    /* set ToppingsBuilder for TOPPINGS stage
       and appropriate back button */

    builder = (
      <ToppingsBuilder
        pizza={props.pizza}
        onClick={handleClickTopping}
        onClickAmount={handleClickAmount}
        onClickPortion={handleClickPortion}
      />
    );
    back = getActionButton(CHEESE_SAUCE, 'Back');
  }

  let totalBuilder = null;
  if (props.showPizzaBuilder) {
    totalBuilder = (
      <div className='totalBuilder'>
        <div className='totalBuilder__mypizza'>
          <div className='totalBuilder__details'>
            <PizzaDetails
              addToCart={handleAddToCart}
              saveToCart={handleSaveToCart}
              pizza={props.pizza}
              quantity={props.quantity}
              itemId={props.itemId}
            />
          </div>
          <div className='totalBuilder__preview'>
            <PizzaBuilderPreview pizza={props.pizza} />
          </div>
        </div>
        <div className='totalBuilder__builder'>
          <h2 className='builder-title'>Pizza Builder</h2>
          <div className='builder-progress'>
            <PizzaBuilderProgress
              stage={props.stage}
              onClick={props.handleClickStage}
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
    <Modal show={props.showPizzaBuilder} modalClosed={props.handleCloseBuilder}>
      {totalBuilder}
    </Modal>
  );
};

PizzaBuilder.propTypes = {
  itemId: PropTypes.string,
  pizza: PropTypes.object,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showPizzaBuilder: PropTypes.bool,
};

export default PizzaBuilder;
