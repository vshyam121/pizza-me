import React from 'react';
import { SyncLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import Form from '../../components/UI/Form/Form';
import PropTypes from 'prop-types';

/* User sign up form */
const SignUp = (props) => {
  let form = (
    <Form
      {...props}
      onSubmit={props.handleSubmit}
      updateForm={props.updateForm}
    />
  );
  if (props.loadingUser) {
    form = (
      <div className='spinner'>
        <SyncLoader />
      </div>
    );
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <div className='form-component__error'>
        <p>
          {props.error === 'Duplicate field value entered'
            ? 'The email you entered is already taken'
            : props.error}
        </p>
      </div>
    );
  }

  let redirect = null;
  if (props.isAuthenticated) {
    if (props.location.fromCheckout) {
      redirect = (
        <Redirect
          to={{ pathname: '/checkout/order-type', fromSignUp: 'true' }}
        />
      );
    } else {
      redirect = <Redirect to={{ pathname: '/', fromSignUp: 'true' }} />;
    }
  }

  return (
    <div className='form-container'>
      <div className='form-component'>
        <h3 className='form-component__title'>Sign up for an account</h3>
        {redirect}
        {errorMessage}
        {form}
      </div>
    </div>
  );
};

SignUp.propTypes = {
  loadingUser: PropTypes.bool,
  error: PropTypes.string,
  isAuthenticated: PropTypes.string,
};

export default SignUp;
