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

const getToppingsPrice = (pizza, toppingType, combo) => {
  let toppings = pizza[toppingType];
  let toppingsPrice = 0;
  toppings &&
    Object.entries(toppings).map(([topping, toppingProps]) => {
      const comboIncludesTopping = combo && Object.keys(
        toppingMapping[pizza[COMBO_NAME]][toppingType]
      ).includes(topping);
      if (!comboIncludesTopping  || !combo) {
        if (toppingProps.amount === EXTRA_TOPPING) {
          toppingsPrice += extraToppingPrice;
        } else {
          toppingsPrice += toppingPrice;
        }
      }
      else if(comboIncludesTopping && toppingProps.amount === EXTRA_TOPPING){
        toppingsPrice += (extraToppingPrice - toppingPrice);
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

export const calculateSubTotal = (items) => {
  let subTotal = 0;
  Object.values(items).forEach((item) => {
    let price = item.pizza.price
    if(!price){
      price = calculatePrice(item.pizza);
    }
    subTotal += price * item.quantity;
  });
  return subTotal.toFixed(2);
};

export const calculateTax = (subTotal) => {
  return (subTotal * 0.1).toFixed(2);
};

export const getReadableDate = (givenDate) => {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(givenDate);
  const month = monthArray[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return month + " " + day + ", " + year;
};

export const getReadableAddress = givenAddress => {
  let address = "";
  address += givenAddress.street;
  if(givenAddress.secondary)
    address += ", "+givenAddress.secondary
  address += "\n";
  address += givenAddress.city;
  address += ", "+givenAddress.state;
  address += " "+givenAddress.zipcode;
  return address;
}
