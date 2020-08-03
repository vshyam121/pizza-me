import React from 'react';
import { SyncLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import Form from '../../Theme/Form/Form';
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
  let error = null;
  if (props.error) {
    if (props.error.status === 500) {
      error = 'Internal server error.';
    } else if (props.error.data.message === 'Duplicate field value entered') {
      error = 'The email you entered is already taken.';
    } else {
      error = props.error.data.message;
    }
    errorMessage = <div className='form-component__error'>{error}</div>;
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
        <h2 className='form-component__title'>Sign up for an account</h2>
        {redirect}
        {errorMessage}
        {form}
      </div>
    </div>
  );
};

SignUp.propTypes = {
  loadingUser: PropTypes.bool,
  error: PropTypes.object,
  isAuthenticated: PropTypes.string,
};

export default SignUp;
