import React, { Component } from "react";
import "./OptionsButton.scss";
import Button, { tertiary } from "../Button/Button";

class OptionsButton extends Component {
  state = {};

  handleButtonClick = option => {
    console.log("in handle button click");
    option.onClick();
  };

  render() {
    return (
      <div className="optionsButton">
        {this.props.options.map(option => {
          let button = null;
          if (this.props.selectedOption === option.stage) {
            button = (
              <Button
                onClick={() => this.handleButtonClick(option)}
                type={tertiary}
              >
                {option.optionName}
              </Button>
            );
          } else {
            button = (
              <button
                onClick={() => this.handleButtonClick(option)}
                className="optionsButton__option"
              >
                {option.optionName}
              </button>
            );
          }
          return button;
        })}
      </div>
    );
  }
}

export default OptionsButton;
