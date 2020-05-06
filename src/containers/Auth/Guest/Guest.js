import React, { Component } from "react";
import "./Guest.scss";
import Input from "../../../components/UI/Input/Input";
import Button, { primary } from "../../../components/UI/Button/Button";
import { handleInputChange } from "../../../shared/validation.js";
import { connect } from "react-redux";
import { storeUserInfo } from "../../../store/order/orderActions";
import Form from "../../Form/Form";
import { Redirect } from "react-router-dom";

class Guest extends Component {
  state = {
    guestForm: {
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
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      phone: {
        elementType: "input",
        elementConfig: {
          placeholder: "Phone Number"
        },
        value: "",
        validation: {
          required: true,
          isPhoneNumber: true
        },
        valid: false
      }
    },
    formIsValid: false
  };

  handleInputChange = (event, inputId) => {
    const updatedFormData = handleInputChange(
      this.state.guestForm,
      event,
      inputId
    );
    this.setState({
      guestForm: updatedFormData.form,
      formIsValid: updatedFormData.formIsValid
    });
  };

  handleSubmit = (event, guestForm) => {
    event.preventDefault();
    this.props.storeUserInfo({
      firstName: guestForm.firstName.value,
      lastName: guestForm.lastName.value,
      email: guestForm.email.value,
      phone: guestForm.phone.value
    });
    this.props.history.push("/checkout/order-type");
  };

  render() {

    if(this.props.isAuthenticated){
      return <Redirect to="/checkout/order-type" />
    }

    const guestForm = {
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
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      phone: {
        elementType: "input",
        elementConfig: {
          placeholder: "Phone Number"
        },
        value: "",
        validation: {
          required: true,
          isPhoneNumber: true
        },
        valid: false
      }
    };

    let form = <Form form={guestForm} onSubmit={this.handleSubmit} />;

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

export default connect(mapStateToProps, { storeUserInfo })(Guest);
