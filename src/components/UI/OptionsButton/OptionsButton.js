import React, { Component } from "react";
import "./OptionsButton.scss";

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
          const classNames = ["optionsButton__option"];
          if(this.props.selectedOption === option.stage){
              classNames.push("button");
          }
          return (
            <button
              onClick={() => this.handleButtonClick(option)}
              className={classNames.join(" ")}
            >
              {option.optionName}
            </button>
          );
        })}
      </div>
    );
  }
}

export default OptionsButton;
