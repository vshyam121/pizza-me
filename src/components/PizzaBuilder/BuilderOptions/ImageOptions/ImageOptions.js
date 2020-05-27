import React from "react";
import "./ImageOptions.scss";
import { FaCheckCircle } from "react-icons/fa";

const ImageOptions = props => {
  return (
    <div className="builder-options">
      {Object.keys(props.imageMapping).map(option => {
        const selected = props.itemSelected === option;
        let price = null;
        if(props.selectionMetadata && props.selectionMetadata[option]){
          price = props.selectionMetadata[option].price;
        }
        return (
          <div
            key={option}
            onClick={props.onClick}
            className="option"
            data-value={option}
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
              {option} {price}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageOptions;
