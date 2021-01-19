import React from "react";
import { Link } from "react-router-dom";
import Radium from "radium";

const IntroContainer = ({ sample }) => {
  return (
    <div style={{ marginTop: 80 }}>
      {sample && (
        <div className="IntroContainer flex column margin-auto">
          <p className="IntroText">
            Our society is{" "}
            <span className="white">addicted to digital consumption. </span>
            Most people spend a few hours of their day on Youtube.
          </p>
          <p className="IntroText">
            <span className="white">We know there is a problem.</span> But, how
            big is it?
          </p>
          <p className="IntroText">
            We created a tool that calculates your total Youtube watchtime along
            with other key metrics.
          </p>
          <p className="IntroText">
            <span className="white">
              If you can’t measure it, you can’t manage it.
            </span>
          </p>

          <Link to={{ pathname: "/manifesto" }}>
            <div
              className="read_more"
              key="read_more"
              style={{
                ":hover": {
                  color: "#c51818",
                  borderColor: "#c51818",
                },
              }}
            >
              Read more
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Radium(IntroContainer);
