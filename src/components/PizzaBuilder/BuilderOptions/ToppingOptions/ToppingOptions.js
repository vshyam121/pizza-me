import React from "react";
import "./ToppingOptions.scss";
import { FaCheckCircle } from "react-icons/fa";
import {
  EXTRA_TOPPING,
  REGULAR_TOPPING,
  WHOLE,
  LEFT_HALF,
  RIGHT_HALF,
} from "../../../../metadata/pizzaProperties";
import PropTypes from "prop-types";

/* Interactable topping options */

const ToppingOptions = (props) => {
  const onClick = (event) => {
    event.stopPropagation();
    props.onClick(event);
  };

  const onClickAmount = (event) => {
    event.stopPropagation();
    props.onClickAmount(event);
  };

  const onClickPortion = (event) => {
    event.stopPropagation();
    props.onClickPortion(event);
  };

  return (
    <div className="builder-list">
      {Object.keys(props.imageMapping).map((topping) => {
        const selected = Object.keys(props.itemsSelected).includes(topping);
        let checkMark = null;
        let toppingOptionClasses = ["topping-option"];
        let amountOptions = null;
        let portionOptions = null;
        let selection = props.itemsSelected[topping];
        toppingOptionClasses.push("topping-option--selected");
        amountOptions = (
          <div className="topping-option__amount">
            <div
              className={
                selection && selection.amount === EXTRA_TOPPING
                  ? "amount-option amount-option--selected"
                  : "amount-option"
              }
              data-topping={topping}
              data-value={EXTRA_TOPPING}
              onClick={onClickAmount}
            >
              Extra
            </div>
            <div
              className={
                selection && selection.amount === REGULAR_TOPPING
                  ? "amount-option amount-option--selected"
                  : "amount-option"
              }
              data-topping={topping}
              data-value={REGULAR_TOPPING}
              onClick={onClickAmount}
            >
              Regular
            </div>
            <div
              className={
                !selection
                  ? "amount-option amount-option--selected"
                  : "amount-option"
              }
              data-value={topping}
              onClick={onClick}
            >
              None
            </div>
          </div>
        );
        if (selected) {
          checkMark = <FaCheckCircle className="topping-option__checkmark" />;

          let wholeSelection = selection.portion === WHOLE;
          let leftSelection = selection.portion === LEFT_HALF;
          let rightSelection = selection.portion === RIGHT_HALF;
          portionOptions = (
            <div className="topping-option__portion">
              <div
                className={
                  wholeSelection
                    ? "portion-option portion-option--selected"
                    : "portion-option"
                }
                data-topping={topping}
                data-value={WHOLE}
                onClick={onClickPortion}
              >
                <div
                  className={
                    wholeSelection
                      ? "portion-option__whole portion-option__whole--selected"
                      : "portion-option__whole"
                  }
                ></div>
              </div>
              <div
                className={
                  leftSelection
                    ? "portion-option portion-option--selected"
                    : "portion-option"
                }
                data-topping={topping}
                data-value={LEFT_HALF}
                onClick={onClickPortion}
              >
                <div
                  className={
                    leftSelection
                      ? "portion-option__left portion-option__left--selected"
                      : "portion-option__left"
                  }
                ></div>
              </div>
              <div
                className={
                  rightSelection
                    ? "portion-option portion-option--selected"
                    : "portion-option"
                }
                data-topping={topping}
                data-value={RIGHT_HALF}
                onClick={onClickPortion}
              >
                <div
                  className={
                    rightSelection
                      ? "portion-option__right portion-option__right--selected"
                      : "portion-option__right"
                  }
                ></div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={topping}
            onClick={props.onClick}
            className={toppingOptionClasses.join(" ")}
            data-value={topping}
          >
            <div
              className="topping-option__img-selection"
              data-value={topping}
              onClick={onClick}
            >
              {checkMark}
              <img
                className="topping-option__img"
                src={props.imageMapping[topping].icon}
                alt={topping}
              />
            </div>
            <div className="topping-option__details">
              <span className="topping-option__name">{topping}</span>
              <div
                className="topping-option__amount-portion"
                onClick={(e) => e.stopPropagation()}
              >
                {amountOptions}
                {portionOptions}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ToppingOptions.propTypes = {
  imageMapping: PropTypes.objectOf(PropTypes.object).isRequired,
  itemSelected: PropTypes.string,
}

export default ToppingOptions;
