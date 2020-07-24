import React, { Component } from 'react';
import './OrderType.scss';
import { MdDirectionsCar, MdStore } from 'react-icons/md';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AddressFormContainer from '../../containers/AddressFormContainer';
import Message from '../../components/UI/Message/Message';
import SignedUpMessage from '../../components/Messages/SignedUpMessage/SignedUpMessage';
import PropTypes from 'prop-types';

/* Options for choosing either carryout or delivery order */
class OrderType extends Component {
  state = {
    isDelivery: false,
  };

  handleClick = (event) => {
    if (event.currentTarget.dataset.type === 'Delivery') {
      this.setState({ isDelivery: true });
    } else {
      this.props.history.push('/checkout');
    }
  };

  render() {
    let message = null;
    if (this.props.location.fromSignUp) {
      message = (
        <Message>
          <SignedUpMessage />
        </Message>
      );
    }
    if (!this.props.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: '/signin',
            fromCheckout: true,
          }}
        />
      );
    }

    let form = null;

    if (this.state.isDelivery) {
      form = <AddressFormContainer />;
    }

    let orderTypeClassNames = ['order-type'];
    let deliveryClassNames = ['order-type__type'];
    let iconClassNames = ['order-type__icon'];
    if (this.state.isDelivery) {
      orderTypeClassNames.push('order-type--extended');
      deliveryClassNames.push('order-type__type--selected');
      iconClassNames.push('order-type__icon--selected');
    }

    return (
      <React.Fragment>
        {message}
        <div className='form-container'>
          <div className='form-component'>
            <h4 className='form-component__title'>
              Please choose an order method
            </h4>
            <div className={orderTypeClassNames.join(' ')}>
              <div
                onClick={this.handleClick}
                data-type='Delivery'
                className={deliveryClassNames.join(' ')}
              >
                <div className={iconClassNames.join(' ')}>
                  <MdDirectionsCar />
                </div>
                <span className='order-type__description'>Delivery</span>
              </div>
              <div
                onClick={this.handleClick}
                data-type='Carryout'
                className='order-type__type'
              >
                <div className='order-type__icon'>
                  <MdStore />
                </div>
                <span className='order-type__description'>Carryout</span>
              </div>
            </div>
            {form}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

OrderType.propTypes = {
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.userId,
});

export default connect(mapStateToProps, null)(OrderType);
