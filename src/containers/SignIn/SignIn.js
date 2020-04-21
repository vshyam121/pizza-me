import React, { Component } from "react";
import "./SignIn.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { handleInputChange } from "../../shared/validation.js";
import { signIn } from "../../store/auth/authActions";
import { connect } from "react-redux";

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

  checkValidity = (value, rules) => {
    
  };

  handleInputChange = (event, inputId) => {
      const updatedFormData = handleInputChange(this.state.signInForm, event, inputId);
      this.setState({ signInForm: updatedFormData.form, formIsValid: updatedFormData.formIsValid});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signIn(this.state.signInForm.email.value, this.state.signInForm.password.value);
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.signInForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signInForm[key]
      });
    }
    return (
      <div className="signInContainer">
        <div className="signin">
          <form className="form" onSubmit={this.handleSubmit} >
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

            <Button buttonName="Submit" disabled={!this.state.formIsValid} />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { signIn })(SignIn);
