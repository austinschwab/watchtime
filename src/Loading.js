import React from "react";
import Carousel from "./components/carousel";
import ProgressBar from "./components/progress";

const Loading = ({ progress }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
      //   className="full-width full-height"
    >
      <ProgressBar value={+progress} />
      <div className="full-width full-height">
        <Carousel />
      </div>
    </div>
  );
};
export default Loading;
