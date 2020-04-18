import React from "react";
import "./BuilderImageOptions.scss";
import { FaCheckCircle } from "react-icons/fa";

const BuilderImageOptions = props => {
  return (
    <div className="builder-options">
      {Object.keys(props.imageMapping).map(option => {
        const selected = props.itemSelected === option;
        return (
          <button
            key={option}
            onClick={props.onClick}
            className="option"
            value={option}
          >
            {selected ? <FaCheckCircle className="option__checkmark" /> : null}
            <img
              className="option__img"
              src={props.imageMapping[option].icon}
              alt={option}
            />
            <div
              className={
                selected
                  ? "option__name option__name--selected"
                  : "option__name"
              }
            >
              {option}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BuilderImageOptions;
