import { LARGE, MEDIUM, PERSONAL } from "./pizzaMetadata";
import { HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN } from "./pizzaMetadata";
import { REGULAR, COMBO } from "./pizzaMetadata";

/* Holds price mappings for various pizza properties */
export const crustPriceMapping = {
  [LARGE]: {
    [HAND_TOSSED]: 0.0,
    [THIN_N_CRISPY]: 0.0,
    [ORIGINAL_PAN]: 2.0
  },
  [MEDIUM]: {
    [HAND_TOSSED]: 0.0,
    [THIN_N_CRISPY]: 0.0,
    [ORIGINAL_PAN]: 1.0
  },
  [PERSONAL]: {
    [HAND_TOSSED]: 0.0,
    [THIN_N_CRISPY]: 0.0,
    [ORIGINAL_PAN]: 0.5
  }
};

export const sizePriceMapping = {
  [REGULAR]: {
    [LARGE]: 18.29,
    [MEDIUM]: 15.99,
    [PERSONAL]: 12.99
  },
  [COMBO]: {
    [LARGE]: 22.99,
    [MEDIUM]: 18.99,
    [PERSONAL]: 15.99
  }
};

export const topping = 2.64;
