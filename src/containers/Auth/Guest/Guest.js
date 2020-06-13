import React, { Component } from "react";
import "./Guest.scss";
import { connect } from "react-redux";
import Form from "../../Form/Form";
import { Redirect } from "react-router-dom";

class Guest extends Component {
  state = {
    form: {
      firstName: {
        elementType: "input",
        elementConfig: {
          placeholder: "First Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          placeholder: "Last Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email"
        },
        value: "",
        errorMessage: "Please enter a valid email address",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      phone: {
        elementType: "phonenumber",
        elementConfig: {
          placeholder: "US Phone Number"
        },
        value: "",
        errorMessage: "Please enter a valid phone number",
        validation: {
          required: true,
          isPhoneNumber: true
        },
        valid: false
      }
    },
    formIsValid: false,
    formSubmitted: false
  };

 /* handleSubmit = event => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
    if (this.state.formIsValid) {
      this.props.storeGuestUserInfo({
        firstName: this.state.form.firstName.value,
        lastName: this.state.form.lastName.value,
        email: this.state.form.email.value,
        phone: this.state.form.phone.value
      });
      this.props.history.push("/checkout/order-type");
    }
  }; */

  updateForm = stateUpdate => {
    this.setState(stateUpdate);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/checkout/order-type" />;
    }


    let form = (
      <Form
        onSubmit={this.handleSubmit}
        {...this.state}
        updateForm={this.updateForm}
      />
    );

    return (
      <div className="guestContainer">
        <div className="guest">
          <h3 className="guest__title">Please fill out your information</h3>
          {form}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken
});

export default connect(mapStateToProps, {  })(Guest);
