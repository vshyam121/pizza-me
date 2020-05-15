import React from "react";
import "./ButtonOptions.scss";

const ButtonOptions = props => {
  return (
    <div className="builder-options">
      {props.selectionOptions.map(option => {
        return (
          <div
            key={option}
            onClick={props.onClick}
            className={
              props.itemSelected === option
                ? "button-option button-option--selected"
                : "button-option"
            }
            data-value={option}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonOptions;
