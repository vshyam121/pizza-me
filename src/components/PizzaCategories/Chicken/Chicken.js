import React from 'react';
import PizzaBoxContainer from '../../../containers/PizzaBoxContainer';
import CheesePizzaImg from '../../../images/pizza_cheese-min.jpg';
import HawaiianChickenPizzaImg from '../../../images/pizza_Hawaiian_Chicken.png';
import ChickenBaconParmesanImg from '../../../images/pizza_Chicken_Bacon_Parmesan.png';
import BBQChickenPizzaImg from '../../../images/pizza_Backyard_BBQ_Chicken.png';
import BuffaloChickenPizzaImg from '../../../images/pizza_Buffalo_Chicken.png';
import {
  REGULAR,
  COMBO,
  HAWAIIAN_CHICKEN,
  CHICKEN_BACON_PARMESAN,
  BBQ_CHICKEN,
  BUFFALO_CHICKEN,
} from '../../../metadata/comboMetadata';
import { CHEESE } from '../../../metadata/comboMetadata';

/* Displays various types of chicken pizza */
const Chicken = () => {
  return (
    <div className='pizza-grid'>
      <h1 className='pizza-grid__title'>Chicken</h1>
      <div className='pizza-grid__grid'>
        <PizzaBoxContainer
          pizzaType={CHEESE}
          priceType={REGULAR}
          buildPizza
          imageSrc={CheesePizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={HAWAIIAN_CHICKEN}
          priceType={COMBO}
          imageSrc={HawaiianChickenPizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={CHICKEN_BACON_PARMESAN}
          priceType={COMBO}
          imageSrc={ChickenBaconParmesanImg}
        />
        <PizzaBoxContainer
          pizzaType={BBQ_CHICKEN}
          priceType={COMBO}
          imageSrc={BBQChickenPizzaImg}
        />
        <PizzaBoxContainer
          pizzaType={BUFFALO_CHICKEN}
          priceType={COMBO}
          imageSrc={BuffaloChickenPizzaImg}
        />
      </div>
    </div>
  );
};

export default Chicken;
