import React from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { changeItemQuantity, removeItem } from "../../store/cart/cartActions";
import CartItem from "../../components/CartItem/CartItem";

const Cart = props => {

  const handleEditItem = (item, itemId) => {
    props.initializePizzaBuilder(item, itemId);
  };

  const handleChangeItemQuantity = (event, itemId) => {
    props.changeItemQuantity(event.target.value, itemId);
  };

  const handleRemoveItem = (itemId) => {
    props.removeItem(itemId);
  }

  return (
    <div className="cart">
      {Object.keys(props.items).map(itemId => {
        const item = props.items[itemId];
        return (
          <CartItem
            key={itemId}
            item={item}
            changeItemQuantity={e => handleChangeItemQuantity(e, itemId)}
            removeItem={() => handleRemoveItem(itemId)}
            editItem={() => handleEditItem(item, itemId)}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.cart.items,
  cartId: state.cart.cartId
});

export default connect(mapStateToProps, {
  initializePizzaBuilder,
  changeItemQuantity,
  removeItem
})(Cart);
