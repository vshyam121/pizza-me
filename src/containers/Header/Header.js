import React, { Component } from "react";
import "./Header.scss";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";

/* Header containing logo, app name, main menu, sign in and cart */
class Header extends Component {
  state = {
    numItems: this.props.items.length,
    animationInProgress: false
  };

  onAnimationStart = () => {
    this.setState({ animationInProgress: true });
  };

  onAnimationEnd = () => {
    this.setState({ animationInProgress: false });
  };

  render() {
    let numItemsInCart = null;
    if (Object.keys(this.props.items).length > 0) {
      numItemsInCart = (
        <div
          key={Object.keys(this.props.items).length}
          onAnimationStart={this.onAnimationStart}
          onAnimationEnd={this.onAnimationEnd}
          className="header__cart-items animate"
        >
          {Object.keys(this.props.items).length}
        </div>
      );
    }
    return (
      <header className="header">
        <span>Pizza Joint</span>
        <NavigationItem to="/">Popular</NavigationItem>
        {this.props.idToken ? (
          <NavigationItem to="/signout">Sign Out</NavigationItem>
        ) : (
          <NavigationItem to="/signin">Sign In</NavigationItem>
        )}
        <NavigationItem to="/cart">
          <div className="header__cart">
            <MdShoppingCart />
            {numItemsInCart}
          </div>
        </NavigationItem>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart.items,
  idToken: state.auth.idToken
});

export default connect(mapStateToProps, null)(Header);
