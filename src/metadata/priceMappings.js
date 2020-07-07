import { LARGE, MEDIUM, PERSONAL } from './sizeMetadata';
import { HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN } from './crustMetadata';
import { REGULAR, COMBO } from './comboMetadata';
import { EXTRA_CHEESE } from './cheeseMetadata';
import { EXTRA_SAUCE } from './sauceMetadata';

/* Holds price mappings for various pizza properties */
export const crustPriceMapping = {
  [LARGE]: {
    [HAND_TOSSED]: 0.0,
    [THIN_N_CRISPY]: 0.0,
    [ORIGINAL_PAN]: 2.0,
  },
  [MEDIUM]: {
    [HAND_TOSSED]: 0.0,
    [THIN_N_CRISPY]: 0.0,
    [ORIGINAL_PAN]: 2.0,
  },
  [PERSONAL]: {
    [HAND_TOSSED]: 0.0,
    [THIN_N_CRISPY]: 0.0,
    [ORIGINAL_PAN]: 2.0,
  },
};

export const sizePriceMapping = {
  [LARGE]: {
    [REGULAR]: 13.99,
    [COMBO]: 18.99,
  },
  [MEDIUM]: {
    [REGULAR]: 11.99,
    [COMBO]: 15.99,
  },
  [PERSONAL]: {
    [REGULAR]: 9.99,
    [COMBO]: 11.99,
  },
};

export const propertyPriceMapping = {
  [EXTRA_SAUCE]: 1.0,
  [EXTRA_CHEESE]: 1.0,
};

export const toppingPrice = 1.5;
export const extraToppingPrice = 2.5;
