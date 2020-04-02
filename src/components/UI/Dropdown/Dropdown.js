import React, { Component } from "react";
import "./Dropdown.scss";

const Dropdown = props => {
  return (
    <select className="dropdown">
      {props.options.map(option => {
        return <option>{option}</option>;
      })}
    </select>
  );
};

export default Dropdown;
