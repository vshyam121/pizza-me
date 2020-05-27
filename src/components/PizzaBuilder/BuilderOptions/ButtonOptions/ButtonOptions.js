import React from "react";
import "./ButtonOptions.scss";

const ButtonOptions = props => {

  return (
    <div className="builder-options">
      {props.selectionOptions.map(option => {
        let price = null;
        if(props.selectionMetadata && props.selectionMetadata[option]){
          price = props.selectionMetadata[option].price
        }
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
            {option} {price}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonOptions;
