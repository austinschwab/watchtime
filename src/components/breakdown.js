import React from "react";
import * as constants from "../constants";
import ScrollIntoView from "react-scroll-into-view";
import CategoryBox from "./categoryBox";

const Breakdown = ({ sample }) => {
  return (
    <>
      <p className="BreakdownTitle white text-center">
        {sample ? "What you get" : "Data categories"}
      </p>
      <div className="BreakdownContainer full-width flex flex-wrap colummn justify-center align-center">
        {constants.Categories.map((item, index) => (
          <ScrollIntoView
            key={index}
            selector={`#chart${index}`}
            smooth
            style={{
              margin: 10,
            }}
          >
            <CategoryBox opacity={null} index={index} hover={true} />
          </ScrollIntoView>
        ))}
      </div>
    </>
  );
};
export default Breakdown;
