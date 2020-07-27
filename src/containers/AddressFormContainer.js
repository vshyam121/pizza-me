import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressForm from '../components/AddressForm/AddressForm';
import {
  validateDeliveryAddress,
  validateDeliveryAddressReset,
} from '../store/checkout/checkoutActions/checkoutActions.js';

class AddressFormContainer extends Component {
  state = {
    form: {
      street: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Street Address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      unit: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Apt/Unit #',
        },
        validation: {
          isNumeric: true,
        },
        errorMessage: 'Please enter only the Apt/Unit number',
        value: '',
        valid: true,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'City',
        },
        value: '',
        validation: {
          hasLength: 2,
          required: true,
        },
        valid: false,
      },
      state: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'State',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
    formIsValid: false,
    formSubmitted: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
    if (this.state.formIsValid) {
      this.props.validateDeliveryAddress(this.state.form);
    }
  };

  updateForm = (stateUpdate) => {
    this.setState(stateUpdate);
  };

  render() {
    return (
      <AddressForm
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        updateForm={this.updateForm}
      />
    );
  }
}

AddressFormContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  addressValid: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  addressValid: state.checkout.addressValid,
  error: state.checkout.addressValidationError,
  loading: state.checkout.validatingAddress,
});

export default connect(mapStateToProps, {
  validateDeliveryAddress,
  validateDeliveryAddressReset,
})(AddressFormContainer);
