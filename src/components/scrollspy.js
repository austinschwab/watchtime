import React from "react";
import Scrollspy from "react-scrollspy";
import * as constants from "../constants";

const ScrollpsyComponent = ({ direction }) => {
  let colorArray = ["white", "green", "red", "blue", "yellow", "purple"];

  return (
    <Scrollspy
      className={`Sidebar flex  ${
        direction === "horizontal" ? "row justify-center" : "column"
      }`}
      items={["chart0", "chart1", "chart2", "chart3", "chart4", "chart5"]}
      currentClassName="is-active"
    >
      {colorArray.map((color, index) => {
        return (
          <li className={`sidelink ${color} border-solid`}>
            <a
              href={`#chart${index}`}
              className="flex justify-center align-center full-width full-height"
            >
              <div
                className="sidedot"
                style={{
                  backgroundColor: constants.Categories[index].color,
                }}
              ></div>
            </a>
          </li>
        );
      })}
    </Scrollspy>
  );
};
export default ScrollpsyComponent;
