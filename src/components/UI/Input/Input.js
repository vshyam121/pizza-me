import React from "react";
import "./Input.scss";
import Dropdown from "../Dropdown/Dropdown";

const Input = props => {
  let inputElement = null;
  const inputClasses = ["input__element"];
  if(props.invalid && props.shouldValidate && props.touched){
      inputClasses.push("input__invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <Dropdown
          size={props.elementConfig.size}
          options={props.elementConfig.options}
          value={props.value}
          onChange={props.onChange}
        />
      );
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
  }
  return (
    <div className="input">
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
