import React from "react";
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

const PizzaDescription = props => {
  let sauce = props.item[SAUCE_AMOUNT] + " " + props.item[SAUCE];
  if (props.item[SAUCE_AMOUNT] === NO_SAUCE) {
    sauce = "No";
  }

  let cheeseAmount = props.item[CHEESE_AMOUNT];
  if (props.item[CHEESE_AMOUNT] === NO_CHEESE) {
    cheeseAmount = "No";
  }

  let crustFlavor = null;
  if (props.item[CRUST_FLAVOR] !== NO_CRUST_FLAVOR) {
    crustFlavor = <span>, {props.item[CRUST_FLAVOR]} Crust Flavor</span>;
  }

  let meats = props.item.meats;
  let veggies = props.item.veggies;
  let toppings = [];
  if (meats.length !== 0) {
    toppings.push(...meats);
  }
  if (veggies.length !== 0) {
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

  return (
    <div className="description">
      <div className="description__title">
        <h2>
          {props.item[SIZE]} {props.item[CRUST]} {props.item[COMBO_NAME]} Pizza
        </h2>
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
