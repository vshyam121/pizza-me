import React from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect } from "react";
import Close  from "@material-ui/icons/CloseOutlined";

const Modal = props => {
  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  return (
    <Backdrop show={props.show} clicked={props.modalClosed}>
      <div className={props.show ? "modal" : " modal modal--closed"}>
        <Close className="modal__close" onClick={props.modalClosed} />
        {props.children}
      </div>
    </Backdrop>
  );
};

export default Modal;
