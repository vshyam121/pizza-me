import React from "react";
import "./BuilderListOptions.scss";
import { FaCheckCircle } from "react-icons/fa";

const BuilderListOptions = props => {
  return (
    <div className="builder-list">
      {Object.keys(props.imageMapping).map(option => {
        const selected =
          props.itemsSelected && props.itemsSelected.includes(option);
        return (
          <div
            key={option}
            onClick={props.onClick}
            className={
              selected ? "list-option list-option--selected" : "list-option"
            }
            data-value={option}
          >
            <div className="list-option__img">
              {selected ? (
                <FaCheckCircle className="list-option__checkmark" />
              ) : null}
              <img src={props.imageMapping[option].icon} alt={option} />
            </div>
            <span>{option}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BuilderListOptions;
