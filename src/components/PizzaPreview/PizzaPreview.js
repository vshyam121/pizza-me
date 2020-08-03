import React, { Component } from 'react';
import Cheese from '../../images/cheese_mozz_ML.png';
import './PizzaPreview.scss';
import { crustMetadataMapping } from '../../metadata/crustMetadata';
import { meatImageMapping } from '../../metadata/meatMetadata';
import { veggiesImageMapping } from '../../metadata/veggiesMetadata';
import { crustFlavorImageMapping } from '../../metadata/crustFlavorMetadata';
import {
  CRUST,
  CRUST_FLAVOR,
  MEATS,
  VEGGIES,
  EXTRA_TOPPING,
  LEFT_HALF,
  RIGHT_HALF,
} from '../../metadata/pizzaProperties';
import { NO_CRUST_FLAVOR } from '../../metadata/crustFlavorMetadata';
import PropTypes from 'prop-types';

/* Pizza preview image with all selected toppings and crust options */
class PizzaPreview extends Component {
  render() {
    return (
      <div
        className={this.props.small ? 'pizza-preview--small' : 'pizza-preview'}
      >
        <img
          className='pizza-preview__property'
          src={crustMetadataMapping[this.props.pizza[CRUST]].preview}
          alt={this.props.pizza[CRUST]}
        />
        {this.props.pizza[CRUST_FLAVOR] !== NO_CRUST_FLAVOR ? (
          <img
            className='pizza-preview__property'
            src={
              crustFlavorImageMapping[this.props.pizza[CRUST_FLAVOR]][
                this.props.pizza[CRUST]
              ].preview
            }
            alt={this.props.pizza[CRUST_FLAVOR]}
          />
        ) : null}
        <img className='pizza-preview__property' src={Cheese} alt='Cheese' />
        {this.props.pizza[MEATS] &&
          this.props.pizza[MEATS].map((meat) => {
            let src = null;
            if (meat.amount === EXTRA_TOPPING) {
              src = meatImageMapping[meat.toppingName].previewExtra;
            } else {
              src = meatImageMapping[meat.toppingName].preview;
            }

            let imgClassNames = ['pizza-preview__property'];
            if (meat.portion === LEFT_HALF) {
              imgClassNames.push('pizza-preview__property--left');
            } else if (meat.portion === RIGHT_HALF) {
              imgClassNames.push('pizza-preview__property--right');
            }
            return (
              <img
                key={meat.toppingName}
                className={imgClassNames.join(' ')}
                src={src}
                alt={meat.toppingName}
              />
            );
          })}
        {this.props.pizza[VEGGIES] &&
          this.props.pizza[VEGGIES].map((veggy) => {
            let src = null;
            if (veggy.amount === EXTRA_TOPPING) {
              src = veggiesImageMapping[veggy.toppingName].previewExtra;
            } else {
              src = veggiesImageMapping[veggy.toppingName].preview;
            }

            let imgClassNames = ['pizza-preview__property'];
            if (veggy.portion === LEFT_HALF) {
              imgClassNames.push('pizza-preview__property--left');
            } else if (veggy.portion === RIGHT_HALF) {
              imgClassNames.push('pizza-preview__property--right');
            }
            return (
              <img
                key={veggy.toppingName}
                className={imgClassNames.join(' ')}
                src={src}
                alt={veggy.toppingName}
              />
            );
          })}
      </div>
    );
  }
}

PizzaPreview.propTypes = {
  pizza: PropTypes.object.isRequired,
  small: PropTypes.bool,
};

export default PizzaPreview;
