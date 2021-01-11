import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="full-width">
      <div className="Menu flex row justify-between align-center">
        <Link to={{ pathname: "/" }}>
          {" "}
          <img
            src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
            alt="img"
            style={{ width: 125 }}
          />
        </Link>
        <Link
          className="white"
          style={{ fontSize: 19 }}
          to={{ pathname: "/manifesto" }}
        >
          Manifesto
        </Link>
      </div>
    </div>
  );
};

export default Menu;
