import * as actionTypes from '../pizzaBuilderActionTypes';
import { REGULAR_TOPPING, WHOLE } from '../../../metadata/pizzaProperties';

/* Initialize pizza builder with properties of given pizza */
export const initializePizzaBuilder = (pizza, quantity, itemId) => {
  return {
    type: actionTypes.INIT_PIZZA_BUILDER,
    pizza: pizza,
    quantity: quantity,
    itemId: itemId,
  };
};

export const closePizzaBuilder = () => {
  return {
    type: actionTypes.CLOSE_PIZZA_BUILDER,
  };
};

/* Dynamically set a pizza property value */
export const setProperty = (property, value) => {
  return {
    type: actionTypes.SET_PROPERTY,
    property: property,
    value: value,
  };
};

/* Select/deselect a topping */
export const toggleTopping = (pizza, property, value) => {
  let toppings = [...pizza[property]];

  const toppingIndex = toppings.findIndex(
    (topping) => topping.toppingName === value
  );
  if (toppingIndex < 0) {
    toppings.push({
      toppingName: value,
      amount: REGULAR_TOPPING,
      portion: WHOLE,
    });
  } else {
    toppings.splice(toppingIndex, 1);
  }
  return {
    type: actionTypes.SET_PROPERTY,
    property: property,
    value: toppings,
  };
};

/* Set the topping amount, whether regular/extra */
export const setToppingAmount = (pizza, property, topping, value) => {
  let toppings = [...pizza[property]];
  const toppingIndex = toppings.findIndex(
    (selectedTopping) => selectedTopping.toppingName === topping
  );

  if (toppingIndex < 0) {
    toppings.push({
      toppingName: topping,
      amount: value,
      portion: WHOLE,
    });
  } else {
    toppings[toppingIndex] = {
      ...toppings[toppingIndex],
      amount: value,
    };
  }

  return {
    type: actionTypes.SET_PROPERTY,
    property: property,
    value: toppings,
  };
};

/* Set the topping portion, whether left/right/whole */
export const setToppingPortion = (pizza, property, topping, value) => {
  let toppings = [...pizza[property]];
  const toppingIndex = toppings.findIndex(
    (selectedTopping) => selectedTopping.toppingName === topping
  );

  if (toppingIndex < 0) {
    toppings.push({
      toppingName: topping,
      amount: REGULAR_TOPPING,
      portion: value,
    });
  } else {
    toppings[toppingIndex] = {
      ...toppings[toppingIndex],
      portion: value,
    };
  }
  return {
    type: actionTypes.SET_PROPERTY,
    property: property,
    value: toppings,
  };
};
