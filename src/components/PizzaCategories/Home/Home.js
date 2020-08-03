import React from 'react';
import PizzaBoxContainer from '../../../containers/PizzaBoxContainer';
import CheesePizzaImg from '../../../images/pizza_cheese-min.jpg';
import PepperoniPizzaImg from '../../../images/pizza_pepperoni-min.jpg';
import MeatLoversPizzaImg from '../../../images/pizza_meat_lovers.png';
import SupremePizzaImg from '../../../images/pizza_supreme.png';
import { REGULAR, COMBO } from '../../../metadata/comboMetadata';
import {
  CHEESE,
  PEPPERONI_PIZZA,
  MEAT_LOVER,
  SUPREME,
} from '../../../metadata/comboMetadata';
import Message from '../../Theme/Message/Message';
import { Link } from 'react-router-dom';

/* Displays popular pizzas */
const Home = (props) => {
  let message = null;
  if (props.location.fromCheckout) {
    message = (
      <Message>
        <React.Fragment>
          Thank you for ordering at PizzaTime! View your{' '}
          <Link className='link' to='/my-orders' data-test='orders'>
            orders
          </Link>
          .
        </React.Fragment>
      </Message>
    );
  } else if (props.location.fromSignOut) {
    message = <Message>You are now signed out!</Message>;
  } else if (props.location.fromSignUp) {
    message = <Message>You have successfully created an account!</Message>;
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
