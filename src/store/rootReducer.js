import { combineReducers } from "redux";
import pizzaBuilderReducer from "./pizzaBuilder/pizzaBuilderReducer";
import cartReducer from "./cart/cartReducer";
import authReducer from "./auth/authReducer";

export default combineReducers({
  pizzaBuilder: pizzaBuilderReducer,
  cart: cartReducer,
  auth: authReducer
});
