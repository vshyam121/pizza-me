import React from "react";
import "./Dropdown.scss";

/* Standard dropdown selectors across entire app */
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
