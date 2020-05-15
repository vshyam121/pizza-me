import React, { Component } from "react";
import { crustTypes, crustImageMapping } from "../../../../metadata/crustMetadata";
import {
  crust_flavors,
  crustFlavorImageMapping
} from "../../../../metadata/crustFlavorMetadata";
import { sizes } from "../../../../metadata/sizeMetadata";
import  ImageOptions from "../../ImageOptions/ImageOptions";
import ButtonOption from "../../ButtonOptions/ButtonOptions";
import {
  SIZE,
  CRUST,
  CRUST_FLAVOR
} from "../../../../metadata/pizzaProperties";

class SizeCrustBuilder extends Component {
  

  render() {
    return (
      <div className="builder">
        <div className="builder-section">
          <h4 className="builder-section__title">Size</h4>
          <ButtonOption
            selectionOptions={sizes}
            itemSelected={this.props.pizza[SIZE]}
            onClick={e => this.props.onClick(e, SIZE)}
          />
        </div>
        <div className="builder-section">
          <h4 className="builder-section__title">Crust</h4>
          <ImageOptions
            selectionOptions={crustTypes}
            itemSelected={this.props.pizza[CRUST]}
            imageMapping={crustImageMapping}
            onClick={e => this.props.onClick(e, CRUST)}
          />
        </div>

        <div className="builder-section">
          <h4 className="builder-section__title">Crust Flavor</h4>
          <ImageOptions
            selectionOptions={crust_flavors}
            itemSelected={this.props.pizza[CRUST_FLAVOR]}
            imageMapping={crustFlavorImageMapping}
            onClick={e => this.props.onClick(e, CRUST_FLAVOR)}
          />
        </div>
      </div>
    );
  }
}

export default SizeCrustBuilder;
