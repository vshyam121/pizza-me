import { combineReducers } from 'redux';
import pizzaBuilderReducer from './pizzaBuilder/pizzaBuilderReducer/pizzaBuilderReducer';
import cartReducer from './cart/cartReducer/cartReducer';
import checkoutReducer from './checkout/checkoutReducer/checkoutReducer';
import authReducer from './auth/authReducer/authReducer';
import uiReducer from './ui/uiReducer/uiReducer';

export default combineReducers({
  pizzaBuilder: pizzaBuilderReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  auth: authReducer,
  ui: uiReducer,
});
