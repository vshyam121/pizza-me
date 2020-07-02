import React from "react";
import "./DropdownAlert.scss";
import PropTypes from "prop-types";

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

DropdownAlert.propTypes = {
    alertKey: PropTypes.string.isRequired,
    children: PropTypes.array
  }

export default React.memo(DropdownAlert);