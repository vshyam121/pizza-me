import React from "react";
import "./Message.scss";

/* Standard message alert to the user component */
const Message = (props) => {
  return (
    <div className="item-list-container">
      <div className="item-list">
        <div className="message">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Message;
