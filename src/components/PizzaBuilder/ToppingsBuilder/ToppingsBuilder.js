import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import BuilderListOptions from "../../../components/PizzaBuilder/BuilderListOptions/BuilderListOptions";
import { meatImageMapping } from "../../../metadata/meatMetadata";
import { veggiesImageMapping } from "../../../metadata/veggiesMetadata";
import { MEATS, VEGGIES } from "../../../metadata/pizzaProperties";

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
          <BuilderListOptions
            onClick={e => this.props.onClick(e, MEATS)}
            imageMapping={meatImageMapping}
            itemsSelected={this.props.item[MEATS]}
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
          <BuilderListOptions
            onClick={e => this.props.onClick(e, VEGGIES)}
            imageMapping={veggiesImageMapping}
            itemsSelected={this.props.item[VEGGIES]}
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

export default ToppingsBuilder;
