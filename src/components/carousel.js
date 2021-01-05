import React from "react";
import { Carousel } from "antd";
import * as constants from "../constants";
const contentStyle = {
  color: "white",
  textAlign: "center",
};
const CarouselComponent = () => {
  return (
    <Carousel
      autoplay
      effect="fade"
      style={{ width: "80vw", height: "80vh", margin: "auto" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={constants.quotes[0].image}
          alt="quote"
          style={{ height: 600, margin: "auto" }}
        />
        <h3 style={contentStyle}>{constants.quotes[0].description}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={constants.quotes[1].image}
          alt="quote"
          style={{ height: 600, margin: "auto" }}
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[1].description}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={constants.quotes[2].image}
          alt="quote"
          style={{ height: 600, margin: "auto" }}
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[2].description}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={constants.quotes[3].image}
          alt="quote"
          style={{ height: 600, margin: "auto" }}
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[2].description}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={constants.quotes[4].image}
          alt="quote"
          style={{ height: 600, margin: "auto" }}
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[2].description}</h3>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
