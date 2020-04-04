/* Holds various pizza related metadata used in multiple components */

export const HAND_TOSSED = "Hand Tossed Pizza";
export const THIN_N_CRISPY = "Thin 'N Crispy Pizza";
export const ORIGINAL_PAN = "Original Pan Pizza";

export const LARGE = "Large";
export const MEDIUM = "Medium";
export const PERSONAL = "Personal";

export const CHEESE = "Cheese Pizza";
export const PEPPERONI = "Pepperoni Pizza";
export const MEAT_LOVER = "Meat Lover's Pizza";
export const SUPREME = "Supreme Pizza";

export const CLASSIC_MARINARA = "Classic Marinara";
export const REGULAR_CHEESE = "Regular";
export const REGULAR_SAUCE = "Regular";
export const NO_CRUST_FLAVOR = "No Crust Flavor";

export const REGULAR = "Regular";
export const COMBO = "Combo";

export const toppingMapping = {
  [CHEESE]: {},
  [PEPPERONI]: {
    pepperoni: 1
  },
  [MEAT_LOVER]: {
    pepperoni: 1,
    ham: 1,
    pork: 1,
    beef: 1,
    italian_sausage: 1,
    bacon: 1
  },
  [SUPREME]: {
    pepperoni: 1,
    pork: 1,
    beef: 1,
    mushrooms: 1,
    green_peppers: 1,
    red_peppers: 1
  }
};
