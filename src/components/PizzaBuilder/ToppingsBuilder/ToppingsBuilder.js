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

  render() {
    let toppingsBuilder = null;
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
    }

    const options = [
      { stage: MEATS, optionName: "Meats", onClick: this.handleClickMeats },
      {
        stage: VEGGIES,
        optionName: "Veggies",
        onClick: this.handleClickVeggies
      }
    ];
    return (
      <div className="builder">
        <div className="builder__topping-type">
          <OptionsButton selectedOption={this.state.stage} options={options} />
        </div>
        <div className="builder__topping"></div>
        {toppingsBuilder}
      </div>
    );
  }
}

export default ToppingsBuilder;
