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
    return (
      <div className="preview">
        <div className="preview__properties">
          <img
            className="preview__property"
            src={crustImageMapping[this.props.item[CRUST]].preview}
            alt={this.props.item[CRUST]}
          />
          {this.props.item[CRUST_FLAVOR] !== NO_CRUST_FLAVOR ? (
            <img
              className="preview__property"
              src={
                crustFlavorImageMapping[this.props.item[CRUST_FLAVOR]][
                  this.props.item[CRUST]
                ].preview
              }
              alt={this.props.item[CRUST_FLAVOR]}
            />
          ) : null}
          <img className="preview__property" src={Cheese} alt="Cheese" />
          {this.props.item[MEATS] &&
            this.props.item[MEATS].map(meat => {
              return (
                <img
                  key={meat}
                  className="preview__property"
                  src={meatImageMapping[meat].preview}
                  alt={meat}
                />
              );
            })}
          {this.props.item[VEGGIES] &&
            this.props.item[VEGGIES].map(veggy => {
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
