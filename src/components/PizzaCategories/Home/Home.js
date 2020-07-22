import React from 'react';
import PizzaBoxContainer from '../../../containers/PizzaBoxContainer';
import CheesePizzaImg from '../../../assets/images/pizza_cheese.jpg';
import PepperoniPizzaImg from '../../../assets/images/pizza_pepperoni.jpg';
import MeatLoversPizzaImg from '../../../assets/images/pizza_meat_lovers.png';
import SupremePizzaImg from '../../../assets/images/pizza_supreme.png';
import { REGULAR, COMBO } from '../../../metadata/comboMetadata';
import {
  CHEESE,
  PEPPERONI_PIZZA,
  MEAT_LOVER,
  SUPREME,
} from '../../../metadata/comboMetadata';
import OrderSubmission from '../../Messages/OrderSubmissionMessage/OrderSubmissionMessage';
import SignedOutMessage from '../../Messages/SignedOutMessage/SignedOutMessage';
import SignedUpMessage from '../../Messages/SignedUpMessage/SignedUpMessage';
import Message from '../../UI/Message/Message';

/* Displays popular pizzas */
const Home = (props) => {
  let message = null;
  if (props.location.fromCheckout) {
    message = (
      <Message>
        <OrderSubmission />
      </Message>
    );
  } else if (props.location.fromSignOut) {
    message = (
      <Message>
        <SignedOutMessage />
      </Message>
    );
  } else if (props.location.fromSignUp) {
    message = (
      <Message>
        <SignedUpMessage />
      </Message>
    );
  }

  return (
    <React.Fragment>
      {message}
      <div className='pizza-grid'>
        <h1 className='pizza-grid__title'>Popular</h1>
        <div className='pizza-grid__grid'>
          <PizzaBoxContainer
            pizzaType={CHEESE}
            priceType={REGULAR}
            buildPizza
            imageSrc={CheesePizzaImg}
          />
          <PizzaBoxContainer
            pizzaType={CHEESE}
            priceType={REGULAR}
            imageSrc={CheesePizzaImg}
          />
          <PizzaBoxContainer
            pizzaType={PEPPERONI_PIZZA}
            priceType={REGULAR}
            imageSrc={PepperoniPizzaImg}
          />
          <PizzaBoxContainer
            pizzaType={MEAT_LOVER}
            priceType={COMBO}
            imageSrc={MeatLoversPizzaImg}
          />
          <PizzaBoxContainer
            pizzaType={SUPREME}
            priceType={COMBO}
            imageSrc={SupremePizzaImg}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
