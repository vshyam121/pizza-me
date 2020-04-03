import React from "react";
import "./Button.scss";
const Button = props => {
    return <button className="button">
        {props.buttonName}
    </button>
}

export default Button;