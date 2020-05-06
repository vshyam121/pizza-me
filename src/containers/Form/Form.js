import React, { Component } from "react";
//import "./SignIn.scss";
import Button, {
  primary,
  secondary
} from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { handleInputChange } from "../../shared/validation.js";
import { signIn, authReset } from "../../store/auth/authActions";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { lookupErrorCode } from "../../shared/errorMessages";
import { Link, Redirect } from "react-router-dom";

class Form extends Component {
  state = {
    form: this.props.form,
    formIsValid: false
  };

  handleInputChange = (event, inputId) => {
    const updatedFormData = handleInputChange(this.state.form, event, inputId);
    this.setState({
      form: updatedFormData.form,
      formIsValid: updatedFormData.formIsValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
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
        <div className="form-component__submit">
          <Button type={primary} disabled={!this.state.formIsValid}>
            Submit
          </Button>
        </div>
      </React.Fragment>
    );

    return (
      <form className="form-component__form" onSubmit={(e) => this.props.onSubmit(e, this.state.form)}>
        {form}
      </form>
    );
  }
}

export default Form;
