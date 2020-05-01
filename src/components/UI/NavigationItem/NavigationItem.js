import React from "react";
import "./NavigationItem.scss";
import { Link } from "react-router-dom";

const NavigationItem = props => {
  return (
    <div className="navigation-item">
      <Link className="navigation-item__text" to={props.to}>
        <h3>{props.children}</h3>
      </Link>
    </div>
  );
};

export default NavigationItem;
