import React, { Component } from "react";
import PizzaBox from "../../../containers/PizzaBox/PizzaBox";
import CheesePizzaImg from "../../../assets/images/pizza_cheese.jpg";
import VeggieLoversPizzaImg from "../../../assets/images/pizza_Veggie_Lovers.webp";
import UltimateCheeseLoverPizzaImg from "../../../assets/images/pizza_Ultimate_Cheese_Lovers.webp";
import {
  REGULAR,
  COMBO,
  VEGGIE_LOVER,
  ULTIMATE_CHEESE_LOVER,
} from "../../../metadata/comboMetadata";
import { CHEESE } from "../../../metadata/comboMetadata";

/* Veggies component containing veggy pizza boxes */
class Veggies extends Component {
  render() {
    return (
      <div className="pizza-grid">
        <h1 className="pizza-grid__title">Veggies</h1>
        <div className="pizza-grid__grid">
          <PizzaBox
            pizzaType={CHEESE}
            priceType={REGULAR}
            buildPizza
            imageSrc={CheesePizzaImg}
          />
          <PizzaBox
            pizzaType={VEGGIE_LOVER}
            priceType={COMBO}
            imageSrc={VeggieLoversPizzaImg}
          />
          <PizzaBox
            pizzaType={ULTIMATE_CHEESE_LOVER}
            priceType={COMBO}
            imageSrc={UltimateCheeseLoverPizzaImg}
          />
        </div>
      </div>
    );
  }
}

export default Veggies;
