import { INIT_PIZZA_BUILDER, CLOSE_PIZZA_BUILDER } from "./pizzaBuilderActionTypes";

export const initializePizzaBuilder = (crust, size, toppings) => {
    return {
        type: INIT_PIZZA_BUILDER,
        crust: crust,
        size: size,
        toppings: toppings
    }
}

export const closePizzaBuilder = () => {
    return {
        type: CLOSE_PIZZA_BUILDER
    }
}