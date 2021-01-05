import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="Menu">
      <Link to={{ pathname: "/" }}>
        {" "}
        <img
          src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
          alt="img"
          style={{ width: 200 }}
        />
      </Link>
      <div style={{ float: "right", fontSize: 20 }}>
        <Link style={{ color: "white" }} to={{ pathname: "/manifesto" }}>
          Manifesto
        </Link>
      </div>
    </div>
  );
};

export default Menu;
