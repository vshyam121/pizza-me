import React, { Component } from "react";
import "./ItemBox.scss";
import Dropdown from "../Dropdown/Dropdown";
import { SMALL, MEDIUM, LARGE } from "../Dropdown/Dropdown";
import Button from "../Button/Button";

class ItemBox extends Component {
  state = {
    price: this.props.price
  };

  handleChangeQuantity = event => {
    const price = this.props.price * event.target.value;
    this.setState({ price: price.toFixed(2) });
  };

  render() {
    const crustOptions = [
      "Hand Tossed Pizza",
      "Thin 'N Crispy Pizza",
      "Original Pan Pizza",
      "Original Stuffed Crust"
    ];

    const sizeOptions = ["Large", "Medium", "Personal"];
    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="item">
        <div className="item__details">
          <div className="item__name-price">
            <h2 className="item__name">{this.props.itemName}</h2>
            <h3>${this.state.price}</h3>
          </div>
          <div className="item__options">
            <Dropdown
              size={LARGE}
              className="item__crust"
              options={crustOptions}
            />
            <Dropdown
              size={LARGE}
              className="item__size"
              options={sizeOptions}
            />
            <div className="item__add">
              <div className="item__quantity">
                <Dropdown
                  onChange={this.handleChangeQuantity}
                  size={SMALL}
                  options={quantityOptions}
                />
              </div>
              <Button buttonName="Add to Order" />
            </div>
          </div>
        </div>
        <img
          className="item__image"
          src={this.props.imageSrc}
          alt={this.props.itemName}
        />
      </div>
    );
  }
}

export default ItemBox;
