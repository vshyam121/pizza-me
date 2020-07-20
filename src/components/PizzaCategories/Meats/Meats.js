import React from 'react';
import PizzaBox from '../../PizzaBox/PizzaBox';
import CheesePizzaImg from '../../../assets/images/pizza_cheese.jpg';
import PepperoniLoversPizzaImg from '../../../assets/images/pizza_Pepperoni_Lovers.png';
import MeatLoversPizzaImg from '../../../assets/images/pizza_meat_lovers.png';
import SupremePizzaImg from '../../../assets/images/pizza_supreme.png';
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
        <PizzaBox
          pizzaType={CHEESE}
          priceType={REGULAR}
          buildPizza
          imageSrc={CheesePizzaImg}
        />
        <PizzaBox
          pizzaType={SUPREME}
          priceType={COMBO}
          imageSrc={SupremePizzaImg}
        />
        <PizzaBox
          pizzaType={MEAT_LOVER}
          priceType={COMBO}
          imageSrc={MeatLoversPizzaImg}
        />
        <PizzaBox
          pizzaType={PEPPERONI_LOVER}
          priceType={COMBO}
          imageSrc={PepperoniLoversPizzaImg}
        />
        <PizzaBox
          pizzaType={SUPER_SUPREME}
          priceType={COMBO}
          imageSrc={SupremePizzaImg}
        />
      </div>
    </div>
  );
};

export default Meats;
