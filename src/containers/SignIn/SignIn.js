import React, { Component } from "react";
import "./SignIn.scss";
import Button, {
  primary,
  secondary
} from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import { handleInputChange } from "../../../shared/validation.js";
import { signIn, authReset } from "../../../store/auth/authActions";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { lookupErrorCode } from "../../../shared/errorMessages";
import { Link, Redirect } from "react-router-dom";
import Form from "../../../containers/Form/Form";

class SignIn extends Component {

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

  handleSubmit = (event, signInForm) => {
    event.preventDefault();
    this.props.signIn(signInForm.email.value, signInForm.password.value);
  };

  componentDidMount() {
    if (this.props.error) {
      this.props.authReset();
    }
  }

  render() {
    const signInForm = {
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
    };

    let form = <Form form={signInForm} onSubmit={this.handleSubmit} />;
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
        <div className="form-component__error">
          <p>{lookupErrorCode(this.props.error.message)}</p>
        </div>
      );
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.location.checkout) {
        redirect = <Redirect to="/checkout" />;
      } else {
        redirect = <Redirect to="/" />;
      }
    }

    let guestButton = null;
    if (this.props.location.checkout) {
      guestButton = (
        <div className="form-component__guest">
          <Link to="/guest">
            <Button type={secondary}>Continue as guest</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="form-container">
        <div className="form-component">
          <h3 className="form-component__title">
            Please sign in to your account
          </h3>
          {redirect}
          {errorMessage}
          {form}
          {guestButton}
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

export default connect(mapStateToProps, { signIn, authReset })(SignIn);
