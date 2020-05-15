import React from "react";
import "./PizzaDescription.scss";
import { NO_CRUST_FLAVOR } from "../../../metadata/crustFlavorMetadata";
import {
  SIZE,
  CRUST,
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
  CRUST_FLAVOR,
  COMBO_NAME
} from "../../../metadata/pizzaProperties";
import { NO_CHEESE } from "../../../metadata/cheeseMetadata";
import { NO_SAUCE } from "../../../metadata/sauceMetadata";
import { calculatePrice } from "../../../shared/util";

const PizzaDescription = props => {
  let sauce = props.pizza[SAUCE_AMOUNT] + " " + props.pizza[SAUCE];
  if (props.pizza[SAUCE_AMOUNT] === NO_SAUCE) {
    sauce = "No";
  }

  let cheeseAmount = props.pizza[CHEESE_AMOUNT];
  if (props.pizza[CHEESE_AMOUNT] === NO_CHEESE) {
    cheeseAmount = "No";
  }

  let crustFlavor = null;
  if (props.pizza[CRUST_FLAVOR] !== NO_CRUST_FLAVOR) {
    crustFlavor = <span>, {props.pizza[CRUST_FLAVOR]} Crust Flavor</span>;
  }

  let meats = props.pizza.meats;
  let veggies = props.pizza.veggies;
  let toppings = [];
  if (meats && meats.length !== 0) {
    toppings.push(...meats);
  }
  if (veggies && veggies.length !== 0) {
    toppings.push(...veggies);
  }
  if (toppings.length === 0) {
    toppings = null;
  } else {
    toppings = (
      <div className="description__toppings">
        <h3>Toppings: </h3>
        <span>{toppings.join(", ")}</span>
      </div>
    );
  }

  const singlePrice = calculatePrice(props.pizza, true);
  let overallPrice = null;
  let edit = null;
  if (!props.inCart) {
    overallPrice = (
      <h2 className="description__price">
        ${(singlePrice * props.quantity).toFixed(2)}
      </h2>
    );
  } else {
    edit = (
      <span className="description__edit link" onClick={props.editItem}>
        Edit
      </span>
    );
  }

  return (
    <div className="description">
      <div className="description__title">
        <div className="description__pizza">
          <h2>
            {props.pizza[SIZE]} {props.pizza[CRUST]} {props.pizza[COMBO_NAME]}{" "}
            Pizza
          </h2>
        </div>
        {edit}
        {overallPrice}
      </div>
      <div className="description__details">
        <span>{sauce} Sauce, </span>
        <span>{cheeseAmount} Cheese</span>
        {crustFlavor}
        {toppings}
      </div>
    </div>
  );
};

export default PizzaDescription;
