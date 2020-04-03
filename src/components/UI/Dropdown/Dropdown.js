import React from "react";
import "./Dropdown.scss";

export const smallDropDown = "small";
export const mediumDropDown = "medium";
export const largeDropDown = "large";

/* Standard dropdown selectors of various sizes across entire app */
const Dropdown = props => {
  return (
    <select onChange={props.onChange} className={"dropdown dropdown--"+props.size}>
      {props.options.map(option => {
        return <option>{option}</option>;
      })}
    </select>
  );
};

export default Dropdown;
