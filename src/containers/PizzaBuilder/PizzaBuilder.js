import React, { Component } from "react";
import { connect } from "react-redux";
import "./PizzaBuilder.scss";
import PizzaPreview from "../../components/PizzaBuilder/PizzaPreview/PizzaPreview";
import { toppingPrice } from "../../metadata/priceMappings";
import {
  crustPriceMapping,
  sizePriceMapping
} from "../../metadata/priceMappings";
import { COMBO } from "../../metadata/comboMetadata";
import { SIZE, CRUST, MEATS, VEGGIES } from "../../metadata/pizzaProperties";
import { addToCart, saveToCart } from "../../store/cart/cartActions";
import PizzaDetails from "../../components/PizzaBuilder/PizzaDetails/PizzaDetails";
import PizzaBuilderProgress from "../../components/PizzaBuilder/PizzaBuilderProgress/PizzaBuilderProgress";
import Modal from "../../components/UI/Modal/Modal";
import SizeCrustBuilder from "../../components/PizzaBuilder/SizeCrustBuilder/SizeCrustBuilder";
import CheeseSauceBuilder from "../../components/PizzaBuilder/CheeseSauceBuilder/CheeseSauceBuilder";
import ToppingsBuilder from "../../components/PizzaBuilder/ToppingsBuilder/ToppingsBuilder";
import {
  closePizzaBuilder,
  setProperty,
  toggleTopping
} from "../../store/pizzaBuilder/pizzaBuilderActions";

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

  handleCloseBuilder = () => {
    this.setState({ stage: SIZE_CRUST });
    this.props.closePizzaBuilder();
  };

  handleClickProperty = (event, property) => {
    this.props.setProperty(property, event.currentTarget.value);
  };

  handleClickTopping = (event, property) => {
    console.log(property);
    console.log(event.currentTarget.value);
    this.props.toggleTopping(property, event.currentTarget.value);
  };

  handleAddToCart = (price, quantity) => {
    let item = { ...this.props.item, price: price, quantity: quantity };
    this.props.addToCart(item);
    this.props.closePizzaBuilder();
  };

  handleSaveToCart = (price, quantity) => {
    let item = { ...this.props.item, price: price, quantity: quantity };
    this.props.saveToCart(item);
    this.props.closePizzaBuilder();
  };

  render() {
    let builder = null;
    if (this.state.stage === SIZE_CRUST) {
      builder = (
        <SizeCrustBuilder
          item={this.props.item}
          onClick={this.handleClickProperty}
        />
      );
    } else if (this.state.stage === CHEESE_SAUCE) {
      builder = (
        <CheeseSauceBuilder
          item={this.props.item}
          onClick={this.handleClickProperty}
        />
      );
    } else if (this.state.stage === TOPPINGS) {
      builder = (
        <ToppingsBuilder
          item={this.props.item}
          onClick={this.handleClickTopping}
        />
      );
    }

    return (
      <Modal
        show={this.props.showPizzaBuilder}
        modalClosed={this.handleCloseBuilder}
      >
        <div className="totalBuilder">
          <div className="totalBuilder__preview">
            <PizzaDetails
              addToCart={this.handleAddToCart}
              saveToCart={this.handleSaveToCart}
              item={this.props.item}
            />
            <div className="totalBuilder__previewImg">
              <PizzaPreview item={this.props.item} />
            </div>
          </div>
          <div className="totalBuilder__builder">
            <h1 className="builder-title">Pizza Builder</h1>
            <div className="builder-progress">
              <PizzaBuilderProgress
                stage={this.state.stage}
                onClick={this.handleClickStage}
              />
            </div>
            {builder}
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  item: state.pizzaBuilder.item,
  showPizzaBuilder: state.pizzaBuilder.showPizzaBuilder
});

export default connect(mapStateToProps, {
  closePizzaBuilder,
  setProperty,
  toggleTopping,
  addToCart,
  saveToCart
})(PizzaBuilder);
