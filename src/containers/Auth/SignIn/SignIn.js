import React, { Component } from "react";
import "./SignIn.scss";
import Button, { primary } from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import { handleInputChange } from "../../../shared/validation.js";
import { signIn } from "../../../store/auth/authActions";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { lookupErrorCode } from "../../../shared/errorMessages";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    signInForm: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    },
    formIsValid: false
  };

  checkValidity = (value, rules) => {};

  handleInputChange = (event, inputId) => {
    const updatedFormData = handleInputChange(
      this.state.signInForm,
      event,
      inputId
    );
    this.setState({
      signInForm: updatedFormData.form,
      formIsValid: updatedFormData.formIsValid
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(
      this.state.signInForm.email.value,
      this.state.signInForm.password.value
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.signInForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signInForm[key]
      });
    }

    let form = null;
    form = (
      <React.Fragment>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              onChange={e => this.handleInputChange(e, formElement.id)}
            />
          );
        })}
        <div className="form__submit">
          <Button type={primary} disabled={!this.state.formIsValid}>Submit</Button>
        </div>
      </React.Fragment>
    );

    if (this.props.loading) {
      form = (
        <div className="spinner">
          <SyncLoader />
        </div>
      );
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <div className="form__error">
          <p>{lookupErrorCode(this.props.error.message)}</p>
        </div>
      );
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to="/" />;
    }

    return (
      <div className="signInContainer">
        <div className="signin">
          <form className="form" onSubmit={this.handleSubmit}>
            {redirect}
            {errorMessage}
            {form}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.idToken
});

export default connect(mapStateToProps, { signIn })(SignIn);
