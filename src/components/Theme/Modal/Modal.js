import React from 'react';
import './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

/* Standard modal across entire app */
const Modal = (props) => {
  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  });

  let modalClassNames = ['modal'];
  if (props.error) {
    modalClassNames.push('modal--error');
  }
  if (!props.show) {
    modalClassNames.push('modal--closed');
  }
  return (
    <Backdrop show={props.show} clicked={props.modalClosed}>
      <div className={modalClassNames.join(' ')}>
        <MdClose className='modal__close' onClick={props.modalClosed} />
        <div className='modal__children'>{props.children}</div>
      </div>
    </Backdrop>
  );
};

Modal.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.bool,
};

export default Modal;
