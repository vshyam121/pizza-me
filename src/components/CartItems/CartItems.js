import React from "react";
import CartItem from "./CartItem/CartItem";

const CartItems = props => {
  return Object.keys(props.items).map(itemId => {
    const item = props.items[itemId];
    return (
      <CartItem
        key={itemId}
        item={item}
        changeItemQuantity={e => props.handleChangeItemQuantity(e, itemId)}
        removeItem={() => props.handleRemoveItem(itemId)}
        editItem={() => props.handleEditItem(item, itemId)}
      />
    );
  });
};

export default CartItems;
