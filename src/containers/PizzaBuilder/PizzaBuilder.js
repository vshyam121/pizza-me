import React, { Component } from "react";
import {
  CLASSIC_MARINARA,
  REGULAR_SAUCE,
  REGULAR_CHEESE,
  NO_CRUST_FLAVOR
} from "../../metadata/pizzaMetadata";
import Modal from "../../components/UI/Modal/Modal";
import { connect } from "react-redux";
import { closePizzaBuilder } from "../../store/pizzaBuilder/pizzaBuilderActions";

class PizzaBuilder extends Component {

  handleCloseBuilder = () => {
    this.props.closePizzaBuilder();
  };

  render() {
    return (
      <Modal show={this.props.showPizzaBuilder} modalClosed={this.handleCloseBuilder}>
        {""+this.props.crust + this.props.size + this.props.toppings}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
    showPizzaBuilder: state.pizzaBuilder.showPizzaBuilder
});

export default connect(mapStateToProps, { closePizzaBuilder })(PizzaBuilder);
