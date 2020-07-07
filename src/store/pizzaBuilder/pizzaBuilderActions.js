import * as actionTypes from './pizzaBuilderActionTypes';

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
export const toggleTopping = (property, value) => {
  return {
    type: actionTypes.TOGGLE_TOPPING,
    property: property,
    value: value,
  };
};

/* Set the topping amount, whether regular/extra */
export const setToppingAmount = (property, topping, value) => {
  return {
    type: actionTypes.SET_TOPPING_AMOUNT,
    property: property,
    topping: topping,
    value: value,
  };
};

/* Set the topping portion, whether left/right/whole */
export const setToppingPortion = (property, topping, value) => {
  return {
    type: actionTypes.SET_TOPPING_PORTION,
    property: property,
    topping: topping,
    value: value,
  };
};
