import React from "react";
import "./PizzaDescription.scss";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";
import {
  SIZE,
  CRUST,
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
  CRUST_FLAVOR,
  COMBO_NAME,
  MEATS,
  VEGGIES,
  EXTRA_TOPPING,
  LEFT_HALF,
  RIGHT_HALF,
} from "../../metadata/pizzaProperties";
import { NO_CHEESE } from "../../metadata/cheeseMetadata";
import { NO_SAUCE } from "../../metadata/sauceMetadata";
import { calculatePrice } from "../../shared/util";
import PropTypes from "prop-types";

/* Description of pizza, including size, toppings and other descriptives */
const PizzaDescription = (props) => {
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

  const getToppingDescriptions = (toppings) => {
    let toppingDescriptions = [];
    Object.entries(toppings).forEach(([topping, toppingProps]) => {
      let toppingDescription = "";
      if (toppingProps.portion === LEFT_HALF) {
        toppingDescription += "Left Half ";
      } else if (toppingProps.portion === RIGHT_HALF) {
        toppingDescription += "Right Half ";
      }

      if (toppingProps.amount === EXTRA_TOPPING) {
        toppingDescription += "Extra ";
      }
      toppingDescriptions.push(toppingDescription + topping);
    });

    return toppingDescriptions;
  };

  let meats = props.pizza[MEATS] || {};
  let veggies = props.pizza[VEGGIES] || {};

  let toppings = [
    ...getToppingDescriptions(meats),
    ...getToppingDescriptions(veggies),
  ];

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

  const singlePrice = calculatePrice(props.pizza);
  let overallPrice = (singlePrice * props.quantity).toFixed(2);
  let quantity = null;
  let pizzaText = "Pizza";

  if (props.cart) {
    overallPrice = (
      <h2 className="description__price--cart">${overallPrice}</h2>
    );
  } else if (props.order) {
    overallPrice = (
      <h2 className="description__price--order">${overallPrice}</h2>
    );
    quantity = props.quantity + " ";
    if (props.quantity > 1) {
      pizzaText = "Pizzas";
    }
  } else {
    overallPrice = <h2 className="description__price">${overallPrice}</h2>;
  }

  return (
    <div className="description">
      <div className="description__title">
        <div className="description__pizza">
          <h2 className="description__pizza-title">
            {quantity} {props.pizza[SIZE]} {props.pizza[CRUST]}{" "}
            {props.pizza[COMBO_NAME]} {pizzaText}
          </h2>
        </div>
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

PizzaDescription.propTypes = {
  pizza: PropTypes.object.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cart: PropTypes.bool,
  order: PropTypes.bool
}

export default PizzaDescription;
