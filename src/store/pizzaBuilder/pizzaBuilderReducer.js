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

const initialState = {
  showPizzaBuilder: false,
  itemId: null,
  pizza: {
    priceType: REGULAR,
    [CRUST]: HAND_TOSSED,
    [SIZE]: LARGE,
    [MEATS]: {},
    [VEGGIES]: {},
    [SAUCE]: CLASSIC_MARINARA,
    [SAUCE_AMOUNT]: REGULAR_SAUCE,
    [CHEESE_AMOUNT]: REGULAR_CHEESE,
    [CRUST_FLAVOR]: NO_CRUST_FLAVOR,
    [COMBO_NAME]: null,
  },
};

const pizzaBuilderReducer = (state = initialState, action) => {
  let toppings = null;
  let topping = null;
  switch (action.type) {
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
          price: action.pizza.price,
          priceType: action.pizza.priceType,
          [SAUCE]: action.pizza[SAUCE] ? action.pizza[SAUCE] : CLASSIC_MARINARA,
          [SAUCE_AMOUNT]: action.pizza[SAUCE_AMOUNT]
            ? action.pizza[SAUCE_AMOUNT]
            : REGULAR_SAUCE,
          [SIZE]: action.pizza[SIZE],
          [VEGGIES]: action.pizza[VEGGIES],
        },
        quantity: action.quantity,
      };
    case actionTypes.CLOSE_PIZZA_BUILDER:
      return {
        ...state,
        showPizzaBuilder: false,
      };
    case actionTypes.SET_PROPERTY:
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: action.value,
        },
      };
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
    case actionTypes.SET_TOPPING_AMOUNT:
      toppings = state.pizza[action.property]
        ? { ...state.pizza[action.property] }
        : {};

      topping = toppings[action.topping];
      topping.amount = action.value;
      toppings[action.topping] = topping;
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: toppings,
        },
      };
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
