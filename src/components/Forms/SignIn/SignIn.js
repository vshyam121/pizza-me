import React from 'react';
import './SignIn.scss';
import Button, { secondary } from '../../Theme/Button/Button';
import { SyncLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import Form from '../../Theme/Form/Form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Sign in form */
const SignIn = (props) => {
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
    } else {
      error = props.error.data.message;
    }
    errorMessage = <div className='form-component__error'>{error}</div>;
  }

  let redirect = null;
  if (props.isAuthenticated) {
    if (props.location.fromCheckout) {
      redirect = <Redirect to='/checkout/order-type' />;
    } else {
      redirect = <Redirect to='/' />;
    }
  }

  return (
    <div className='form-container'>
      <div className='form-component'>
        <h2 className='form-component__title'>
          Please sign in to your account
        </h2>
        {redirect}
        {errorMessage}
        {form}
        <div className='signup'>
          <Link
            to={{
              pathname: '/signup',
              fromCheckout: props.location.fromCheckout,
            }}
          >
            <Button type={secondary}>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  loadingUser: PropTypes.bool,
  error: PropTypes.object,
  isAuthenticated: PropTypes.string,
};

export default SignIn;
