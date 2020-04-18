import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import BuilderToppingOptions from "../../../components/PizzaBuilder/BuilderToppingOptions/BuilderToppingOptions";
import { meatImageMapping } from "../../../metadata/meatMetadata";
import { veggiesImageMapping } from "../../../metadata/veggiesMetadata";
import { MEATS, VEGGIES } from "../../../metadata/pizzaProperties";
import { toggleTopping } from "../../../store/pizzaBuilder/pizzaBuilderActions";
import { connect } from "react-redux";

class ToppingsBuilder extends Component {
  state = {
    showMeatsBuilder: true
  };

  handleClickVeggies = () => {
    this.setState({ showMeatsBuilder: false });
  };

  handleClickMeats = () => {
    this.setState({ showMeatsBuilder: true });
  };

  handleClickTopping = (event, property) => {
    console.log(property);
    console.log(event.currentTarget.value);
    this.props.toggleTopping(property, event.currentTarget.value);
  };

  render() {
    let toppingsBuilder = null;
    if (this.state.showMeatsBuilder) {
      toppingsBuilder = (
        <React.Fragment>
          <BuilderToppingOptions
            onClick={e => this.handleClickTopping(e, MEATS)}
            toppingImageMapping={meatImageMapping}
            toppingsSelected={this.props.item[MEATS]}
          />
          <Button
            onClick={this.handleClickVeggies}
            buttonName="Continue to Veggies"
          />
        </React.Fragment>
      );
    } else {
      toppingsBuilder = (
        <React.Fragment>
          <BuilderToppingOptions
            onClick={e => this.handleClickTopping(e, VEGGIES)}
            toppingImageMapping={veggiesImageMapping}
            toppingsSelected={this.props.item[VEGGIES]}
          />
          <Button onClick={this.handleClickMeats} buttonName="Back to Meats" />
        </React.Fragment>
      );
    }
    return (
      <div className="builder">
        {toppingsBuilder}
        <Button
          onClick={this.props.onClick}
          buttonName="Back to Crust, Sauce, and Cheese"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.pizzaBuilder.item
});

export default connect(mapStateToProps, { toggleTopping })(ToppingsBuilder);
