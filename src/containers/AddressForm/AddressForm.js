import React, { Component } from "react";
import { connect } from "react-redux";
import {
  validateAddress,
  validateAddressReset
} from "../../store/checkout/checkoutActions";
import { SyncLoader } from "react-spinners";
import { withRouter } from "react-router-dom";
import Form from "../Form/Form";

class AddressForm extends Component {
  state = {
    form: {
      street: {
        elementType: "input",
        elementConfig: {
          placeholder: "Street Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      unit: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Apt/Unit #"
        },
        value: "",
        valid: true
      },
      city: {
        elementType: "input",
        elementConfig: {
          placeholder: "City"
        },
        value: "",
        validation: {
          hasLength: 2,
          required: true
        },
        valid: false
      },
      state: {
        elementType: "input",
        elementConfig: {
          placeholder: "State"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    },
    formIsValid: false,
    formSubmitted: false
  };
  constructor(props) {
    super(props);
    this.props.validateAddressReset();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
    if (this.state.formIsValid) {
      this.props.validateAddress(this.state.form);
    }
  };

  updateForm = stateUpdate => {
    this.setState(stateUpdate);
  };

  componentDidUpdate() {
    if (this.props.addressValid) {
      this.props.history.push("/checkout");
    }
  }

  render() {
    let errorMessage = null;
    let form = null;
    if (this.props.loading) {
      form = (
        <div className="spinner">
          <SyncLoader />
        </div>
      );
    } else {
      form = (
        <Form
          {...this.state}
          onSubmit={this.handleSubmit}
          updateForm={this.updateForm}
        />
      );
    }

    if (this.props.error) {
      errorMessage = (
        <div className="form-component__error">
          <p>{this.props.error}</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        {errorMessage}
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  addressValid: state.checkout.addressValid,
  error: state.checkout.addressValidationError,
  loading: state.checkout.validatingAddress
});
export default connect(mapStateToProps, {
  validateAddress,
  validateAddressReset
})(withRouter(AddressForm));
