import React, { Component } from "react";
import { crustTypes, crustImageMapping } from "../../../metadata/crustMetadata";
import {
  crust_flavors,
  crustFlavorImageMapping
} from "../../../metadata/crustFlavorMetadata";
import { sizes } from "../../../metadata/sizeMetadata";
import BuilderImageOptions from "../BuilderImageOptions/BuilderImageOptions";
import BuilderButtonOption from "../BuilderButtonOptions/BuilderButtonOptions";
import {
  SIZE,
  CRUST,
  CRUST_FLAVOR
} from "../../../metadata/pizzaProperties";

class SizeCrustBuilder extends Component {
  

  render() {
    return (
      <div className="builder">
        <div className="builder-section">
          <h2 className="builder-section__title">Size</h2>
          <BuilderButtonOption
            selectionOptions={sizes}
            itemSelected={this.props.item[SIZE]}
            onClick={e => this.props.onClick(e, SIZE)}
          />
        </div>
        <div className="builder-section">
          <h2 className="builder-section__title">Crust</h2>
          <BuilderImageOptions
            selectionOptions={crustTypes}
            itemSelected={this.props.item[CRUST]}
            imageMapping={crustImageMapping}
            onClick={e => this.props.onClick(e, CRUST)}
          />
        </div>

        <div className="builder-section">
          <h2 className="builder-section__title">Crust Flavor</h2>
          <BuilderImageOptions
            selectionOptions={crust_flavors}
            itemSelected={this.props.item[CRUST_FLAVOR]}
            imageMapping={crustFlavorImageMapping}
            onClick={e => this.props.onClick(e, CRUST_FLAVOR)}
          />
        </div>
      </div>
    );
  }
}

export default SizeCrustBuilder;
