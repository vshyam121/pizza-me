import React, { Component } from "react";
import "./Home.scss";
import PizzaBox from "../../containers/PizzaBox/PizzaBox";
import CheesePizzaImg from "../../assets/images/pizza_cheese.jpg";
import PepperoniPizzaImg from "../../assets/images/pizza_pepperoni.jpg";
import MeatLoversPizzaImg from "../../assets/images/pizza_meat_lovers.webp";
import SupremePizzaImg from "../../assets/images/pizza_supreme.webp";
import { REGULAR, COMBO } from "../../metadata/comboMetadata";
import {
  CHEESE,
  PEPPERONI_PIZZA,
  MEAT_LOVER,
  SUPREME
} from "../../metadata/comboMetadata";
import { connect } from "react-redux";

/* Home screen containing popular pizza boxes */
class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home">
        <PizzaBox
          pizzaType={CHEESE}
          priceType={REGULAR}
          buildPizza
          imageSrc={CheesePizzaImg}
        />
        <PizzaBox
          pizzaType={CHEESE}
          priceType={REGULAR}
          imageSrc={CheesePizzaImg}
        />
        <PizzaBox
          pizzaType={PEPPERONI_PIZZA}
          priceType={REGULAR}
          imageSrc={PepperoniPizzaImg}
        />
        <PizzaBox
          pizzaType={MEAT_LOVER}
          priceType={COMBO}
          imageSrc={MeatLoversPizzaImg}
        />
        <PizzaBox
          pizzaType={SUPREME}
          priceType={COMBO}
          imageSrc={SupremePizzaImg}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  crust: state.pizzaBuilder.crust,
  size: state.pizzaBuilder.size,
  toppings: state.pizzaBuilder.toppings,
  showPizzaBuilder: state.pizzaBuilder.showPizzaBuilder
});

export default connect(mapStateToProps, null)(Home);
