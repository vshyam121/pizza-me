import React, { Component } from 'react';
import './ToppingsBuilder.scss';
import ToppingOptions from '../../BuilderOptions/ToppingOptions/ToppingOptions';
import { meatImageMapping } from '../../../../metadata/meatMetadata';
import { veggiesImageMapping } from '../../../../metadata/veggiesMetadata';
import { MEATS, VEGGIES } from '../../../../metadata/pizzaProperties';
import OptionsButton from '../../../UI/OptionsButton/OptionsButton';
import PropTypes from 'prop-types';

/* Pizza builder section with topping options */
class ToppingsBuilder extends Component {
  state = {
    stage: this.props.toppingType || MEATS,
  };

  handleClickVeggies = () => {
    this.setState({ stage: VEGGIES });
  };

  handleClickMeats = () => {
    this.setState({ stage: MEATS });
  };

  render() {
    let toppingsBuilder = null;
    if (this.state.stage === MEATS) {
      toppingsBuilder = (
        <React.Fragment>
          <ToppingOptions
            onClick={(e) => this.props.onClick(e, MEATS)}
            onClickAmount={(e) => this.props.onClickAmount(e, MEATS)}
            onClickPortion={(e) => this.props.onClickPortion(e, MEATS)}
            imageMapping={meatImageMapping}
            itemsSelected={this.props.pizza[MEATS]}
          />
        </React.Fragment>
      );
    } else {
      toppingsBuilder = (
        <React.Fragment>
          <ToppingOptions
            onClick={(e) => this.props.onClick(e, VEGGIES)}
            onClickAmount={(e) => this.props.onClickAmount(e, VEGGIES)}
            onClickPortion={(e) => this.props.onClickPortion(e, VEGGIES)}
            imageMapping={veggiesImageMapping}
            itemsSelected={this.props.pizza[VEGGIES]}
          />
        </React.Fragment>
      );
    }

    const options = [
      {
        optionName: MEATS,
        displayName: 'Meats',
        onClick: this.handleClickMeats,
      },
      {
        optionName: VEGGIES,
        displayName: 'Veggies',
        onClick: this.handleClickVeggies,
      },
    ];
    return (
      <div className='builder'>
        <div className='builder__topping-type'>
          <OptionsButton selectedOption={this.state.stage} options={options} />
        </div>
        <div className='builder__topping'></div>
        {toppingsBuilder}
      </div>
    );
  }
}

ToppingsBuilder.propTypes = {
  pizza: PropTypes.object.isRequired,
};

export default ToppingsBuilder;
