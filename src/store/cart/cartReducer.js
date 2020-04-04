import { ADD_TO_CART } from "./cartActionTypes";

const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let items = [...state.items];
      items.push(action.item);
      return {
        ...state,
        items: items
      };
    default:
      return state;
  }
};

export default cartReducer;
