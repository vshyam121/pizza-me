import {
  SIZE,
  CRUST,
  MEATS,
  VEGGIES,
  COMBO_NAME,
  CHEESE_AMOUNT,
  SAUCE_AMOUNT,
  EXTRA_TOPPING,
} from "../metadata/pizzaProperties";
import { COMBO, toppingMapping } from "../metadata/comboMetadata";
import {
  sizePriceMapping,
  crustPriceMapping,
  toppingPrice,
  extraToppingPrice,
  propertyPriceMapping,
} from "../metadata/priceMappings";

export const calculatePrice = (pizza, customized) => {
  const basePrice =
    sizePriceMapping[pizza[SIZE]][pizza.priceType] +
    crustPriceMapping[pizza[SIZE]][pizza[CRUST]];

  let meatsPrice = 0;
  let veggiesPrice = 0;
  let propertyPrices = 0;

  if (pizza.priceType !== COMBO) {
    meatsPrice += getToppingsPrice(pizza, MEATS, false);
    veggiesPrice += getToppingsPrice(pizza, VEGGIES, false);
    propertyPrices += propertyPriceMapping[pizza[SAUCE_AMOUNT]] || 0;
    propertyPrices += propertyPriceMapping[pizza[CHEESE_AMOUNT]] || 0;
  } else if (customized) {
    meatsPrice += getToppingsPrice(pizza, MEATS, true);
    veggiesPrice += getToppingsPrice(pizza, VEGGIES, true);
  }

  return (basePrice + meatsPrice + veggiesPrice + propertyPrices).toFixed(2);
};

const getToppingsPrice = (pizza, toppingType, combo) => {
  let toppings = pizza[toppingType];
  let toppingsPrice = 0;
  toppings &&
    Object.entries(toppings).map(([topping, toppingProps]) => {
      if (
        (combo &&
          !Object.keys(toppingMapping[pizza[COMBO_NAME]][toppingType]).includes(
            topping
          )) ||
        !combo
      ) {
        if (toppingProps.amount === EXTRA_TOPPING) {
          toppingsPrice += extraToppingPrice;
        } else {
          toppingsPrice += toppingPrice;
        }
      }
    });

  return toppingsPrice;
};

export const handleEditItem = (props, pizza, quantity, itemId) => {
  props.initializePizzaBuilder(pizza, quantity, itemId);
};

export const handleChangeItemQuantity = (props, itemId, quantity) => {
  props.changeItemQuantity(itemId, quantity);
};

export const handleRemoveItem = (props, itemId, pizza) => {
  props.removeItem(itemId, pizza);
};
