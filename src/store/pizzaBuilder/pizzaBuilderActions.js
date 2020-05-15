import {
  INIT_PIZZA_BUILDER,
  CLOSE_PIZZA_BUILDER,
  SET_PROPERTY,
  TOGGLE_TOPPING
} from "./pizzaBuilderActionTypes";

export const initializePizzaBuilder = (pizza, quantity, itemId) => {
  return {
    type: INIT_PIZZA_BUILDER,
    pizza: pizza,
    quantity: quantity,
    itemId: itemId
  };
};

export const closePizzaBuilder = () => {
  return {
    type: CLOSE_PIZZA_BUILDER
  };
};

export const setProperty = (property, value) => {
  return {
    type: SET_PROPERTY,
    property: property,
    value: value
  };
};

export const toggleTopping = (property, value) => {
  return {
    type: TOGGLE_TOPPING,
    property: property,
    value: value
  };
};
