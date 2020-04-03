import React, { Component } from "react";
import "./Dropdown.scss";

export const SMALL = "small";
export const MEDIUM = "medium";
export const LARGE = "large";

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
