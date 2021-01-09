import React from "react";
import { Link } from "react-router-dom";
const HomepageTop = ({ sample }) => {
  return (
    <>
      {sample ? (
        <>
          <h1 className="h1_monitor">Monitor your Youtube usage</h1>
          <p className="subtitle">
            It’s easy to lose track of how much time you spend watching videos
            online.
          </p>
          <Link to={{ pathname: "/upload" }}>
            <div className="calculatebtn_container">
              <div
                className="calculate_top"
                key="calculate_top"
                style={{
                  ":hover": {
                    transform: `translate(${2}px, ${-2}px)`,
                  },
                }}
              >
                Get started
              </div>
              <div className="calculate_bottom">Calculate</div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <p className="Paragraph">
            <span style={{ color: "white" }}>Scroll down</span> to see your
            Youtube stats.
          </p>
          <div className="BreakdownImageContainer">
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
export default HomepageTop;
