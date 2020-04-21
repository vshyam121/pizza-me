import React, { Component } from "react";
import "./Header.scss";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/* Header containing logo, app name, main menu, sign in and cart */
class Header extends Component {
  state = {
    numItems: this.props.items.length,
    animationInProgress: false,
  };

  onAnimationStart = () => {
    this.setState({ animationInProgress: true });
  };

  onAnimationEnd = () => {
    this.setState({ animationInProgress: false });
  };

  render() {
    return (
      <header className="header">
        <span>Pizza Joint</span>
        <Link to="/">Popular</Link>
        <Link className="header__cart" to="/cart">
          <MdShoppingCart />
          <div
            key={this.props.items.length}
            onAnimationStart={this.onAnimationStart}
            onAnimationEnd={this.onAnimationEnd}
            className="header__cart-items animate"
          >
            {this.props.items.length}
          </div>
        </Link>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart.items
});

export default connect(mapStateToProps, null)(Header);
