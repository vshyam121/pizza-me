import React from "react";
import "./Dropdown.scss";

export const smallDropDown = "small";

/* Standard dropdown selectors of various sizes across entire app */
const Dropdown = props => {
  return (
    <select value={props.value ? props.value : 1} onChange={props.onChange} className="dropdown">
      {props.options.map(option => {
        return <option key={option}>{option}</option>;
      })}
    </select>
  );
};

export default Dropdown;
