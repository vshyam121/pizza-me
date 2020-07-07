import * as actionTypes from "./pizzaBuilderActionTypes";
import { CLASSIC_MARINARA, REGULAR_SAUCE } from "../../metadata/sauceMetadata";
import { HAND_TOSSED } from "../../metadata/crustMetadata";
import { LARGE } from "../../metadata/sizeMetadata";
import { REGULAR_CHEESE } from "../../metadata/cheeseMetadata";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";
import {
  CRUST,
  SIZE,
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES,
  COMBO_NAME,
  WHOLE,
  REGULAR_TOPPING,
} from "../../metadata/pizzaProperties";
import { REGULAR } from "../../metadata/comboMetadata";

export const initialState = {
  showPizzaBuilder: false,
  itemId: null,
  pizza: {
    [CHEESE_AMOUNT]: REGULAR_CHEESE,
    [COMBO_NAME]: null,
    [CRUST]: HAND_TOSSED,
    [CRUST_FLAVOR]: NO_CRUST_FLAVOR,
    [MEATS]: {},
    [VEGGIES]: {},
    [SAUCE]: CLASSIC_MARINARA,
    [SAUCE_AMOUNT]: REGULAR_SAUCE,
    [SIZE]: LARGE,
    priceType: REGULAR,
  },
};

const pizzaBuilderReducer = (state = initialState, action) => {
  let toppings = null;
  let topping = null;
  switch (action.type) {
    //initialize and display pizza builder with given pizza and quantity
    case actionTypes.INIT_PIZZA_BUILDER:
      return {
        ...state,
        showPizzaBuilder: true,
        itemId: action.itemId,
        pizza: {
          [CHEESE_AMOUNT]: action.pizza[CHEESE_AMOUNT]
            ? action.pizza[CHEESE_AMOUNT]
            : REGULAR_CHEESE,
          [COMBO_NAME]: action.pizza[COMBO_NAME]
            ? action.pizza[COMBO_NAME]
            : null,
          [CRUST]: action.pizza[CRUST],
          [CRUST_FLAVOR]: action.pizza[CRUST_FLAVOR]
            ? action.pizza[CRUST_FLAVOR]
            : NO_CRUST_FLAVOR,
          [MEATS]: action.pizza[MEATS],
          [VEGGIES]: action.pizza[VEGGIES],
          [SAUCE]: action.pizza[SAUCE] ? action.pizza[SAUCE] : CLASSIC_MARINARA,
          [SAUCE_AMOUNT]: action.pizza[SAUCE_AMOUNT]
            ? action.pizza[SAUCE_AMOUNT]
            : REGULAR_SAUCE,
          [SIZE]: action.pizza[SIZE],

          price: action.pizza.price,
          priceType: action.pizza.priceType,
        },
        quantity: action.quantity,
      };
    //close the pizza builder
    case actionTypes.CLOSE_PIZZA_BUILDER:
      return {
        ...state,
        showPizzaBuilder: false,
      };
    //dynamically set a pizza property
    case actionTypes.SET_PROPERTY:
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: action.value,
        },
      };
    //add or remove topping on pizza
    case actionTypes.TOGGLE_TOPPING:
      toppings = state.pizza[action.property]
        ? { ...state.pizza[action.property] }
        : {};
      if (toppings[action.value]) {
        delete toppings[action.value];
      } else {
        toppings[action.value] = { amount: REGULAR_TOPPING, portion: WHOLE };
      }
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: toppings,
        },
      };
    //set the amount of a topping (WHOLE, LEFT_HALF, or RIGHT_HALF)
    case actionTypes.SET_TOPPING_AMOUNT:
      toppings = state.pizza[action.property]
        ? { ...state.pizza[action.property] }
        : {};

      topping = toppings[action.topping];
      if (!topping) {
        topping = { amount: action.value, portion: WHOLE };
      } else {
        topping.amount = action.value;
      }
      toppings[action.topping] = topping;
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: toppings,
        },
      };
    //set portion of a topping (EXTRA, REGULAR)
    case actionTypes.SET_TOPPING_PORTION:
      toppings = state.pizza[action.property]
        ? { ...state.pizza[action.property] }
        : {};

      topping = toppings[action.topping];
      topping.portion = action.value;
      toppings[action.topping] = topping;
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: toppings,
        },
      };
    default:
      return state;
  }
};

export default pizzaBuilderReducer;
