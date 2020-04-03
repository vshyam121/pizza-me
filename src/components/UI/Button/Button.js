import React from "react";
import "./Button.scss";

/* Standard button across entire app */
const Button = props => {
    return <button className="button">
        {props.buttonName}
    </button>
}

export default Button;