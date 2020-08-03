import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { withRouter } from 'react-router-dom';
import Form from '../../Theme/Form/Form';
import PropTypes from 'prop-types';

/* Delivery address form */
class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.props.validateDeliveryAddressReset();
  }

  componentDidUpdate() {
    if (this.props.addressValid) {
      this.props.history.push('/checkout');
    }
  }

  render() {
    let errorMessage = null;
    let form = null;
    if (this.props.loading) {
      form = (
        <div className='spinner'>
          <SyncLoader />
        </div>
      );
    } else {
      form = (
        <Form
          {...this.props}
          onSubmit={this.props.handleSubmit}
          updateForm={this.props.updateForm}
        />
      );
    }

    if (this.props.error) {
      errorMessage = (
        <div className='form-component__error'>
          <p>{this.props.error}</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        <h2 className='form-component__title'>
          Please enter your delivery address
        </h2>
        {errorMessage}
        {form}
      </React.Fragment>
    );
  }
}

AddressForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  addressValid: PropTypes.bool,
};

export default withRouter(AddressForm);
