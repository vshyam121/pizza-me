import React from 'react';
import './Message.scss';
import PropTypes from 'prop-types';

/* Standard message alert to the user component */
const Message = (props) => {
  return (
    <div className='item-list-container'>
      <div className='item-list'>
        <div className='message'>
          <span>{props.children} </span>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Message;
