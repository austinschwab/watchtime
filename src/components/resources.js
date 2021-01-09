import React from "react";
import * as constants from "../constants";

const Resources = () => {
  return (
    <div className="Reccomendation_Section">
      <h1
        style={{
          color: "white",
          fontSize: 36,
          marginBottom: 100,
          width: "70%",
        }}
      >
        Now that you have a better sense of your usage. Here are some resources
        to help:
      </h1>
      <p style={{ fontSize: 20, color: "white" }}>Handpicked resources</p>
      <div className="ReccomendationContainer">
        {constants.recommendations.map((item, index) => (
          <a href={item.link} style={{ width: "100%" }}>
            <div className="reccomendation_item" key={index}>
              {item.image}
              <div style={{ marginLeft: 16 }}>
                <p style={{ fontSize: 12 }}>{item.name}</p>
                <p style={{ fontSize: 12 }}>{item.type}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default Resources;
