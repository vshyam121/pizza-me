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

  const handleRemoveItem = itemId => {
    props.removeItem(itemId);
  };

  const calculateSubTotal = () => {
    let subTotal = 0;
    Object.values(props.items).forEach(item => {
      subTotal += item.price * item.quantity;
    });
    return subTotal.toFixed(2);
  };

  const calculateTax = subTotal => {
    return (subTotal * 0.1).toFixed(2);
  };

  const subTotal = calculateSubTotal();
  const tax = calculateTax(subTotal);
  const total = (+subTotal + +tax).toFixed(2);

  return (
    <div className="cart">
      <h1 className="cart__title">My Cart</h1>
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
      <div className="cart__totals">
        <div className="cart__total-line-item">
          <span>Subtotal:</span> <span>${subTotal}</span>
        </div>
        <div className="cart__total-line-item"><span>Tax:</span> <span>${tax}</span></div>
        <div className="cart__total-line-item"><span>Total:</span> <span>${total}</span></div>
      </div>
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
