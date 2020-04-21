import React, { Component } from "react";
import "./ToppingsBuilder.scss";
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
    let toppingOption = null;
    if (this.state.showMeatsBuilder) {
      toppingsBuilder = (
        <React.Fragment>
          <BuilderListOptions
            onClick={e => this.props.onClick(e, MEATS)}
            imageMapping={meatImageMapping}
            itemsSelected={this.props.item[MEATS]}
          />
        </React.Fragment>
      );
      toppingOption = (
        <Button onClick={this.handleClickVeggies} buttonName="Veggies" />
      );
    } else {
      toppingsBuilder = (
        <React.Fragment>
          <BuilderListOptions
            onClick={e => this.props.onClick(e, VEGGIES)}
            imageMapping={veggiesImageMapping}
            itemsSelected={this.props.item[VEGGIES]}
          />
        </React.Fragment>
      );
      toppingOption = (
        <Button onClick={this.handleClickMeats} buttonName="Meats" />
      );
    }
    return (
      <div className="builder">
        <div className="builder__topping">
          {toppingOption}
        </div>
        {toppingsBuilder}
      </div>
    );
  }
}

export default ToppingsBuilder;
