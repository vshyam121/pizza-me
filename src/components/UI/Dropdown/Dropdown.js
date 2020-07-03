import React from "react";
import "./Dropdown.scss";
import PropTypes from "prop-types";

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

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array.isRequired
}

export default Dropdown;
