import React, { Component } from "react";
import "./PizzaBuilderPreview.scss";
import Cheese from "../../../assets/images/cheese_mozz_ML.webp";
import { crustMetadataMapping } from "../../../metadata/crustMetadata";
import { meatImageMapping } from "../../../metadata/meatMetadata";
import { veggiesImageMapping } from "../../../metadata/veggiesMetadata";
import { crustFlavorImageMapping } from "../../../metadata/crustFlavorMetadata";
import {
  CRUST,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES,
  EXTRA_TOPPING,
  LEFT_HALF,
  RIGHT_HALF,
} from "../../../metadata/pizzaProperties";
import { NO_CRUST_FLAVOR } from "../../../metadata/crustFlavorMetadata";
import PizzaPreview from "../../PizzaPreview/PizzaPreview";

class PizzaBuilderPreview extends Component {
  render() {

    return (
      <div className="pizza-builder-preview">
        <h4 className="builder-section__title">Preview</h4>
        <div className="pizza-builder-preview__preview">
          <PizzaPreview pizza={this.props.pizza} />
        </div>
      </div>
    );
  }
}

export default PizzaBuilderPreview;
