import React, { Component } from 'react';
import { signOut } from '../../store/auth/authActions/authActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/* Signs current user out */
class SignOutContainer extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: '/',
          fromSignOut: true,
        }}
      />
    );
  }
}

export default connect(null, { signOut })(SignOutContainer);
