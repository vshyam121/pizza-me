import React from 'react';
import Button, { primary } from '../Button/Button';
import Input from '../Input/Input';
import { handleInputChange } from '../../../shared/formValidation.js';
import PropTypes from 'prop-types';

/* Standard form component across entire app */
const Form = (props) => {
  const handleChange = (event, inputId) => {
    const updatedFormData = handleInputChange(props.form, event, inputId);
    props.updateForm({
      form: updatedFormData.form,
      formIsValid: updatedFormData.formIsValid,
    });
  };

  const formElementsArray = [];
  for (let key in props.form) {
    formElementsArray.push({
      id: key,
      config: props.form[key],
    });
  }

  let form = null;
  form = (
    <React.Fragment>
      {formElementsArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            formSubmitted={props.formSubmitted}
            errorMessage={formElement.config.errorMessage}
            onChange={(e) => handleChange(e, formElement.id)}
          />
        );
      })}
      <div className='form-component__submit'>
        <Button
          type={primary}
          disabled={props.formSubmitted && !props.formIsValid}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <form className='form-component__form' onSubmit={props.onSubmit}>
      {form}
    </form>
  );
};

Form.propTypes = {
  form: PropTypes.object.isRequired,
  formSubmitted: PropTypes.bool.isRequired,
  formIsValid: PropTypes.bool.isRequired,
};

export default Form;
