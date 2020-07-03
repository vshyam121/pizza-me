import React, { Component } from "react";
import "./Header.scss";
import PizzaTimeLogo from "../../assets/images/alarm-clock.png";
import { MdMenu } from "react-icons/md";
import { connect } from "react-redux";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";
import { Link, withRouter } from "react-router-dom";
import PizzaMenuItems from "../../components/MenuItems/PizzaMenuItems/PizzaMenuItems";
import { toggleSidebar } from "../../store/ui/uiActions";
import AccountMenuItems from "../../components/MenuItems/AccountMenuItems/AccountMenuItems";
import CartIcon from "../../components/CartIcon/CartIcon";
import PropTypes from "prop-types";

/* Header containing logo, app name, main menu, autentication, orders and cart */
class Header extends Component {
  constructor(props) {
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
            <img
              alt="PizzaTime logo"
              className="header__logo"
              src={PizzaTimeLogo}
            />
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
            <CartIcon
              numItemsAdded={this.props.numItemsAdded}
              quantity={this.props.quantity}
            />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
  numItemsAdded: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  quantity: state.cart.quantity,
  numItemsAdded: state.cart.numItemsAdded,
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, { toggleSidebar })(withRouter(Header));
