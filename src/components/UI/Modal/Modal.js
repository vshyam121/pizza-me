import React from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={props.show ? "modal" : "modal--closed"}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default modal;
