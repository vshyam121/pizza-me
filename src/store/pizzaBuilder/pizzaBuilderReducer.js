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
  item: {
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
        item: {
          priceType: action.item.priceType,
          [CRUST]: action.item[CRUST],
          [SIZE]: action.item[SIZE],
          [MEATS]: action.item[MEATS],
          [VEGGIES]: action.item[VEGGIES],
          [SAUCE]: action.item[SAUCE] ? action.item[SAUCE] : CLASSIC_MARINARA,
          [SAUCE_AMOUNT]: action.item[SAUCE_AMOUNT] ? action.item[SAUCE_AMOUNT] : REGULAR_SAUCE,
          [CHEESE_AMOUNT]: action.item[CHEESE_AMOUNT] ? action.item[CHEESE_AMOUNT] : REGULAR_CHEESE,
          [CRUST_FLAVOR]: action.item[CRUST_FLAVOR] ? action.item[CRUST_FLAVOR] : NO_CRUST_FLAVOR,
          [COMBO_NAME]: action.item[COMBO_NAME] ? action.item[COMBO_NAME] : null,
          quantity: action.item.quantity,
        },
      };
    case CLOSE_PIZZA_BUILDER:
      return {
        ...state, 
        showPizzaBuilder: false
      }
    case SET_PROPERTY:
      return {
        ...state,
        item: {
          ...state.item,
          [action.property]: action.value
        }
      };
    case TOGGLE_TOPPING:
      const toppings = state.item[action.property] ? [...state.item[action.property]] : [];
      const index = toppings.indexOf(action.value);
      if (index < 0) {
        toppings.push(action.value);
      } else {
        toppings.splice(index, 1);
      }
      return {
        ...state,
        item: {
          ...state.item,
          [action.property]: toppings
        }
      };
    default:
      return state;
  }
};

export default pizzaBuilderReducer;
