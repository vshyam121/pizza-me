import React from "react";
import "./BuilderListOptions.scss";

const BuilderListOptions = props => {
  return (
    <div className="builder-list">
      {Object.keys(props.imageMapping).map(option => {
        console.log(option);
        return (
          <button
            key={option}
            onClick={props.onClick}
            className={
              props.itemsSelected && props.itemsSelected.includes(option)
                ? "list-option list-option--selected"
                : "list-option"
            }
            value={option}
          >
            <img src={props.imageMapping[option].icon} alt={option} />
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BuilderListOptions;
