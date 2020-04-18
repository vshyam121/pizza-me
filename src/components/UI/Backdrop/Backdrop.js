import React from "react";
import "./Backdrop.scss";

const backdrop = props => {
  return props.show ? (
    <div className="backdrop" >{props.children}</div>
  ) : null;
};

export default backdrop;
