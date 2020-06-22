import React, { Component } from "react";
import PizzaBox from "../../../containers/PizzaBox/PizzaBox";
import CheesePizzaImg from "../../../assets/images/pizza_cheese.jpg";
import VeggieLoversPizzaImg from "../../../assets/images/pizza_Veggie_Lovers.png";
import UltimateCheeseLoverPizzaImg from "../../../assets/images/pizza_Ultimate_Cheese_Lovers.png";
import {
  REGULAR,
  COMBO,
  VEGGIE_LOVER,
  ULTIMATE_CHEESE_LOVER,
} from "../../../metadata/comboMetadata";
import { CHEESE } from "../../../metadata/comboMetadata";
import axiosFirebase from "../../../axiosFirebase";
import withErrorHandler from "../../../hoc/withErrorHandler";

/* Displays various types of veggy pizzas */
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

export default withErrorHandler(Veggies, axiosFirebase);
