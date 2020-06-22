import React, { Component } from "react";
import PizzaBox from "../../../containers/PizzaBox/PizzaBox";
import CheesePizzaImg from "../../../assets/images/pizza_cheese.jpg";
import PepperoniPizzaImg from "../../../assets/images/pizza_pepperoni.jpg";
import MeatLoversPizzaImg from "../../../assets/images/pizza_meat_lovers.png";
import SupremePizzaImg from "../../../assets/images/pizza_supreme.png";
import { REGULAR, COMBO } from "../../../metadata/comboMetadata";
import {
  CHEESE,
  PEPPERONI_PIZZA,
  MEAT_LOVER,
  SUPREME,
} from "../../../metadata/comboMetadata";
import OrderSubmission from "../../Messages/OrderSubmissionMessage/OrderSubmissionMessage";
import SignedOutMessage from "../../Messages/SignedOutMessage/SignedOutMessage";
import SignedUpMessage from "../../Messages/SignedUpMessage/SignedUpMessage";
import Message from "../../UI/Message/Message";
import axiosFirebase from "../../../axiosFirebase";
import withErrorHandler from "../../../hoc/withErrorHandler";

/* Displays popular pizzas */
class Home extends Component {
  render() {

    console.log("render Home");
    let message = null;
    if (this.props.location.fromCheckout) {
      message = (
        <Message>
          <OrderSubmission />
        </Message>
      );
    } else if (this.props.location.fromSignOut) {
      message = (
        <Message>
          <SignedOutMessage />
        </Message>
      );
    } else if (this.props.location.fromSignUp) {
      message = (
        <Message>
          <SignedUpMessage />
        </Message>
      );
    }

    return (
      <React.Fragment>
        {message}
        <div className="pizza-grid">
          <h1 className="pizza-grid__title">Popular</h1>
          <div className="pizza-grid__grid">
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
        </div>
      </React.Fragment>
    );
  }
}

export default withErrorHandler(Home, axiosFirebase);
