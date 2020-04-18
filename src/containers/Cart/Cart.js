import React from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { initializePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";
import { changeItemQuantity, removeItem } from "../../store/cart/cartActions";
import CartItem from "../../components/CartItem/CartItem";

const Cart = props => {

  const handleEditItem = item => {
    props.initializePizzaBuilder(item, true);
  };

  const handleChangeItemQuantity = (event, itemId) => {
    props.changeItemQuantity(event.target.value, itemId);
  };

  const handleRemoveItem = (itemId) => {
    props.removeItem(itemId);
  }

  return (
    <div className="cart">
      {props.items.map(item => {
        return (
          <CartItem
            key={item.id}
            item={item}
            changeItemQuantity={e => handleChangeItemQuantity(e, item.id)}
            removeItem={() => handleRemoveItem(item.id)}
            editItem={() => handleEditItem(item)}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.cart.items
});

export default connect(mapStateToProps, {
  initializePizzaBuilder,
  changeItemQuantity,
  removeItem
})(Cart);
