import React from "react";
import "./DropdownAlert.scss";

const DropdownMenuAlert = props => {

    return (
        <div key={props.alertKey} className="dropdown-menu-alert animate-alert">
            <div className="dropdown-menu-alert__container">
                {props.children}
            </div>
        </div>
    )
}

export default DropdownMenuAlert;