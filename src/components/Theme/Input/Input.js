import React from 'react';
import './Input.scss';
import Dropdown from '../Dropdown/Dropdown';
import PropTypes from 'prop-types';

/* Standard input element to be included in forms */
const Input = (props) => {
  let inputElement = null;
  const inputClasses = ['input__element'];
  let validationError = null;
  if (
    props.invalid &&
    props.shouldValidate &&
    //props.touched &&
    props.formSubmitted
  ) {
    inputClasses.push('input__invalid');
    validationError = (
      <p className='input__error-message'>{props.errorMessage}</p>
    );
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <Dropdown
          size={props.elementConfig.size}
          options={props.elementConfig.options}
          value={props.value}
          onChange={props.onChange}
          label={props.label}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
  }
  return (
    <div className='input'>
      <label>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

Input.propTypes = {
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  touched: PropTypes.bool,
  formSubmitted: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  elementType: PropTypes.string.isRequired,
};

export default Input;
