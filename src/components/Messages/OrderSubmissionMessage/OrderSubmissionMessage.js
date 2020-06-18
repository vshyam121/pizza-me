import React from "react";
import "./OrderSubmissionMessage.scss";
import { Link } from "react-router-dom";

/* A thank you message to be displayed after successfully submitting an order */
const OrderSubmission = () => {
  return (
    <div className="order-submission">
      <span>
        <h3 style={{ display: "inline" }} className="order-submission__thanks">
          Thank you for ordering at PizzaTime!
        </h3>
        &nbsp;
        <h3 style={{ display: "inline" }}>
          View your{" "}
          <Link className="order-submission__orders" to="/my-orders">
            orders
          </Link>{" "}
        </h3>
      </span>
    </div>
  );
};

export default OrderSubmission;
