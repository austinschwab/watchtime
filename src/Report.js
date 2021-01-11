import React, { useState, useEffect } from "react";
import * as constants from "./constants";
import Radium from "radium";
import Resources from "./components/resources";
import Breakdown from "./components/breakdown";
import Github from "./components/github";
import GenerateCompleteReportData from "./functions/report";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Menu from "./components/menu";
import "animate.css/animate.min.css";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import RenderChart from "./components/renderchart";
import Intro from "./components/intro";
import ScrollspyComponent from "./components/scrollspy";
import HomepageTop from "./components/homepageTop";

const Report = ({ json, navigation, sample }) => {
  const [reportData, setReportData] = useState(
    sample ? constants.TestData : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (json && json.length > 0) {
      processReport();
    }
  }, [json]);
  const processReport = async () => {
    setIsLoading(true);
    let response = await GenerateCompleteReportData(json, setProgress);
    if (response) {
      setReportData(response);
    }
    setIsLoading(false);
  };

  return (
    <div className="full-width full-height">
      {!isLoading && reportData ? (
        <div className="Content">
          <Menu />
          <div className="HomepageTop flex justify-center column align-center">
            <HomepageTop sample={sample} />
          </div>
          <Breakdown sample={sample} />
          <Intro sample={sample} />
          <VisibilitySensor>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 1 : 0 }}>
                {({ opacity }) =>
                  sample && (
                    <h2
                      className="BigText white text-center"
                      style={{ opacity }}
                    >
                      But now you can.
                    </h2>
                  )
                }
              </Spring>
            )}
          </VisibilitySensor>

          <div className="full-width flex row">
            <ScrollspyComponent direction={"vertical"} />
            <RenderChart reportData={reportData} />
          </div>

          {sample ? (
            <>
              <Github />
            </>
          ) : (
            <Resources />
          )}

          <Link to={{ pathname: "/manifesto" }}>
            <h1
              className="manifesto_text grey text-center"
              style={{
                ":hover": {
                  color: "white",
                },
              }}
            >
              Read our manifesto
            </h1>
          </Link>
          <ScrollspyComponent direction={"horizontal"} />
          <p className="white text-center">watchtime.tv © 2021</p>
        </div>
      ) : (
        <Loading progress={progress} />
      )}
    </div>
  );
};

export default Radium(Report);
