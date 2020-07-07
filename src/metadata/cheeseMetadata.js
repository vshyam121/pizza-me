/* All metadata related to the displaying of cheese options */

export const REGULAR_CHEESE = 'Regular';
export const EXTRA_CHEESE = 'Extra';
export const LIGHT_CHEESE = 'Light';
export const NO_CHEESE = 'None';

export const cheeseAmounts = [
  EXTRA_CHEESE,
  REGULAR_CHEESE,
  LIGHT_CHEESE,
  NO_CHEESE,
];

export const cheeseAmountMetadataMapping = {
  [EXTRA_CHEESE]: {
    price: '+$1.00',
  },
};
