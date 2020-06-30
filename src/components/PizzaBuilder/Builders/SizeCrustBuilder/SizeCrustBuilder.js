import React, { Component } from "react";
import {
  crustTypes,
  crustMetadataMapping,
} from "../../../../metadata/crustMetadata";
import {
  crust_flavors,
  crustFlavorImageMapping,
} from "../../../../metadata/crustFlavorMetadata";
import { sizes } from "../../../../metadata/sizeMetadata";
import ImageOptions from "../../BuilderOptions/ImageOptions/ImageOptions";
import ButtonOptions from "../../BuilderOptions/ButtonOptions/ButtonOptions";
import {
  SIZE,
  CRUST,
  CRUST_FLAVOR,
} from "../../../../metadata/pizzaProperties";
import PropTypes from "prop-types";

/* Pizza builder section with size/crust options */
class SizeCrustBuilder extends Component {

  render() {
    console.log("render size crust builder");
    return (
      <div className="builder">
        <div className="builder-section">
          <h4 className="builder-section__title">Size</h4>
          <ButtonOptions
            selectionOptions={sizes}
            itemSelected={this.props.pizza[SIZE]}
            onClick={(e) => this.props.onClick(e, SIZE)}
          />
        </div>
        <div className="builder-section">
          <h4 className="builder-section__title">Crust</h4>
          <ImageOptions
            selectionMetadata={crustMetadataMapping}
            selectionOptions={crustTypes}
            itemSelected={this.props.pizza[CRUST]}
            imageMapping={crustMetadataMapping}
            onClick={(e) => this.props.onClick(e, CRUST)}
          />
        </div>

        <div className="builder-section">
          <h4 className="builder-section__title">Crust Flavor</h4>
          <ImageOptions
            selectionOptions={crust_flavors}
            itemSelected={this.props.pizza[CRUST_FLAVOR]}
            imageMapping={crustFlavorImageMapping}
            onClick={(e) => this.props.onClick(e, CRUST_FLAVOR)}
          />
        </div>
      </div>
    );
  }
}

SizeCrustBuilder.proptTypes = {
  pizza: PropTypes.object.isRequired
}

export default SizeCrustBuilder;
