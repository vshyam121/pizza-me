import React, { Component } from "react";
import "./Header.scss";
import PizzaIconImg from "../../assets/images/alarm-clock.png";
import { MdShoppingCart, MdMenu } from "react-icons/md";
import { connect } from "react-redux";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";
import { Link, withRouter } from "react-router-dom";
import Button, { primary } from "../../components/UI/Button/Button";
import DropdownAlert from "../../components/UI/DropdownAlert/DropdownAlert";
import PizzaMenuItems from "../../components/MenuItems/PizzaMenuItems/PizzaMenuItems";
import { toggleSidebar } from "../../store/ui/uiActions";
import AccountMenuItems from "../../components/MenuItems/AccountMenuItems/AccountMenuItems";

/* Header containing logo, app name, main menu, sign in and cart */
class Header extends Component {
  constructor(props){
    super(props);
    this.handleClickCheckout = this.handleClickCheckout.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.quantity !== nextProps.quantity) {
      return true;
    }
    return false;
  }

  handleClickMenuIcon = () => {
    this.props.toggleSidebar();
  };

  handleClickItemAddedAlert = () => {
    this.props.history.push("/cart");
  };

  handleClickCheckout = (event) => {
    event.stopPropagation();
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
    if (
      this.props.itemAdded &&
      this.props.location.pathname !== "/cart" &&
      this.props.location.pathname !== "/checkout"
    ) {
      let numItems = null;
      if (this.props.itemAdded === 1) {
        numItems = <span>{this.props.itemAdded} new item</span>;
      } else {
        numItems = <span>{this.props.itemAdded} new items</span>;
      }
      itemAdded = (
        <DropdownAlert
          onClick={this.handleClickItemAddedAlert}
          alertKey={this.props.quantity + "-add-items"}
        >
          <h3 className="header__alert-text">{numItems} added to cart</h3>
          <Link
            onClick={this.handleClickCheckout}
            className="header__checkout"
            to={{
              pathname: this.props.isAuthenticated
                ? "/checkout/order-type"
                : "/signin",
              fromCheckout: "true"
            }}
          >
            <Button  type={primary}>
              <span>Checkout</span>
            </Button>
          </Link>
        </DropdownAlert>
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
              <div className="header__icon">
                <MdMenu />
              </div>
            </NavigationItem>
          </div>
          <Link to="/" className="header__logo-title">
            <img className="header__logo" src={PizzaIconImg} />
            <div className="header__title">
              <span>PizzaTime</span>
            </div>
          </Link>
          <div className="header__menu-items">
            <PizzaMenuItems />
          </div>
        </div>
        <div className="header__account">
          <div className="header__account-actions">
            <AccountMenuItems />
          </div>
          <div style={{ position: "relative" }}>
            <NavigationItem to="/cart">
              <div className="header__cart header__icon">
                <MdShoppingCart />
                {numItemsInCart}
              </div>
            </NavigationItem>
            {itemAdded}
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
