import { SIZE, CRUST, MEATS, VEGGIES, COMBO_NAME} from "../metadata/pizzaProperties";
import { COMBO, toppingMapping  } from "../metadata/comboMetadata";
import {
    sizePriceMapping,
    crustPriceMapping,
    toppingPrice
  } from "../metadata/priceMappings";

export const calculatePrice = (pizza, customized) => {
    const basePrice =
      sizePriceMapping[pizza[SIZE]][pizza.priceType] +
      crustPriceMapping[pizza[SIZE]][pizza[CRUST]];

    let meatsPrice = 0;
    let veggiesPrice = 0;
    if (pizza.priceType !== COMBO) {
      meatsPrice = pizza[MEATS]
        ? pizza[MEATS].length * toppingPrice
        : 0;
      veggiesPrice = pizza[VEGGIES]
        ? pizza[VEGGIES].length * toppingPrice
        : 0;
    } else if(customized){
      if (pizza[MEATS]) {
        pizza[MEATS].map(meat => {
          if (
            !toppingMapping[pizza[COMBO_NAME]][MEATS].includes(meat)
          ) {
            meatsPrice += toppingPrice;
          }
        });
      }
      if (pizza[VEGGIES]) {
        pizza[VEGGIES].map(veggy => {
          if (
            !toppingMapping[pizza[COMBO_NAME]][VEGGIES].includes(
              veggy
            )
          ) {
            veggiesPrice += toppingPrice;
          }
        });
      }
    }

    return (basePrice + meatsPrice + veggiesPrice).toFixed(2);
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
