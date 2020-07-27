import {
  HAM,
  PORK,
  BEEF,
  ITALIAN_SAUSAGE,
  BACON,
  PEPPERONI,
  GRILLED_CHICKEN,
} from './meatMetadata';
import {
  MUSHROOMS,
  BELL_PEPPERS,
  RED_ONIONS,
  OLIVES,
  ROMA_TOMATOES,
  BANANA_PEPPERS,
  PINEAPPLE,
} from './veggiesMetadata';
import {
  MEATS,
  VEGGIES,
  CHEESE_AMOUNT,
  EXTRA_TOPPING,
  REGULAR_TOPPING,
  WHOLE,
  SAUCE,
  CRUST_FLAVOR,
} from './pizzaProperties';
import { EXTRA_CHEESE } from './cheeseMetadata';
import { BUFFALO, BARBECUE } from './sauceMetadata';
import { TOASTED_PARMESAN } from './crustFlavorMetadata';

/* Holds various combo related display metadata used in multiple components */

export const CHEESE = 'Cheese';
export const PEPPERONI_PIZZA = 'Pepperoni';
export const MEAT_LOVER = "Meat Lover's";
export const SUPREME = 'Supreme';
export const PEPPERONI_LOVER = "Pepperoni Lover's";
export const SUPER_SUPREME = 'Super Supreme';
export const VEGGIE_LOVER = "Veggie Lover's";
export const ULTIMATE_CHEESE_LOVER = "Ultimate Cheese Lover's";
export const BUFFALO_CHICKEN = 'Buffalo Chicken';
export const BBQ_CHICKEN = 'BBQ Chicken';
export const HAWAIIAN_CHICKEN = 'Hawaiian Chicken';
export const CHICKEN_BACON_PARMESAN = 'Chicken Bacon Parmesan';

export const REGULAR = 'Regular';
export const COMBO = 'Combo';

export const toppingMapping = {
  [CHEESE]: {
    [MEATS]: [],
    [VEGGIES]: [],
  },
  [PEPPERONI_PIZZA]: {
    [MEATS]: [
      { toppingName: PEPPERONI, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [],
  },
  [MEAT_LOVER]: {
    [MEATS]: [
      { toppingName: PEPPERONI, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: HAM, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: PORK, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BEEF, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: ITALIAN_SAUSAGE, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BACON, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [],
  },
  [PEPPERONI_LOVER]: {
    [MEATS]: [
      { toppingName: PEPPERONI, amount: EXTRA_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [],
  },
  [SUPREME]: {
    [MEATS]: [
      { toppingName: PEPPERONI, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: PORK, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BEEF, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [
      { toppingName: MUSHROOMS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BELL_PEPPERS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: RED_ONIONS, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
  },
  [SUPER_SUPREME]: {
    [MEATS]: [
      { toppingName: PEPPERONI, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: PORK, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BEEF, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: HAM, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: ITALIAN_SAUSAGE, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [
      { toppingName: MUSHROOMS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BELL_PEPPERS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: RED_ONIONS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: OLIVES, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
  },
  [VEGGIE_LOVER]: {
    [MEATS]: [],
    [VEGGIES]: [
      { toppingName: OLIVES, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: ROMA_TOMATOES, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: BELL_PEPPERS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: MUSHROOMS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: RED_ONIONS, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
  },
  [ULTIMATE_CHEESE_LOVER]: {
    [CHEESE_AMOUNT]: EXTRA_CHEESE,
    [MEATS]: [],
    [VEGGIES]: [],
  },
  [BUFFALO_CHICKEN]: {
    [MEATS]: [
      { toppingName: GRILLED_CHICKEN, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [
      { toppingName: BANANA_PEPPERS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: RED_ONIONS, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [SAUCE]: BUFFALO,
  },
  [BBQ_CHICKEN]: {
    [MEATS]: [
      { toppingName: BACON, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: GRILLED_CHICKEN, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [
      { toppingName: RED_ONIONS, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [SAUCE]: BARBECUE,
  },
  [HAWAIIAN_CHICKEN]: {
    [MEATS]: [
      { toppingName: HAM, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: GRILLED_CHICKEN, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [
      { toppingName: BELL_PEPPERS, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: PINEAPPLE, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
  },
  [CHICKEN_BACON_PARMESAN]: {
    [MEATS]: [
      { toppingName: BACON, amount: REGULAR_TOPPING, portion: WHOLE },
      { toppingName: GRILLED_CHICKEN, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [VEGGIES]: [
      { toppingName: ROMA_TOMATOES, amount: REGULAR_TOPPING, portion: WHOLE },
    ],
    [CRUST_FLAVOR]: TOASTED_PARMESAN,
  },
};
