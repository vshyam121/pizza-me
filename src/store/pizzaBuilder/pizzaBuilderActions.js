import * as actionTypes from "./pizzaBuilderActionTypes";

export const initializePizzaBuilder = (pizza, quantity, itemId) => {
  return {
    type: actionTypes.INIT_PIZZA_BUILDER,
    pizza: pizza,
    quantity: quantity,
    itemId: itemId
  };
};

export const closePizzaBuilder = () => {
  return {
    type: actionTypes.CLOSE_PIZZA_BUILDER
  };
};

export const setProperty = (property, value) => {
  return {
    type: actionTypes.SET_PROPERTY,
    property: property,
    value: value
  };
};

export const toggleTopping = (property, value) => {
  return {
    type: actionTypes.TOGGLE_TOPPING,
    property: property,
    value: value
  };
};

export const setToppingAmount = (property, topping, value) => {
  return {
    type: actionTypes.SET_TOPPING_AMOUNT,
    property: property,
    topping: topping,
    value: value
  };
};

export const setToppingPortion = (property, topping, value) => {
  return {
    type: actionTypes.SET_TOPPING_PORTION,
    property: property,
    topping: topping,
    value: value
  };
};
