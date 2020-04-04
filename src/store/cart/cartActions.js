import { ADD_TO_CART } from "./cartActionTypes";

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item: item
    }
}