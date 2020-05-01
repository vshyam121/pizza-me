import React, { Component } from "react";
import "./ToppingsBuilder.scss";
import Button from "../../../components/UI/Button/Button";
import BuilderListOptions from "../../../components/PizzaBuilder/BuilderListOptions/BuilderListOptions";
import { meatImageMapping } from "../../../metadata/meatMetadata";
import { veggiesImageMapping } from "../../../metadata/veggiesMetadata";
import { MEATS, VEGGIES } from "../../../metadata/pizzaProperties";
import OptionsButton from "../../UI/OptionsButton/OptionsButton";

class ToppingsBuilder extends Component {
  state = {
    stage: MEATS
  };

  handleClickVeggies = () => {
    this.setState({ stage: VEGGIES });
  };

  handleClickMeats = () => {
    this.setState({ stage: MEATS });
  };

  handleClickTopping = (event, property) => {
    console.log(property);
    console.log(event.currentTarget.value);
    this.props.toggleTopping(property, event.currentTarget.value);
  };

  render() {
    let toppingsBuilder = null;
    let toppingOption = null;
    if (this.state.stage === MEATS) {
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
        <Button onClick={this.handleClickVeggies}>Veggies</Button>
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
      toppingOption = <Button onClick={this.handleClickMeats}>Meats</Button>;
    }

    const options = [
      { stage: MEATS, optionName: "Meats", onClick: this.handleClickMeats },
      { stage: VEGGIES, optionName: "Veggies", onClick: this.handleClickVeggies }
    ];
    return (
      <div className="builder">
        <OptionsButton selectedOption={this.state.stage} options={options} />
        <div className="builder__topping"></div>
        {toppingsBuilder}
      </div>
    );
  }
}

export default ToppingsBuilder;
