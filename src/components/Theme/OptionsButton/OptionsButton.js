import React, { Component } from 'react';
import './OptionsButton.scss';
import Button, { tertiary } from '../Button/Button';
import PropTypes from 'prop-types';

/* Standard single component with one or more button options */
class OptionsButton extends Component {
  state = {};

  handleButtonClick = (option) => {
    option.onClick();
  };

  render() {
    return (
      <div className='optionsButton'>
        {this.props.options.map((option) => {
          let button = null;
          if (this.props.selectedOption === option.optionName) {
            button = (
              <Button
                key={option.optionName}
                onClick={() => this.handleButtonClick(option)}
                type={tertiary}
              >
                {option.displayName}
              </Button>
            );
          } else {
            button = (
              <button
                key={option.optionName}
                onClick={() => this.handleButtonClick(option)}
                className='optionsButton__option'
              >
                {option.displayName}
              </button>
            );
          }
          return button;
        })}
      </div>
    );
  }
}

OptionsButton.propTypes = {
  options: PropTypes.array.isRequired,
};

export default OptionsButton;
