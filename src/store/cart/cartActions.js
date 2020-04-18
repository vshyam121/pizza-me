import { ADD_TO_CART, CHANGE_ITEM_QUANTITY, REMOVE_ITEM, SAVE_TO_CART } from "./cartActionTypes";
import { SAUCE, SAUCE_AMOUNT, CRUST_FLAVOR } from "../../metadata/pizzaProperties";
import { CLASSIC_MARINARA, REGULAR_SAUCE} from "../../metadata/sauceMetadata";
import * as uuid from "uuid";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";

export const addToCart = (item) => {
    if(!item[SAUCE]){
        item[SAUCE] = CLASSIC_MARINARA;
    }
    if(!item[SAUCE_AMOUNT]){
        item[SAUCE_AMOUNT] = REGULAR_SAUCE;
    }
    if(!item[CRUST_FLAVOR]){
        item[CRUST_FLAVOR] = NO_CRUST_FLAVOR;
    }
    return {
        type: ADD_TO_CART,
        item: item,
        itemId: uuid.v4()
    }
}

export const changeItemQuantity = (quantity, id) => {
    return {
        type: CHANGE_ITEM_QUANTITY, 
        itemId: id,
        quantity: quantity
    }
}

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        itemId: id
    }
}

export const saveToCart = (item) => {
    return {
        type: SAVE_TO_CART,
        item: item
    }
}