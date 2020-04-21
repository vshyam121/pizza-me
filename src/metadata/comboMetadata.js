import {
  HAM,
  PORK,
  BEEF,
  ITALIAN_SAUSAGE,
  BACON,
  PEPPERONI
} from "./meatMetadata";
import { MUSHROOMS, BELL_PEPPERS, RED_ONIONS } from "./veggiesMetadata";
import { MEATS, VEGGIES } from "./pizzaProperties";
/* Holds various combo related metadata used in multiple components */

export const CHEESE = "Cheese";
export const PEPPERONI_PIZZA = "Pepperoni";
export const MEAT_LOVER = "Meat Lover's";
export const SUPREME = "Supreme";

export const REGULAR = "Regular";
export const COMBO = "Combo";

export const toppingMapping = {
  [CHEESE]: {
    [MEATS]: [],
    [VEGGIES]: []
  },
  [PEPPERONI_PIZZA]: {
    [MEATS]: [PEPPERONI],
    [VEGGIES]: []
  },
  [MEAT_LOVER]: {
    [MEATS]: [PEPPERONI, HAM, PORK, BEEF, ITALIAN_SAUSAGE, BACON],
    [VEGGIES]: []
  },
  [SUPREME]: {
    [MEATS]: [PEPPERONI, PORK, BEEF],
    [VEGGIES]: [MUSHROOMS, BELL_PEPPERS, RED_ONIONS]
  }
};
