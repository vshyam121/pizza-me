import React from "react";
import "./NavigationItem.scss";
import { Link } from "react-router-dom";


export const VERTICAL = "VERTICAL";
export const HORIZONTAL = "HORIZONTAL";

const NavigationItem = props => {

  let className = null;
  if(props.vertical){
    className = "navigation-item__text navigation-item__text--vertical";
  }
  else {
    className = "navigation-item__text";
  }
  return (
    <div onClick={props.onClick} className="navigation-item">
      <Link className={className} to={props.to}>
        <h3>{props.children}</h3>
      </Link>
    </div>
  );
};

export default NavigationItem;
