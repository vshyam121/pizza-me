import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

export const primary = "button";
export const secondary = "button button--secondary"
export const tertiary = "button button--tertiary";

/* Standard button across entire app */
const Button = props => {
  
  return (
    <button 
      data-test="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.type}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  onClick: PropTypes.func
}

export default Button;
