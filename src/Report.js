import React, { useState, useEffect } from "react";
import _ from "lodash";
import * as constants from "./constants";
import Radium from "radium";
import Resources from "./components/resources";
import Breakdown from "./components/breakdown";
import * as functions from "./functions/report";
import Github from "./components/github";
import GenerateCompleteReportData from "./functions/report";
import ProgressBar from "./components/progress";
import { Link } from "react-router-dom";
import Menu from "./components/menu";
import "animate.css/animate.min.css";
import { useSpring, animated } from "react-spring";
import { Spring, config } from "react-spring/renderprops";
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
  const props = useSpring({
    config: { duration: 10000 },
    opacity: 1,
    from: { opacity: 0 },
  });

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
    <div className="App">
      {reportData ? (
        <div className="Content">
          <Menu />
          <div className="HomepageSection column_center">
            <HomepageTop sample={sample} />
          </div>
          <Breakdown sample={sample} />
          <Intro sample={sample} />
          <VisibilitySensor>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 1 : 0 }}>
                {({ opacity }) =>
                  sample && (
                    <h2 className="BigText" style={{ opacity }}>
                      But now you can.
                    </h2>
                  )
                }
              </Spring>
            )}
          </VisibilitySensor>

          <div className="ReportContainer">
            <ScrollspyComponent direction={"vertical"} />
            <RenderChart reportData={reportData} />
          </div>

          {sample && <Github />}
          {sample && <Resources />}
          
          <Link to={{ pathname: "/manifesto" }}>
            <h1
              className="manifesto_text"
              key="manifesto"
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
          <p style={{ color: "white", textAlign: "center" }}>
            watchtime.tv © 2021
          </p>
        </div>
      ) : (
        <ProgressBar progress={progress} />
      )}
    </div>
  );
};

export default Radium(Report);
