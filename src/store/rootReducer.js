import { combineReducers } from "redux";
import pizzaBuilderReducer from "./pizzaBuilder/pizzaBuilderReducer";
import cartReducer from "./cart/cartReducer";

export default combineReducers({
  pizzaBuilder: pizzaBuilderReducer,
  cart: cartReducer
});
