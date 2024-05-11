import React from "react";
import "./auth/Login/Login.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error-page">
      <div className="error-card">
        <h1 className="error-text">404</h1>
        <p
          style={{
            margin: "0px",
            color: "#63228B",
            fontWeight: "700",
          }}
        >
          OOPS! PAGE NOT FOUND
        </p>
        <Link style={{ fontWeight: "700" }} to="/dashboard">
          BACK TO DASHBOARD
        </Link>
      </div>
    </div>
  );
}

export default Error;
