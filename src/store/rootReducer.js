import { combineReducers } from "redux";
import pizzaBuilderReducer from "./pizzaBuilder/pizzaBuilderReducer";
import cartReducer from "./cart/cartReducer";
import checkoutReducer from "./checkout/checkoutReducer";
import authReducer from "./auth/authReducer";
import uiReducer from "./ui/uiReducer";

export default combineReducers({
  pizzaBuilder: pizzaBuilderReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  auth: authReducer,
  ui: uiReducer
});
