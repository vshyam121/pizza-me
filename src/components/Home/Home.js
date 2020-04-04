import React, { Component } from "react";
import "./Home.scss";
import ItemBox from "../../containers/ItemBox/ItemBox";
import CheesePizzaImg from "../../assets/images/pizza_cheese.jpg";
import PepperoniPizzaImg from "../../assets/images/pizza_pepperoni.jpg";
import MeatLoversPizzaImg from "../../assets/images/pizza_meat_lovers.webp";
import SupremePizzaImg from "../../assets/images/pizza_supreme.webp";
import { REGULAR, COMBO } from "../../metadata/pizzaMetadata";
import {
  CHEESE,
  PEPPERONI,
  MEAT_LOVER,
  SUPREME
} from "../../metadata/pizzaMetadata";
import PizzaBuilder from "../../containers/PizzaBuilder/PizzaBuilder";
import { connect } from "react-redux";
import pizzaBuilderReducer from "../../store/pizzaBuilder/pizzaBuilderReducer";
import Cart from "../Cart/Cart";

/* Home screen containing popular pizza item boxes */
class Home extends Component {
  state = {
  };

  render() {
    return (
      <div className="home">
          <Cart />
        <ItemBox
          pizzaType={CHEESE}
          priceType={REGULAR}
          buildPizza
          imageSrc={CheesePizzaImg}
        />

        <ItemBox
          pizzaType={CHEESE}
          priceType={REGULAR}
          imageSrc={CheesePizzaImg}
        />
        <ItemBox
          pizzaType={PEPPERONI}
          priceType={REGULAR}
          imageSrc={PepperoniPizzaImg}
        />
        <ItemBox
          pizzaType={MEAT_LOVER}
          priceType={COMBO}
          imageSrc={MeatLoversPizzaImg}
        />
        <ItemBox
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
})

export default connect(mapStateToProps, null)(Home);
