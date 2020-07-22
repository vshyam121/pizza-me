import React from 'react';
import PizzaBoxContainer from '../../../containers/PizzaBoxContainer';
import CheesePizzaImg from '../../../assets/images/pizza_cheese.jpg';
import VeggieLoversPizzaImg from '../../../assets/images/pizza_Veggie_Lovers.png';
import UltimateCheeseLoverPizzaImg from '../../../assets/images/pizza_Ultimate_Cheese_Lovers.png';
import {
  REGULAR,
  COMBO,
  VEGGIE_LOVER,
  ULTIMATE_CHEESE_LOVER,
} from '../../../metadata/comboMetadata';
import { CHEESE } from '../../../metadata/comboMetadata';

/* Displays various types of veggy pizzas */
const Veggies = () => {
  return (
    <div className='pizza-grid'>
      <h1 className='pizza-grid__title'>Veggies</h1>
      <div className='pizza-grid__grid'>
        <PizzaBoxContainer
          pizzaType={CHEESE}
          priceType={REGULAR}
          buildPizza
          imageSrc={CheesePizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={VEGGIE_LOVER}
          priceType={COMBO}
          imageSrc={VeggieLoversPizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={ULTIMATE_CHEESE_LOVER}
          priceType={COMBO}
          imageSrc={UltimateCheeseLoverPizzaImg}
        />
      </div>
    </div>
  );
};

export default Veggies;
