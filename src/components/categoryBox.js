import React from "react";
import * as constants from "../constants";
import Radium from "radium";

const CategoryBox = ({ index, opacity, hover }) => {
  return (
    <div
      className="categoryBox flex justify-center align-center row margin-auto"
      style={{
        opacity,
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
        className="category-dot"
        style={{
          backgroundColor: constants.Categories[index].color,
        }}
      ></div>
      <span className="category-text">{constants.Categories[index].name}</span>
    </div>
  );
};
export default Radium(CategoryBox);
