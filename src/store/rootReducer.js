import { combineReducers } from "redux";
import pizzaBuilderReducer from "./pizzaBuilder/pizzaBuilderReducer";
import cartReducer from "./cart/cartReducer";
import orderReducer from "./order/orderReducer";
import authReducer from "./auth/authReducer";

export default combineReducers({
  pizzaBuilder: pizzaBuilderReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer
});
