import React, { useState, useEffect, Component } from "react";
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
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import RenderChart from "./components/renderchart";
import Intro from "./components/intro";
import ScrollspyComponent from "./components/scrollspy";
import HomepageTop from "./components/homepageTop";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Button } from "antd";
// const springProps = useSpring({
//   to: [{ opacity: 1 }],
//   from: { opacity: 0 },
// });

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progress: 0,
      reportData: this.props.sample ? constants.TestData : null,
    };
  }
  componentDidMount() {
    if (this.props.json && this.props.json.length > 0) {
      this.processReport();
    }
  }
  setProgress = (value) => {
    this.setState((prevState) => {
      return { ...prevState, progress: value };
    });
  };

  processReport = async () => {
    this.setState((prevState) => {
      return { ...prevState, isLoading: true };
    });
    let response = await GenerateCompleteReportData(
      this.props.json,
      this.setProgress
    );
    if (response) {
      this.setState((prevState) => {
        return { ...prevState, reportData: response, isLoading: false };
      });
    }
  };

  render() {
    return (
      <div className="full-width full-height">
        {!this.state.isLoading && this.state.reportData ? (
          <div className="Content">
            <Menu />
            <div className="HomepageTop flex justify-center column align-center">
              <HomepageTop sample={this.props.sample} />
            </div>
            <Breakdown sample={this.props.sample} />
            <Intro sample={this.props.sample} />
            {/* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {(props) => {
                return (
                  this.props.sample && (
                    <h2 className="BigText white text-center" style={props}>
                      But now you can.
                    </h2>
                  )
                );
              }}
            </Spring> */}
            <h2 className="BigText white text-center">But now you can.</h2>
            <div className="full-width flex row">
              <ScrollspyComponent direction={"vertical"} />
              {this.props.sample ? (
                <RenderChart reportData={this.state.reportData} />
              ) : (
                <ReactToPrint content={() => this.componentRef}>
                  <PrintContextConsumer>
                    {({ handlePrint }) => {
                      return (
                        <div>
                          <RenderChart
                            reportData={this.state.reportData}
                            ref={(el) => (this.componentRef = el)}
                          />
                          <div
                            className="calculate-btn-container flex column print-button"
                            onClick={handlePrint}
                          >
                            <div
                              className="calculate-btn calculate-btn-top"
                              key="calculate-btn-top-print"
                            >
                              Print Report
                            </div>
                            <div className="calculate-btn calculate-btn-bottom">
                              Calculate
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </PrintContextConsumer>
                </ReactToPrint>
              )}
            </div>
            {this.props.sample ? (
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
            <p
              className="white text-center"
              style={{ margin: "15px 0px 5px 0px" }}
            >
              watchtime.io © 2021
            </p>
          </div>
        ) : (
          <Loading progress={this.state.progress} />
        )}
      </div>
    );
  }
}

export default Radium(Report);
