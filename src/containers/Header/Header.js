import React, { Component } from "react";
import "./Header.scss";
import PizzaIconImg from "../../assets/images/alarm-clock.png";
import { MdShoppingCart, MdMenu } from "react-icons/md";
import { connect } from "react-redux";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";
import { Link, withRouter } from "react-router-dom";
import Button, { primary } from "../../components/UI/Button/Button";
import DropdownMenuAlert from "../../components/UI/DropdownAlert/DropdownAlert";
import PizzaMenuItems from "../../components/PizzaMenuItems/PizzaMenuItems";
import { toggleSidebar } from "../../store/ui/uiActions";

/* Header containing logo, app name, main menu, sign in and cart */
class Header extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.quantity !== nextProps.quantity) {
      return true;
    }
    return false;
  }

  handleClickMenuIcon = () => {
    this.props.toggleSidebar();
  };

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
        <DropdownMenuAlert alertKey={this.props.quantity + "-add-items"}>
          <h3 className="header__alert-text">Item(s) added to cart</h3>
          <Link
            className="header__checkout"
            to={{
              pathname: this.props.isAuthenticated
                ? "/checkout/order-type"
                : "/signin",
              checkout: "true",
            }}
          >
            <Button type={primary}>
              <span>Checkout</span>
            </Button>
          </Link>
        </DropdownMenuAlert>
      );
    }

    let authentication = (
      <NavigationItem to="/signin">
        <span>Sign In</span>
      </NavigationItem>
    );
    if (this.props.isAuthenticated) {
      authentication = (
        <React.Fragment>
          <NavigationItem>My Orders</NavigationItem>
          <NavigationItem to="/signout">Sign Out</NavigationItem>
        </React.Fragment>
      );
    }

    return (
      <header className="header">
        <div className="header__main">
          <div onClick={this.handleClickMenuIcon} className="header__menu">
            <NavigationItem>
              <div className="header-icon">
                <MdMenu />
              </div>
            </NavigationItem>
          </div>
          <Link to="/" className="header__logo-title">
            <img className="header__logo" src={PizzaIconImg} />
            <div className="header__title">
              <span>Pizza Time</span>
            </div>
          </Link>
          <div className="header__menu-items">
            <PizzaMenuItems />
          </div>
        </div>
        <div className="header__account">
          <div className="header__account-actions">{authentication}</div>
          <div className="header__cart-container">
            <NavigationItem to="/cart">
              <div className="header__cart header-icon">
                <MdShoppingCart />
                {numItemsInCart}
                {itemAdded}
              </div>
            </NavigationItem>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items,
  quantity: state.cart.quantity,
  itemAdded: state.cart.itemAdded,
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, { toggleSidebar })(withRouter(Header));
