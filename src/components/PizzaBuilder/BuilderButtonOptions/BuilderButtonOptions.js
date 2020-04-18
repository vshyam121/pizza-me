import React from "react";
import "./BuilderButtonOptions.scss";
import { CRUST } from "../../../metadata/pizzaProperties";
import { connect } from "react-redux";

const BuilderButtonOptions = props => {
  return (
    <div className="builder-options">
      {props.selectionOptions.map(option => {
        return (
          <button
            key={option}
            onClick={props.onClick}
            className={
              props.itemSelected === option
                ? "button-option button-option--selected"
                : "button-option"
            }
            value={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  crust: state.pizzaBuilder[CRUST]
});

export default connect(mapStateToProps, null)(BuilderButtonOptions);
