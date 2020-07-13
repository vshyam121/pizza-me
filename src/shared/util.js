import {
  SIZE,
  CRUST,
  MEATS,
  VEGGIES,
  COMBO_NAME,
  CHEESE_AMOUNT,
  SAUCE_AMOUNT,
  EXTRA_TOPPING,
  CRUST_FLAVOR,
  SAUCE,
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
import { CLASSIC_MARINARA, REGULAR_SAUCE } from '../metadata/sauceMetadata';
import { REGULAR_CHEESE } from '../metadata/cheeseMetadata';
import { NO_CRUST_FLAVOR } from '../metadata/crustFlavorMetadata';

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

/* Find an element by data-test attribute for unit tests */
export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

/* Validate prop types for a component */
export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  );
  return propsErr;
};

/* Create a test store for unit tests */
export const testStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};

/* Normalize the pizza object before adding to cart.
   Important for making sure hashes of two different 
   pizzas with the same attributes are equal */
export const normalizePizza = (pizza) => {
  //If coming from pizza box, some attributes won't be set
  if (!pizza[SAUCE]) {
    pizza[SAUCE] = CLASSIC_MARINARA;
  }
  if (!pizza[SAUCE_AMOUNT]) {
    pizza[SAUCE_AMOUNT] = REGULAR_SAUCE;
  }
  if (!pizza[CHEESE_AMOUNT]) {
    pizza[CHEESE_AMOUNT] = REGULAR_CHEESE;
  }
  if (!pizza[CRUST_FLAVOR]) {
    pizza[CRUST_FLAVOR] = NO_CRUST_FLAVOR;
  }

  //Need to delete empty objects because firebase disregards properties with empty objects
  if (
    pizza.meats &&
    Object.keys(pizza.meats).length === 0 &&
    pizza.meats.constructor === Object
  ) {
    delete pizza.meats;
  }
  if (
    pizza.veggies &&
    Object.keys(pizza.veggies).length === 0 &&
    pizza.veggies.constructor === Object
  ) {
    delete pizza.veggies;
  }

  return {
    [CHEESE_AMOUNT]: pizza[CHEESE_AMOUNT],
    [COMBO_NAME]: pizza[COMBO_NAME],
    [CRUST]: pizza[CRUST],
    [CRUST_FLAVOR]: pizza[CRUST_FLAVOR],
    [MEATS]: pizza[MEATS],
    [VEGGIES]: pizza[VEGGIES],
    [SAUCE]: pizza[SAUCE],
    [SAUCE_AMOUNT]: pizza[SAUCE_AMOUNT],
    [SIZE]: pizza[SIZE],
    priceType: pizza.priceType,
  };
};
