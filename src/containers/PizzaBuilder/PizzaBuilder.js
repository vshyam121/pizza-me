import React, { Component } from "react";
import { connect } from "react-redux";
import "./PizzaBuilder.scss";
import PizzaPreview from "../../components/PizzaBuilder/PizzaPreview/PizzaPreview";
import { addToCart, saveToCart } from "../../store/cart/cartActions";
import PizzaDetails from "../../components/PizzaBuilder/PizzaDetails/PizzaDetails";
import PizzaBuilderProgress from "../../components/PizzaBuilder/PizzaBuilderProgress/PizzaBuilderProgress";
import Modal from "../../components/UI/Modal/Modal";
import SizeCrustBuilder from "../../components/PizzaBuilder/Builders/SizeCrustBuilder/SizeCrustBuilder";
import CheeseSauceBuilder from "../../components/PizzaBuilder/Builders/CheeseSauceBuilder/CheeseSauceBuilder";
import ToppingsBuilder from "../../components/PizzaBuilder/Builders/ToppingsBuilder/ToppingsBuilder";
import {
  closePizzaBuilder,
  setProperty,
  toggleTopping
} from "../../store/pizzaBuilder/pizzaBuilderActions";
import Button, { primary } from "../../components/UI/Button/Button";

export const SIZE_CRUST = "SIZE_CRUST";
export const CHEESE_SAUCE = "CHEESE_SAUCE";
export const TOPPINGS = "TOPPINGS";

class PizzaBuilder extends Component {
  state = {
    stage: SIZE_CRUST
  };

  handleClickStage = event => {
    this.setState({ stage: event.target.value });
  };

  handleClickAction = stage => {
    this.setState({ stage: stage });
  };

  handleCloseBuilder = () => {
    this.setState({ stage: SIZE_CRUST });
    this.props.closePizzaBuilder();
  };

  handleClickProperty = (event, property) => {
    this.props.setProperty(property, event.currentTarget.dataset.value);
  };

  handleClickTopping = (event, property) => {
    console.log(property);
    console.log(event.currentTarget.dataset.value);
    this.props.toggleTopping(property, event.currentTarget.dataset.value);
  };

  handleAddToCart = (price, quantity) => {
    let pizza = { ...this.props.pizza, price: price};
    this.props.addToCart(pizza, quantity);
    this.props.closePizzaBuilder();
  };

  handleSaveToCart = (price, quantity) => {
    let pizza = { ...this.props.pizza, price: price};
    this.props.saveToCart(pizza, quantity, this.props.itemId);
    this.props.closePizzaBuilder();
  };

  render() {
    let builder = null;
    let back = null;
    let next = null;

    const getActionButton = (stage, buttonName) => {
      return (
        <div className="builder-action__step">
          <Button type={primary} onClick={() => this.handleClickAction(stage)}>
            {buttonName}
          </Button>
        </div>
      );
    };
    if (this.state.stage === SIZE_CRUST) {
      builder = (
        <SizeCrustBuilder
          pizza={this.props.pizza}
          onClick={this.handleClickProperty}
        />
      );
      next = getActionButton(CHEESE_SAUCE, "Next");
    } else if (this.state.stage === CHEESE_SAUCE) {
      builder = (
        <CheeseSauceBuilder
          pizza={this.props.pizza}
          onClick={this.handleClickProperty}
        />
      );
      back = getActionButton(SIZE_CRUST, "Back");
      next = getActionButton(TOPPINGS, "Next");
    } else if (this.state.stage === TOPPINGS) {
      builder = (
        <ToppingsBuilder
          pizza={this.props.pizza}
          onClick={this.handleClickTopping}
        />
      );
      back = getActionButton(CHEESE_SAUCE, "Back");
    }

    return (
      <Modal
        show={this.props.showPizzaBuilder}
        modalClosed={this.handleCloseBuilder}
      >
        <div className="totalBuilder">
          <div className="totalBuilder__mypizza">
            <div className="totalBuilder__details">
              <PizzaDetails
                addToCart={this.handleAddToCart}
                saveToCart={this.handleSaveToCart}
                pizza={this.props.pizza}
                quantity={this.props.quantity}
                itemId={this.props.itemId}
              />
            </div>
            <div className="totalBuilder__preview">
                <PizzaPreview withTitle pizza={this.props.pizza} />
            </div>
          </div>
          <div className="totalBuilder__builder">
            <h3 className="builder-title">Pizza Builder</h3>
            <div className="builder-progress">
              <PizzaBuilderProgress
                stage={this.state.stage}
                onClick={this.handleClickStage}
              />
            </div>
            {builder}
            <div className="builder-action">
              {back}
              {next}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  itemId: state.pizzaBuilder.itemId,
  pizza: state.pizzaBuilder.pizza,
  quantity: state.pizzaBuilder.quantity,
  showPizzaBuilder: state.pizzaBuilder.showPizzaBuilder
});

export default connect(mapStateToProps, {
  closePizzaBuilder,
  setProperty,
  toggleTopping,
  addToCart,
  saveToCart
})(PizzaBuilder);
