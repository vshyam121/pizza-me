import React, { Component } from "react";
import "./Header.scss";
import { MdShoppingCart } from "react-icons/md";
import { connect } from "react-redux";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";
import { Link, withRouter } from "react-router-dom";
import Button, { primary } from "../../components/UI/Button/Button";

/* Header containing logo, app name, main menu, sign in and cart */
class Header extends Component {
  render() {
    console.log("render header");
    let numItemsInCart = null;
    if (this.props.quantity > 0) {
      numItemsInCart = (
        <div
          key={this.props.quantity + "-num-items"}
          className="header__cart-items animate-num-items"
        >
          {this.props.quantity}
        </div>
      );
    }

    let itemAdded = null;
    if (this.props.itemAdded && this.props.location.pathname !== "/cart") {
      itemAdded = (
        <div
          key={this.props.quantity + "-add-items"}
          className="header__add-item animate-item-added"
        >
          <div className="header__alert-container">
            <h3 className="header__alert-text">Item(s) added to cart</h3>
            <Link
              className="header__checkout"
              to={{
                pathname: this.props.isAuthenticated
                  ? "/checkout/order-type"
                  : "/signin",
                checkout: "true"
              }}
            >
              <Button type={primary}>
                <span>Checkout</span>
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <header className="header">
        <span>Pizza Joint</span>
        <NavigationItem to="/">Popular</NavigationItem>
        {this.props.isAuthenticated ? (
          <NavigationItem to="/signout">Sign Out</NavigationItem>
        ) : (
          <NavigationItem to="/signin">Sign In</NavigationItem>
        )}
        <NavigationItem to="/cart">
          <div className="header__cart">
            <MdShoppingCart />
            {numItemsInCart}
            {itemAdded}
          </div>
        </NavigationItem>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart.items,
  quantity: state.cart.quantity,
  itemAdded: state.cart.itemAdded,
  isAuthenticated: state.auth.idToken
});

export default connect(mapStateToProps, null)(withRouter(Header));
