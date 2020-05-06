import { SIZE, CRUST, MEATS, VEGGIES, COMBO_NAME} from "../metadata/pizzaProperties";
import { COMBO, toppingMapping  } from "../metadata/comboMetadata";
import {
    sizePriceMapping,
    crustPriceMapping,
    toppingPrice
  } from "../metadata/priceMappings";

export const calculatePrice = (item, customized) => {
    const basePrice =
      sizePriceMapping[item[SIZE]][item.priceType] +
      crustPriceMapping[item[SIZE]][item[CRUST]];

    let meatsPrice = 0;
    let veggiesPrice = 0;
    if (item.priceType !== COMBO) {
      meatsPrice = item[MEATS]
        ? item[MEATS].length * toppingPrice
        : 0;
      veggiesPrice = item[VEGGIES]
        ? item[VEGGIES].length * toppingPrice
        : 0;
    } else if(customized){
      if (item[MEATS]) {
        item[MEATS].map(meat => {
          if (
            !toppingMapping[item[COMBO_NAME]][MEATS].includes(meat)
          ) {
            meatsPrice += toppingPrice;
          }
        });
      }
      if (item[VEGGIES]) {
        item[VEGGIES].map(veggy => {
          if (
            !toppingMapping[item[COMBO_NAME]][VEGGIES].includes(
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

export const handleEditItem = (props, item, itemId) => {
  props.initializePizzaBuilder(item, itemId);
};

export const handleChangeItemQuantity = (props, event, itemId) => {
  props.changeItemQuantity(event.target.value, itemId);
};

export const handleRemoveItem = (props, itemId) => {
  props.removeItem(itemId);
};
