import React, { Component } from "react";
import Cheese from "../../../assets/images/cheese_mozz_ML.webp";
import "./PizzaPreview.scss";
import { crustImageMapping } from "../../../metadata/crustMetadata";
import { meatImageMapping } from "../../../metadata/meatMetadata";
import { veggiesImageMapping } from "../../../metadata/veggiesMetadata";
import { crustFlavorImageMapping } from "../../../metadata/crustFlavorMetadata";
import {
  CRUST,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES
} from "../../../metadata/pizzaProperties";
import { NO_CRUST_FLAVOR } from "../../../metadata/crustFlavorMetadata";

class PizzaPreview extends Component {
  render() {
    let title = null;
    if (!this.props.inCart) {
      title = <h4 className="builder-section__title">Preview</h4>;
    }

    return (
      <div className="preview">
        {title}
        <div className={this.props.inCart ? "preview__properties-cart" : "preview__properties"}>
          <img
            className="preview__property"
            src={crustImageMapping[this.props.pizza[CRUST]].preview}
            alt={this.props.pizza[CRUST]}
          />
          {this.props.pizza[CRUST_FLAVOR] !== NO_CRUST_FLAVOR ? (
            <img
              className="preview__property"
              src={
                crustFlavorImageMapping[this.props.pizza[CRUST_FLAVOR]][
                  this.props.pizza[CRUST]
                ].preview
              }
              alt={this.props.pizza[CRUST_FLAVOR]}
            />
          ) : null}
          <img className="preview__property" src={Cheese} alt="Cheese" />
          {this.props.pizza[MEATS] &&
            this.props.pizza[MEATS].map(meat => {
              return (
                <img
                  key={meat}
                  className="preview__property"
                  src={meatImageMapping[meat].preview}
                  alt={meat}
                />
              );
            })}
          {this.props.pizza[VEGGIES] &&
            this.props.pizza[VEGGIES].map(veggy => {
              return (
                <img
                  key={veggy}
                  className="preview__property"
                  src={veggiesImageMapping[veggy].preview}
                  alt={veggy}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default PizzaPreview;
