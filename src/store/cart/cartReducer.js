import {
  ADD_TO_CART,
  CHANGE_ITEM_QUANTITY,
  REMOVE_ITEM,
  SAVE_TO_CART
} from "./cartActionTypes";

const initialState = {
  items: []
};

const getIndexOfMatchingItem = (state, itemId) => {
    return state.items.findIndex(item => item.id === itemId);
}

const cartReducer = (state = initialState, action) => {
  let items = null;
  let itemIndex = null;
  let item = null;
  switch (action.type) {
    case ADD_TO_CART:
      items = [...state.items];
      items.push({ ...action.item, id: action.itemId });
      console.log(items);
      return {
        ...state,
        items: items
      };
    case CHANGE_ITEM_QUANTITY:
      itemIndex = getIndexOfMatchingItem(state, action.itemId);
      item = state.items[itemIndex];
      item.quantity = action.quantity;
      items = [...state.items];
      items.splice(itemIndex, 1, item);
      return {
        ...state,
        items: items
      };
    case REMOVE_ITEM:
      itemIndex = getIndexOfMatchingItem(state, action.itemId);
      items = [...state.items];
      items.splice(itemIndex, 1);
      return {
        ...state,
        items: items
      };
    case SAVE_TO_CART:
      itemIndex = getIndexOfMatchingItem(state, action.item.id);
      items = [...state.items];
      items.splice(itemIndex, 1, action.item);
      return {
        ...state,
        items: items
      };
    default:
      return state;
  }
};

export default cartReducer;
