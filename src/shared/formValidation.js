/* Form validation helper functions */

const formatPhoneNumber = (digits) => {
  var cleaned = ('' + digits).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return digits;
};

export const handleInputChange = (form, event, inputId) => {
  const updatedForm = {
    ...form,
  };

  const updatedFormElement = {
    ...updatedForm[inputId],
  };

  if (updatedFormElement.elementType === 'phonenumber') {
    updatedFormElement.value = formatPhoneNumber(event.target.value);
  } else {
    updatedFormElement.value = event.target.value;
  }
  updatedFormElement.valid = checkValidity(
    updatedFormElement.value,
    updatedFormElement.validation
  );
  updatedFormElement.touched = true;
  updatedForm[inputId] = updatedFormElement;

  let formIsValid = true;
  for (let inputId in updatedForm) {
    formIsValid = updatedForm[inputId].valid && formIsValid;
  }
  return { form: updatedForm, formIsValid: formIsValid };
};

const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPhoneNumber) {
    const pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
