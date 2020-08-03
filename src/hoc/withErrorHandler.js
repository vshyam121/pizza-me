import React, { Component } from 'react';
import Modal from '../components/Theme/Modal/Modal';
import { connect } from 'react-redux';
import { SIGN_IN, SIGN_UP, AUTH_TOKEN } from '../shared/actionErrors';

/* Axios error handler HOC */
const withErrorHandler = (WrappedComponent, axios) => {
  class HOComponent extends Component {
    constructor(props) {
      super(props);
      this.requestInterceptor = null;
      this.responseInterceptor = null;
    }
    state = {
      error: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.error && nextState.error) {
        return false;
      }
      return true;
    }

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    handleModalClosed = () => {
      this.setState({ error: null });
    };

    render() {
      //Don't show error modal for certain actions
      //They have their own error handling
      let excludeActions = [SIGN_UP, SIGN_IN, AUTH_TOKEN];
      if (
        this.state.error &&
        this.state.error.message !== 'Network Error' &&
        this.state.error.response.status !== 500 &&
        excludeActions.includes(this.props.erroredAction)
      ) {
        return <WrappedComponent {...this.props} />;
      }
      let erroredAction = 'perform action';
      erroredAction = this.props.erroredAction || erroredAction;

      return (
        <React.Fragment>
          <Modal
            error
            show={this.state.error}
            modalClosed={this.handleModalClosed}
          >
            {this.state.error
              ? `Unable to ${erroredAction}: ${this.state.error.message}`
              : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state) => ({
    erroredAction: state.ui.erroredAction,
  });

  return connect(mapStateToProps, null)(HOComponent);
};

export default withErrorHandler;
