import React from "react";
import "./Item.scss";
import Dropdown from "../Dropdown/Dropdown";

const Item = props => {
  return (
    <div className="item">
      <div className="item__options">
        <Dropdown className="item__crust" options={["Option 1", "Option 2"]} />
        <Dropdown className="item__size" options={["Option 1", "Option 2"]} />
      </div>
      <img className="item__image" src={require("../../../assets/images/pizza_cheese.jpg")} alt="Cheese Pizza" />
    </div>
  );
};

export default Item;
