import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Click <Link to="/">here</Link> to go back to the homepage
      </p>
      {/* Add more custom content and styling as desired */}
    </div>
  );
};

export default NotFound;
