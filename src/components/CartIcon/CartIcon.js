import React, { Component } from "react";
import { MdShoppingCart } from "react-icons/md";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";
import { Link, withRouter } from "react-router-dom";
import Button, { primary } from "../../components/UI/Button/Button";
import DropdownAlert from "../../components/UI/DropdownAlert/DropdownAlert";

class CartIcon extends Component {
  handleClickItemAddedAlert = () => {
    this.props.history.push("/cart");
  };

  handleClickCheckout = (event) => {
    event.stopPropagation();
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.quantity !== nextProps.quantity) {
      return true;
    }
    return false;
  }

  render() {
      console.log("render cart icon");
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
              fromCheckout: "true",
            }}
          >
            <Button type={primary}>
              <span>Checkout</span>
            </Button>
          </Link>
        </DropdownAlert>
      );
    }

    return (
      <React.Fragment>
        <NavigationItem to="/cart">
          <div className="header__cart header__icon">
            <MdShoppingCart />
            {numItemsInCart}
          </div>
        </NavigationItem>
        {itemAdded}
      </React.Fragment>
    );
  }
}

export default withRouter(CartIcon);
