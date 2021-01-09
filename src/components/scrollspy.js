import React from "react";
import Scrollspy from "react-scrollspy";
import * as constants from "../constants";
import "../App.css";

const ScrollpsyComponent = ({ direction }) => {
  let colorArray = ["white", "green", "red", "blue", "yellow", "purple"];

  return (
    <Scrollspy
      className="Sidebar"
      //   style={{
      //     flexDirection: "row",
      //     justifyContent: "center",
      //   }}
      items={["chart0", "chart1", "chart2", "chart3", "chart4", "chart5"]}
      currentClassName="is-active"
    >
      {colorArray.map((color, index) => {
        return (
          <li
            className={`sidelink ${color}`}
            style={{
              marginLeft: 11,
              marginRight: 11,
            }}
          >
            <a href={`#chart${index}`} className="sidedotAnchor">
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
