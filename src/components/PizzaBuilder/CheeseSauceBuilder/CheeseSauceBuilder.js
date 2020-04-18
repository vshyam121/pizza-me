import React, { Component } from "react";
import { cheese_amounts } from "../../../metadata/cheeseMetadata";
import {
  sauceImageMapping,
  sauce_amounts
} from "../../../metadata/sauceMetadata";
import BuilderImageOptions from "../BuilderImageOptions/BuilderImageOptions";
import BuilderButtonOption from "../BuilderButtonOptions/BuilderButtonOptions";
import {
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
} from "../../../metadata/pizzaProperties";

class CheeseSauceBuilder extends Component {


  render() {
    return (
      <div className="builder">
        <div className="builder-section">
          <h2 className="builder-section__title">Sauce</h2>
          <BuilderImageOptions
            itemSelected={this.props.item[SAUCE]}
            imageMapping={sauceImageMapping}
            onClick={e => this.props.onClick(e, SAUCE)}
          />
        </div>
        <div className="builder-section">
          <h2 className="builder-section__title">Amount of Sauce</h2>
          <BuilderButtonOption
            selectionOptions={sauce_amounts}
            itemSelected={this.props.item[SAUCE_AMOUNT]}
            onClick={e => this.props.onClick(e, SAUCE_AMOUNT)}
          />
        </div>
        <div className="builder-section">
          <h2 className="builder-section__title">Amount of Cheese</h2>
          <BuilderButtonOption
            selectionOptions={cheese_amounts}
            itemSelected={this.props.item[CHEESE_AMOUNT]}
            onClick={e => this.props.onClick(e, CHEESE_AMOUNT)}
          />
        </div>
      </div>
    );
  }
}

export default CheeseSauceBuilder;
