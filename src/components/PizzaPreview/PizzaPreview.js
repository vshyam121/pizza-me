import React, { Component } from "react";
import Cheese from "../../assets/images/cheese_mozz_ML.webp";
import "./PizzaPreview.scss";
import { crustMetadataMapping } from "../../metadata/crustMetadata";
import { meatImageMapping } from "../../metadata/meatMetadata";
import { veggiesImageMapping } from "../../metadata/veggiesMetadata";
import { crustFlavorImageMapping } from "../../metadata/crustFlavorMetadata";
import {
  CRUST,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES,
  EXTRA_TOPPING,
  LEFT_HALF,
  RIGHT_HALF
} from "../../metadata/pizzaProperties";
import { NO_CRUST_FLAVOR } from "../../metadata/crustFlavorMetadata";

/* Pizza preview image with all selected toppings and crust options */
class PizzaPreview extends Component {
  render() {
    return (
        <div className={this.props.small ? "pizza-preview--small" : "pizza-preview"}>
          <img
            className="pizza-preview__property"
            src={crustMetadataMapping[this.props.pizza[CRUST]].preview}
            alt={this.props.pizza[CRUST]}
          />
          {this.props.pizza[CRUST_FLAVOR] !== NO_CRUST_FLAVOR ? (
            <img
              className="pizza-preview__property"
              src={
                crustFlavorImageMapping[this.props.pizza[CRUST_FLAVOR]][
                  this.props.pizza[CRUST]
                ].preview
              }
              alt={this.props.pizza[CRUST_FLAVOR]}
            />
          ) : null}
          <img className="pizza-preview__property" src={Cheese} alt="Cheese" />
          { this.props.pizza[MEATS] && Object.entries(this.props.pizza[MEATS]).map(([meat, selectedMeatProps]) => {
              let src = null;
              if(selectedMeatProps.amount === EXTRA_TOPPING){
                src = meatImageMapping[meat].previewExtra;
              }
              else{
                src = meatImageMapping[meat].preview;
              }

              let imgClassNames = ["pizza-preview__property"];
              if(selectedMeatProps.portion === LEFT_HALF){
                imgClassNames.push("pizza-preview__property--left");
              }
              else if(selectedMeatProps.portion === RIGHT_HALF){
                imgClassNames.push("pizza-preview__property--right");
              }
              return (
                <img
                  key={meat}
                  className={imgClassNames.join(" ")}
                  src={src}
                  alt={meat}
                />
              );
            })}
          { this.props.pizza[VEGGIES] && Object.entries(this.props.pizza[VEGGIES]).map(([veggy, selectedVeggyProps]) => {
             let src = null;
             if(selectedVeggyProps.amount === EXTRA_TOPPING){
               src = veggiesImageMapping[veggy].previewExtra;
             }
             else{
               src = veggiesImageMapping[veggy].preview;
             }

             let imgClassNames = ["pizza-preview__property"];
             if(selectedVeggyProps.portion === LEFT_HALF){
               imgClassNames.push("preview__property--left");
             }
             else if(selectedVeggyProps.portion === RIGHT_HALF){
               imgClassNames.push("pizza-preview__property--right");
             }
              return (
                <img
                  key={veggy}
                  className={imgClassNames.join(" ")}
                  src={src}
                  alt={veggy}
                />
              );
            })}
        </div>
    );
  }
}

export default PizzaPreview;
