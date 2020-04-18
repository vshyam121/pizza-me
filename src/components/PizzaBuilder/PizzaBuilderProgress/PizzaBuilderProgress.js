import React, { useEffect, useRef } from "react";
import "./PizzaBuilderProgress.scss";
import {
  SIZE_CRUST,
  CHEESE_SAUCE,
  TOPPINGS
} from "../../../containers/PizzaBuilder/PizzaBuilder";

const PizzaBuilderProgress = props => {
  return (
    <div className="progress">
      <button
        onClick={props.onClick}
        className={
          props.stage === TOPPINGS
            ? "progress__button progress__button--toppings progress__button--selected"
            : "progress__button progress__button--toppings"
        }
        value={TOPPINGS}
      >
        Toppings
      </button>
      <button
        onClick={props.onClick}
        className={
          props.stage === CHEESE_SAUCE
            ? "progress__button progress__button--cheese-sauce progress__button--selected"
            : "progress__button progress__button--cheese-sauce"
        }
        value={CHEESE_SAUCE}
      >
        Cheese &amp; Sauce
      </button>
      <button
        onClick={props.onClick}
        className="progress__button progress__button--size-crust"
        value={SIZE_CRUST}
      >
        Size &amp; Crust
      </button>
    </div>
  );
};

export default PizzaBuilderProgress;
