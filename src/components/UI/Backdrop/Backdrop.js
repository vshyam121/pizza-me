import React from 'react';
import './Backdrop.scss';
import PropTypes from 'prop-types';

/* Greyed out backdrop on top of provided children */
const Backdrop = (props) => {
  return props.show ? <div className='backdrop'>{props.children}</div> : null;
};

Backdrop.propTypes = {
  children: PropTypes.object,
};

export default Backdrop;
