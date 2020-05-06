import React, { Component } from "react";
import "./OrderType.scss";
import { MdDirectionsCar, MdStore } from "react-icons/md";
import Form from "../Form/Form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class OrderType extends Component {
  state = {
    isDelivery: false
  };

  handleClick = event => {
    if (event.currentTarget.dataset.type === "Delivery") {
      this.setState({ isDelivery: true });
    } else {
      this.props.history.push("/checkout");
    }
  };

  handleSubmit = event => {};

  render() {
    if (!this.props.isAuthenticated && !this.props.userInfo) {
      return (
        <Redirect
          to={{
            pathname: "/signin",
            checkout: "true"
          }}
        />
      );
    }
    const deliveryForm = {
      address: {
        elementType: "input",
        elementConfig: {
          placeholder: "Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      unit: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Apt/Unit #"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      city: {
        elementType: "input",
        elementConfig: {
          placeholder: "City"
        },
        value: "",
        validation: {
          hasLength: 2,
          required: true
        },
        valid: false
      },
      state: {
        elementType: "input",
        elementConfig: {
          placeholder: "State"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    };

    let form = null;

    if (this.state.isDelivery) {
      form = <Form form={deliveryForm} onSubmit={this.handleSubmit} />;
    }
    return (
      <div className="form-container">
        <div className="form-component">
          <div className="order-type">
            <div
              onClick={this.handleClick}
              data-type="Delivery"
              className="order-type__type"
            >
              <div className="order-type__icon">
                <MdDirectionsCar />
              </div>
              <span className="order-type__description">Delivery</span>
            </div>
            <div
              onClick={this.handleClick}
              data-type="Carryout"
              className="order-type__type"
            >
              <div className="order-type__icon">
                <MdStore />
              </div>
              <span className="order-type__description">Carryout</span>
            </div>
          </div>
          {form}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken,
  userInfo: state.order.userInfo
});

export default connect(mapStateToProps, null)(OrderType);
