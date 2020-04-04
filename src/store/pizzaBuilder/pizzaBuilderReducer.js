import { INIT_PIZZA_BUILDER, CLOSE_PIZZA_BUILDER } from "./pizzaBuilderActionTypes";
import { CLASSIC_MARINARA, REGULAR_SAUCE, REGULAR_CHEESE, NO_CRUST_FLAVOR } from "../../metadata/pizzaMetadata";

const initialState = {
  showPizzaBuilder: false,
  crust: null,
  size: null,
  toppings: null,
  sauce: CLASSIC_MARINARA,
  sauce_amount: REGULAR_SAUCE,
  cheese_amount: REGULAR_CHEESE,
  crust_flavor: NO_CRUST_FLAVOR
};

const pizzaBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PIZZA_BUILDER:
      return {
        ...state,
        crust: action.crust,
        size: action.size,
        toppings: action.toppings,
        showPizzaBuilder: true
      };
    case CLOSE_PIZZA_BUILDER:
      return {
        ...state,
        showPizzaBuilder: false
      };
    default:
      return state;
  }
};

export default pizzaBuilderReducer;
