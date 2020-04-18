import React from "react";
import "./Header.scss";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

/* Header containing logo, app name, main menu, sign in and cart */
const Header = props => {
  return (
    <header className="header">
      <span>Pizza Joint</span>
      <Link to="/">
          Popular
      </Link>
      <Link to="/cart">
        <FaShoppingCart className="header__icon" />
      </Link>
    </header>
  );
};

export default Header;
