import React from "react";
import { Link } from "react-router-dom";
import Radium from "radium";
const HomepageTop = ({ sample }) => {
  return (
    <>
      {sample ? (
        <>
          <h1 className="HomepageTopTitle white text-center">
            Monitor your Youtube usage
          </h1>
          <p className="HomepageTopSubtitle white text-center">
            It’s easy to lose track of how much time you spend watching videos
            online.
          </p>
          <Link to={{ pathname: "/upload" }}>
            <div className="calculate-btn-container flex column">
              <div
                className="calculate-btn calculate-btn-top"
                key="calculate-btn-top"
                style={{
                  ":hover": {
                    transform: `translate(${2}px, ${-2}px)`,
                  },
                }}
              >
                Get started
              </div>
              <div className="calculate-btn calculate-btn-bottom">
                Calculate
              </div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <p className="Paragraph margin-auto text-center grey">
            <span className="white">Scroll down</span> to see your Youtube
            stats.
          </p>
          <div className="HomepageImage justify-center flex">
            <img
              src={process.env.PUBLIC_URL + "images/Arrows.png"}
              alt="img"
              style={{ width: 130, marginTop: 15 }}
            />
          </div>
        </>
      )}{" "}
    </>
  );
};
export default Radium(HomepageTop);
