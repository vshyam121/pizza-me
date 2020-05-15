import {
  INIT_PIZZA_BUILDER,
  CLOSE_PIZZA_BUILDER,
  SET_PROPERTY,
  TOGGLE_TOPPING
} from "./pizzaBuilderActionTypes";
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
  COMBO_NAME
} from "../../metadata/pizzaProperties";
import { REGULAR } from "../../metadata/comboMetadata";

const initialState = {
  showPizzaBuilder: false,
  itemId: null,
  pizza: {
    priceType: REGULAR,
    [CRUST]: HAND_TOSSED,
    [SIZE]: LARGE,
    [MEATS]: [],
    [VEGGIES]: [],
    [SAUCE]: CLASSIC_MARINARA,
    [SAUCE_AMOUNT]: REGULAR_SAUCE,
    [CHEESE_AMOUNT]: REGULAR_CHEESE,
    [CRUST_FLAVOR]: NO_CRUST_FLAVOR,
    [COMBO_NAME]: null,
  }
};

const pizzaBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PIZZA_BUILDER:
      return {
        ...state,
        showPizzaBuilder: true,
        itemId: action.itemId,
        pizza: {
          ...action.pizza,
          [SAUCE]: action.pizza[SAUCE] ? action.pizza[SAUCE] : CLASSIC_MARINARA,
          [SAUCE_AMOUNT]: action.pizza[SAUCE_AMOUNT] ? action.pizza[SAUCE_AMOUNT] : REGULAR_SAUCE,
          [CHEESE_AMOUNT]: action.pizza[CHEESE_AMOUNT] ? action.pizza[CHEESE_AMOUNT] : REGULAR_CHEESE,
          [CRUST_FLAVOR]: action.pizza[CRUST_FLAVOR] ? action.pizza[CRUST_FLAVOR] : NO_CRUST_FLAVOR,
          [COMBO_NAME]: action.pizza[COMBO_NAME] ? action.pizza[COMBO_NAME] : null,
        },
        quantity: action.quantity
      };
    case CLOSE_PIZZA_BUILDER:
      return {
        ...state, 
        showPizzaBuilder: false
      }
    case SET_PROPERTY:
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: action.value
        }
      };
    case TOGGLE_TOPPING:
      const toppings = state.pizza[action.property] ? [...state.pizza[action.property]] : [];
      const index = toppings.indexOf(action.value);
      if (index < 0) {
        toppings.push(action.value);
      } else {
        toppings.splice(index, 1);
      }
      return {
        ...state,
        pizza: {
          ...state.pizza,
          [action.property]: toppings
        }
      };
    default:
      return state;
  }
};

export default pizzaBuilderReducer;
