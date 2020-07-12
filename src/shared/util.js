import {
  SIZE,
  CRUST,
  MEATS,
  VEGGIES,
  COMBO_NAME,
  CHEESE_AMOUNT,
  SAUCE_AMOUNT,
  EXTRA_TOPPING,
} from '../metadata/pizzaProperties';
import { COMBO, toppingMapping } from '../metadata/comboMetadata';
import {
  sizePriceMapping,
  crustPriceMapping,
  toppingPrice,
  extraToppingPrice,
  propertyPriceMapping,
} from '../metadata/priceMappings';
import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../store/rootReducer';
import { middleware } from '../store/store';

/* Utility functions used across multiple components/containers */

/* Get display message for error code related to authentication */
export const lookupErrorCode = (errorCode) => {
  if (errorCode === 'INVALID_PASSWORD' || errorCode === 'EMAIL_NOT_FOUND') {
    return 'The username or password you entered is incorrect.';
  } else if (errorCode.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
    return "You've made too many unsuccessful attempts. Please try again later.";
  } else if (errorCode === 'EMAIL_EXISTS') {
    return 'The email you entered is already taken. Please try another one.';
  } else {
    return 'There was an error submitting your credentials.';
  }
};

/* calculate price of a pizza, given its size, crust, toppings and various other properties */
export const calculatePrice = (pizza) => {
  const basePrice =
    sizePriceMapping[pizza[SIZE]][pizza.priceType] +
    crustPriceMapping[pizza[SIZE]][pizza[CRUST]];

  let propertyPrices = propertyPriceMapping[pizza[SAUCE_AMOUNT]] || 0;
  propertyPrices += propertyPriceMapping[pizza[CHEESE_AMOUNT]] || 0;

  let meatsPrice = 0;
  let veggiesPrice = 0;

  if (pizza.priceType !== COMBO) {
    meatsPrice += getToppingsPrice(pizza, MEATS, false);
    veggiesPrice += getToppingsPrice(pizza, VEGGIES, false);
  } else {
    meatsPrice += getToppingsPrice(pizza, MEATS, true);
    veggiesPrice += getToppingsPrice(pizza, VEGGIES, true);
  }

  return (basePrice + meatsPrice + veggiesPrice + propertyPrices).toFixed(2);
};

/* Get price of only the toppings */
const getToppingsPrice = (pizza, toppingType, combo) => {
  let toppings = pizza[toppingType];
  let toppingsPrice = 0;
  toppings &&
    Object.entries(toppings).forEach(([topping, toppingProps]) => {
      const comboIncludesTopping =
        combo &&
        Object.keys(toppingMapping[pizza[COMBO_NAME]][toppingType]).includes(
          topping
        );
      if (!comboIncludesTopping || !combo) {
        if (toppingProps.amount === EXTRA_TOPPING) {
          toppingsPrice += extraToppingPrice;
        } else {
          toppingsPrice += toppingPrice;
        }
      } else if (
        comboIncludesTopping &&
        toppingProps.amount === EXTRA_TOPPING
      ) {
        toppingsPrice += extraToppingPrice - toppingPrice;
      }
    });

  return toppingsPrice;
};

/* Open the pizza builder for editing a pizza */
export const handleEditItem = (props, pizza, quantity, itemId) => {
  props.initializePizzaBuilder(pizza, quantity, itemId);
};

/* Change the quantity of an item in redux store */
export const handleChangeItemQuantity = (props, itemId, quantity) => {
  props.changeItemQuantity(itemId, quantity);
};

/* Remove item from cart */
export const handleRemoveItem = (props, itemId, pizza) => {
  props.removeItem(itemId, pizza);
};

/* Calculate the sum of the price of all pizzas in cart before tax */
export const calculateSubTotal = (items) => {
  let subTotal = 0;
  Object.values(items).forEach((item) => {
    let price = item.pizza.price;
    if (!price) {
      price = calculatePrice(item.pizza);
    }
    subTotal += price * item.quantity;
  });
  return subTotal.toFixed(2);
};

/* Calculate the tax */
export const calculateTax = (subTotal) => {
  return (subTotal * 0.1).toFixed(2);
};

/* Get display date */
export const getReadableDate = (givenDate) => {
  const monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(givenDate);
  const month = monthArray[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  );
  return propsErr;
};

export const testStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};
