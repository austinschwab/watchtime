import React from "react";
import * as constants from "../constants";
import "../App.css";
import Radium from "radium";

const CategoryBox = ({ index, opacity, hover }) => {
  return (
    <div
      className="categoryBox"
      style={{
        opacity,
        margin: "auto",
        ":hover": {
          border: "solid",
          borderColor: hover
            ? constants.Categories[index].color
            : "transparent",
          borderWidth: "1px",
        },
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          backgroundColor: constants.Categories[index].color,
          borderRadius: 20,
        }}
      ></div>
      <span
        style={{
          fontSize: 15,
          fontWeight: 550,
          color: "#b4b4b4",
          marginLeft: 12,
        }}
      >
        {constants.Categories[index].name}
      </span>
    </div>
  );
};
export default Radium(CategoryBox);
