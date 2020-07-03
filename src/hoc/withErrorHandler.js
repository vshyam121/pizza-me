import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
import { connect } from "react-redux";
import { SIGN_IN, SIGN_UP } from "../store/ui/actionDisplays";

/* Axios error handler HOC */
const withErrorHandler = (WrappedComponent, axios) => {
  class HOComponent extends Component {

    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    handleModalClosed = () => {
      this.setState({ error: null });
    };

    render() {
      if(this.props.erroredAction === SIGN_IN || this.props.erroredAction === SIGN_UP){
        return <WrappedComponent {...this.props} />;
      }
      let erroredAction = "perform action";
      erroredAction = this.props.erroredAction || erroredAction;

      return (
        <React.Fragment>
          <Modal
            error
            show={this.state.error}
            modalClosed={this.handleModalClosed}
          >
            {this.state.error
              ? "Unable to " + erroredAction + ": " + this.state.error.message
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
