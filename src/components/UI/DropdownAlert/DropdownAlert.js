import React from "react";
import "./DropdownAlert.scss";

/* Dropdown alert disappears automatically in a few seconds */
const DropdownAlert = props => {

    return (
        <div key={props.alertKey} onClick={props.onClick} className="dropdown-menu-alert">
            <div className="dropdown-menu-alert__container">
                {props.children}
            </div>
        </div>
    )
}

export default React.memo(DropdownAlert);