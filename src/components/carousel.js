import React from "react";
import { Carousel } from "antd";
import * as constants from "../constants";
const contentStyle = {
  color: "white",
  textAlign: "center",
};
const CarouselComponent = () => {
  return (
    <Carousel autoplay effect="fade" className="margin-auto carousel-container">
      <div className="flex column justify-center align-center">
        <img
          src={constants.quotes[0].image}
          alt="quote"
          className="margin-auto carousel-img"
        />
        <h3 style={contentStyle}>{constants.quotes[0].description}</h3>
      </div>
      <div className="flex column justify-center align-center">
        <img
          src={constants.quotes[1].image}
          alt="quote"
          className="margin-auto carousel-img"
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[1].description}</h3>
      </div>
      <div className="flex column justify-center align-center">
        <img
          src={constants.quotes[2].image}
          alt="quote"
          className="margin-auto carousel-img"
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[2].description}</h3>
      </div>
      <div className="flex column justify-center align-center">
        <img
          src={constants.quotes[3].image}
          alt="quote"
          className="margin-auto carousel-img"
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[3].description}</h3>
      </div>
      <div className="flex column justify-center align-center">
        <img
          src={constants.quotes[4].image}
          alt="quote"
          className="margin-auto carousel-img"
        />{" "}
        <h3 style={contentStyle}>{constants.quotes[4].description}</h3>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
