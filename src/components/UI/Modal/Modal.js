import React from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";

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
        <MdClose className="modal__close" onClick={props.modalClosed} />
        {props.children}
      </div>
    </Backdrop>
  );
};

export default Modal;
