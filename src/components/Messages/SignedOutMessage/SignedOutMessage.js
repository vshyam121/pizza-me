import React from "react";
import "./SignedOutMessage.scss";

const SignedOutMessage = () => {
  return (
    <div className="signed-out-message">
      <h3 style={{ display: "inline" }}>You have successfully signed out!</h3>
    </div>
  );
};

export default SignedOutMessage;
