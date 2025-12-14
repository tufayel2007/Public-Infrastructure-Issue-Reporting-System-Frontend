import React from "react";
import { Link } from "react-router-dom";

const BoostCancel = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your boost payment was cancelled.</p>

      <Link to="/" style={{ color: "blue" }}>
        Try Again
      </Link>
    </div>
  );
};

export default BoostCancel;
