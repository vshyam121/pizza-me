import React from "react";
import "./Backdrop.scss";

/* Greyed out backdrop on top of provided children */
const backdrop = props => {
  return props.show ? (
    <div className="backdrop" >{props.children}</div>
  ) : null;
};

export default backdrop;
