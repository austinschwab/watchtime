import React from "react";
import * as constants from "../constants";

const Resources = () => {
  return (
    <div className="ReccomendationSection flex column align-center justify-center white margin-auto text-center">
      <h1 className="ReccomendationTitle white">
        Now that you have a better sense of your usage. Here are some resources
        to help :D
      </h1>
      <p className="white" style={{ fontSize: 20 }}>
        Handpicked resources
      </p>
      <div className="ReccomendationContainer align-center justify-center">
        {constants.recommendations.map((item, index) => (
          <a href={item.link} className="full-width" key={index}>
            <div className="recc_item flex border-solid row align-center justify-center white">
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
