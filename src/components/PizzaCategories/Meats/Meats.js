import React from 'react';
import PizzaBoxContainer from '../../../containers/PizzaBoxContainer';
import CheesePizzaImg from '../../../images/pizza_cheese-min.jpg';
import PepperoniLoversPizzaImg from '../../../images/pizza_Pepperoni_Lovers.png';
import MeatLoversPizzaImg from '../../../images/pizza_meat_lovers.png';
import SupremePizzaImg from '../../../images/pizza_supreme.png';
import { REGULAR, COMBO } from '../../../metadata/comboMetadata';
import {
  CHEESE,
  MEAT_LOVER,
  SUPREME,
  SUPER_SUPREME,
  PEPPERONI_LOVER,
} from '../../../metadata/comboMetadata';

/* Displays various types of meat pizzas */
const Meats = () => {
  return (
    <div className='pizza-grid'>
      <h1 className='pizza-grid__title'>Meats</h1>
      <div className='pizza-grid__grid'>
        <PizzaBoxContainer
          pizzaType={CHEESE}
          priceType={REGULAR}
          buildPizza
          imageSrc={CheesePizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={SUPREME}
          priceType={COMBO}
          imageSrc={SupremePizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={MEAT_LOVER}
          priceType={COMBO}
          imageSrc={MeatLoversPizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={PEPPERONI_LOVER}
          priceType={COMBO}
          imageSrc={PepperoniLoversPizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={SUPER_SUPREME}
          priceType={COMBO}
          imageSrc={SupremePizzaImg}
        />
      </div>
    </div>
  );
};

export default Meats;
