import React from "react";
import "./ButtonOptions.scss";
import PropTypes from "prop-types";

/* Interactable options to be displayed as buttons in the pizza builder */
const ButtonOptions = props => {

  return (
    <div className="builder-options">
      {props.selectionOptions.map(option => {
        let additionalDisplay = null;
        if(props.selectionMetadata && props.selectionMetadata[option]){
          additionalDisplay = props.selectionMetadata[option].additionalDisplay
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
            {option} {additionalDisplay}
          </div>
        );
      })}
    </div>
  );
};

ButtonOptions.propTypes = {
  selectionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemSelected: PropTypes.string.isRequired,
  selectionMetadata: PropTypes.objectOf(PropTypes.object)
}

export default ButtonOptions;
