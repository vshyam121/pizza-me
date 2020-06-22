import React, { Component } from "react";
import PizzaBox from "../../../containers/PizzaBox/PizzaBox";
import CheesePizzaImg from "../../../assets/images/pizza_cheese.jpg";
import HawaiianChickenPizzaImg from "../../../assets/images/pizza_Hawaiian_Chicken.png";
import ChickenBaconParmesanImg from "../../../assets/images/pizza_Chicken_Bacon_Parmesan.png";
import BBQChickenPizzaImg from "../../../assets/images/pizza_Backyard_BBQ_Chicken.png";
import BuffaloChickenPizzaImg from "../../../assets/images/pizza_Buffalo_Chicken.png";
import {
  REGULAR,
  COMBO,
  HAWAIIAN_CHICKEN,
  CHICKEN_BACON_PARMESAN,
  BBQ_CHICKEN,
  BUFFALO_CHICKEN,
} from "../../../metadata/comboMetadata";
import {
  CHEESE,
} from "../../../metadata/comboMetadata";
import axiosFirebase from "../../../axiosFirebase";
import withErrorHandler from "../../../hoc/withErrorHandler";

/* Displays various types of chicken pizza */
class Chicken extends Component {
  state = {};

  render() {
    return (
      <div className="pizza-grid">
        <h1 className="pizza-grid__title">Chicken</h1>
        <div className="pizza-grid__grid">
          <PizzaBox
            pizzaType={CHEESE}
            priceType={REGULAR}
            buildPizza
            imageSrc={CheesePizzaImg}
          />
          <PizzaBox
            pizzaType={HAWAIIAN_CHICKEN}
            priceType={COMBO}
            imageSrc={HawaiianChickenPizzaImg}
          />
          <PizzaBox
            pizzaType={CHICKEN_BACON_PARMESAN}
            priceType={COMBO}
            imageSrc={ChickenBaconParmesanImg}
          />
          <PizzaBox
            pizzaType={BBQ_CHICKEN}
            priceType={COMBO}
            imageSrc={BBQChickenPizzaImg}
          />
          <PizzaBox
            pizzaType={BUFFALO_CHICKEN}
            priceType={COMBO}
            imageSrc={BuffaloChickenPizzaImg}
          />
        </div>
      </div>
    );
  }
}

export default withErrorHandler(Chicken, axiosFirebase);
