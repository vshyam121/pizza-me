import pizzaBuilderReducer from './pizzaBuilderReducer';
import { initialState } from './pizzaBuilderReducer';
import * as actionTypes from '../pizzaBuilderActionTypes';
import {
  CRUST,
  SIZE,
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES,
  COMBO_NAME,
  REGULAR_TOPPING,
  WHOLE,
  EXTRA_TOPPING,
  LEFT_HALF,
} from '../../../metadata/pizzaProperties';
import { CHEESE, REGULAR } from '../../../metadata/comboMetadata';

describe('Pizza Builder Reducer', () => {
  it('Should return default state', () => {
    const newState = pizzaBuilderReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return correct new state if receiving type INIT_PIZZA_BUILDER', () => {
    const expectedState = {
      showPizzaBuilder: true,
      itemId: 'test item id',
      pizza: {
        [CHEESE_AMOUNT]: 'test cheese amount',
        [COMBO_NAME]: 'test combo',
        [CRUST]: 'test crust',
        [CRUST_FLAVOR]: 'test crust flavor',
        [MEATS]: { test: test },
        [VEGGIES]: { test: test },
        [SAUCE]: 'test sauce',
        [SAUCE_AMOUNT]: 'test sauce amount',
        [SIZE]: 'test size',
        priceType: 'test price type',
      },
      quantity: 'test quantity',
    };
    const newState = pizzaBuilderReducer(undefined, {
      type: actionTypes.INIT_PIZZA_BUILDER,
      ...expectedState,
    });

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type CLOSE_PIZZA_BUILDER', () => {
    initialState.showPizzaBuilder = true;
    const newState = pizzaBuilderReducer(initialState, {
      type: actionTypes.CLOSE_PIZZA_BUILDER,
    });

    const expectedState = { ...initialState, showPizzaBuilder: false };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SET_PROPERTY', () => {
    const testPayload = {
      type: actionTypes.SET_PROPERTY,
      property: 'test property',
      value: 'test cheese amount',
    };
    const newState = pizzaBuilderReducer(undefined, testPayload);

    const expectedState = {
      ...initialState,
      pizza: {
        ...initialState.pizza,
        [testPayload.property]: testPayload.value,
      },
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state with added topping if receiving type TOGGLE_TOPPING', () => {
    const testPayload = {
      type: actionTypes.TOGGLE_TOPPING,
      property: MEATS,
      value: 'test value',
    };
    const newState = pizzaBuilderReducer(undefined, testPayload);

    const expectedState = {
      ...initialState,
      pizza: {
        ...initialState.pizza,
        [MEATS]: {
          [testPayload.value]: {
            amount: REGULAR_TOPPING,
            portion: WHOLE,
          },
        },
      },
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state with removed topping if receiving type TOGGLE_TOPPING', () => {
    initialState.pizza[MEATS] = { 'test value': test };
    const testPayload = {
      type: actionTypes.TOGGLE_TOPPING,
      property: MEATS,
      value: 'test value',
    };
    const newState = pizzaBuilderReducer(initialState, {
      ...testPayload,
    });

    const expectedState = {
      ...initialState,
      pizza: { ...initialState.pizza, [MEATS]: {} },
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state with modified topping amount if receiving type SET_TOPPING_AMOUNT', () => {
    initialState.pizza[MEATS] = {
      'test topping': {
        amount: REGULAR_TOPPING,
        portion: WHOLE,
      },
    };
    const testPayload = {
      type: actionTypes.SET_TOPPING_AMOUNT,
      property: MEATS,
      topping: 'test topping',
      value: EXTRA_TOPPING,
    };
    const newState = pizzaBuilderReducer(initialState, testPayload);
    const expectedState = {
      ...initialState,
      pizza: {
        ...initialState.pizza,
        [MEATS]: {
          [testPayload.topping]: {
            amount: testPayload.value,
            portion: WHOLE,
          },
        },
      },
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state with new topping amount if receiving type SET_TOPPING_AMOUNT', () => {
    const testPayload = {
      type: actionTypes.SET_TOPPING_AMOUNT,
      property: MEATS,
      topping: 'test topping',
      value: EXTRA_TOPPING,
    };
    const newState = pizzaBuilderReducer(initialState, {
      ...testPayload,
    });

    const expectedState = {
      ...initialState,
      pizza: {
        ...initialState.pizza,
        [MEATS]: {
          [testPayload.topping]: { amount: testPayload.value, portion: WHOLE },
        },
      },
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state with modified topping portion if receiving type SET_TOPPING_PORTION', () => {
    initialState.pizza[MEATS] = {
      'test topping': {
        amount: REGULAR_TOPPING,
        portion: WHOLE,
      },
    };
    const testPayload = {
      type: actionTypes.SET_TOPPING_PORTION,
      property: MEATS,
      topping: 'test topping',
      value: LEFT_HALF,
    };
    const newState = pizzaBuilderReducer(initialState, testPayload);
    const expectedState = {
      ...initialState,
      pizza: {
        ...initialState.pizza,
        [MEATS]: {
          [testPayload.topping]: {
            amount: REGULAR_TOPPING,
            portion: testPayload.value,
          },
        },
      },
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state with new topping amount if receiving type SET_TOPPING_PORTION', () => {
    const testPayload = {
      type: actionTypes.SET_TOPPING_PORTION,
      property: MEATS,
      topping: 'test topping',
      value: LEFT_HALF,
    };
    const newState = pizzaBuilderReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      pizza: {
        ...initialState.pizza,
        [MEATS]: {
          [testPayload.topping]: {
            amount: REGULAR_TOPPING,
            portion: testPayload.value,
          },
        },
      },
    };
    expect(newState).toStrictEqual(expectedState);
  });
});
