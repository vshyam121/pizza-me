import React, { Component } from 'react';
import {
  cheeseAmounts,
  cheeseAmountMetadataMapping,
} from '../../../../metadata/cheeseMetadata';
import {
  sauceImageMapping,
  sauceAmounts,
  sauceAmountMetadataMapping,
} from '../../../../metadata/sauceMetadata';
import ImageOptions from '../../BuilderOptions/ImageOptions/ImageOptions';
import ButtonOptions from '../../BuilderOptions/ButtonOptions/ButtonOptions';
import {
  SAUCE,
  SAUCE_AMOUNT,
  CHEESE_AMOUNT,
} from '../../../../metadata/pizzaProperties';
import PropTypes from 'prop-types';

/* Pizza builder section with cheese/sauce options */
class CheeseSauceBuilder extends Component {
  render() {
    return (
      <div className='builder'>
        <div className='builder-section'>
          <h3 className='builder-section__title'>Sauce</h3>
          <ImageOptions
            itemSelected={this.props.pizza[SAUCE]}
            imageMapping={sauceImageMapping}
            onClick={(e) => this.props.onClick(e, SAUCE)}
          />
        </div>
        <div className='builder-section'>
          <h3 className='builder-section__title'>Amount of Sauce</h3>
          <ButtonOptions
            selectionMetadata={sauceAmountMetadataMapping}
            selectionOptions={sauceAmounts}
            itemSelected={this.props.pizza[SAUCE_AMOUNT]}
            onClick={(e) => this.props.onClick(e, SAUCE_AMOUNT)}
          />
        </div>
        <div className='builder-section'>
          <h3 className='builder-section__title'>Amount of Cheese</h3>
          <ButtonOptions
            selectionMetadata={cheeseAmountMetadataMapping}
            selectionOptions={cheeseAmounts}
            itemSelected={this.props.pizza[CHEESE_AMOUNT]}
            onClick={(e) => this.props.onClick(e, CHEESE_AMOUNT)}
          />
        </div>
      </div>
    );
  }
}

CheeseSauceBuilder.propTypes = {
  pizza: PropTypes.object.isRequired,
};

export default CheeseSauceBuilder;
