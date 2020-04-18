import { LARGE, MEDIUM, PERSONAL } from "./sizeMetadata";
import { HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN } from "./crustMetadata";
import { REGULAR, COMBO } from "./comboMetadata";

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
  [LARGE]:{
    [REGULAR]: 18.29,
    [COMBO]: 22.99
  },
  [MEDIUM]: {
    [REGULAR]: 15.99,
    [COMBO]: 18.99
  },
  [PERSONAL]: {
    [REGULAR]: 12.99,
    [COMBO]: 15.99
  }
};

export const toppingPrice = 2.64;
