import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Button, Row, Col, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as constants from "./constants";
import Chart from "./components/chart";
import TableComponent from "./components/table";
import Radium from "radium";
import ScrollIntoView from "react-scroll-into-view";
import * as functions from "./functions/report";
import Scrollspy from "react-scrollspy";
import GenerateCompleteReportData from "./functions/report";
import ProgressBar from "./components/progress";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import Menu from "./components/menu";
import "animate.css/animate.min.css";

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
    let jsonData = _.cloneDeep(json);
    let response = await GenerateCompleteReportData(jsonData, setProgress);
    if (response) {
      setReportData(response);
    }
    setIsLoading(false);
  };

  const mapCategories = () => {
    return constants.Categories.map((item, index) => (
      <div
        key={index}
        className="categoryBox"
        style={{
          ":hover": {
            border: "solid",
            borderColor: item.color,
            borderWidth: "1px",
          },
        }}
      >
        <ScrollIntoView
          selector={`#chart${index}`}
          smooth
          style={{
            // hover effect using Radium
            width: "100%",
            height: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              fontWeight: 20,
              backgroundColor: item.color,
              borderRadius: 20,
              marginRight: 10,
            }}
          ></div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 550,
              color: "#b4b4b4",
            }}
          >
            {item.name}
          </span>
        </ScrollIntoView>
      </div>
    ));
  };

  //finish chart items and rendercharts styles

  const renderCharts = () => {
    let chartItems = [
      {
        heading: (
          <>
            <p className="Paragraph">
              {" "}
              Since you watched your first Youtube video on{" "}
              <span style={{ color: "white" }}>
                {reportData.firstVideoWatchedOn}
              </span>
              , you've watched{" "}
              <span style={{ color: "white" }}>
                {reportData.numberOfVideosWatched} videos.
              </span>
            </p>
            <div style={{ height: 20 }} />
            <p className="Paragraph">
              That's a total of{" "}
              <span style={{ color: "white" }}>
                {reportData.totalHoursWatched.toFixed(1)}
              </span>{" "}
              hours in the past{" "}
              <span style={{ color: "white" }}>
                {reportData.daysSinceFirstVideo}
              </span>{" "}
              days.
            </p>
          </>
        ),
        subtitle: null,
        component: null,
      },
      {
        heading: (
          <p className="Paragraph">
            You watch Youtube the most on{" "}
            <span style={{ color: "white" }}>
              {
                reportData.averageWeekChart.labels[
                  reportData.averageWeekChart.data.indexOf(
                    Math.max(...reportData.averageWeekChart.data)
                  )
                ]
              }
              's
            </span>
          </p>
        ),
        subtitle: (
          <div className="Subtitle">
            <p
              style={{
                color: "#9d9d9d",
                textAlign: "center",
                width: "100%",
              }}
            >
              {" "}
              Your daily average is{" "}
              <span style={{ color: "white" }}>
                {(
                  reportData.averageWeekChart.data.reduce((a, b) => a + b) /
                  reportData.averageWeekChart.data.length
                ).toFixed(1)}
              </span>{" "}
            </p>
          </div>
        ),
        component: (
          <Chart
            key="averageWeek"
            type="bar"
            data={reportData.averageWeekChart.data}
            labels={reportData.averageWeekChart.labels}
            id="averageWeek"
            title="Hours per Day"
          />
        ),
      },
      {
        heading: (
          <p className="Paragraph">
            You prefer watching videos during the{" "}
            <span style={{ color: "white" }}>
              {reportData.averageTimesText.timeOfDay}
            </span>
          </p>
        ),
        subtitle: (
          <div className="Subtitle">
            {reportData.averageTimesText.timeOfDayPlural}'s make up{" "}
            <span
              style={{
                borderBottom: "1px solid #c51818",
                display: "inline-block",
                color: "white",
              }}
            >
              {reportData.averageTimesText.percentage}%{" "}
            </span>{" "}
            of your daily Youtube usage.
          </div>
        ),
        component: (
          <Chart
            key="averageTimes"
            type="bar"
            data={reportData.averageTimesChart.data}
            labels={reportData.averageTimesChart.labels}
            id="averageTimes"
            title="Minutes per hour"
          />
        ),
      },
      {
        heading: (
          <p className="Paragraph">
            Here’s a breakdown of your{" "}
            <span style={{ color: "white" }}>historical usage</span>
          </p>
        ),
        subtitle: (
          <div className="Subtitle">
            Your top month was{" "}
            <span
              style={{
                borderBottom: "1px solid #10ccf5",
                display: "inline-block",
                paddingBottom: 1,
                color: "white",
              }}
            >
              {reportData.historicalText.label}
            </span>
            . You watched{" "}
            <span
              style={{
                borderBottom: "1px solid #10ccf5",
                display: "inline-block",
                paddingBottom: 1,
                color: "white",
              }}
            >
              {reportData.historicalText.hour}
            </span>{" "}
            hours.
          </div>
        ),
        component: (
          <Chart
            key="historicalUsage"
            type="line"
            data={reportData.historicalChart.data}
            labels={reportData.historicalChart.labels}
            id="historicalUsage"
            title="Hours per month"
            // xAxesType="time"
          />
        ),
      },
      {
        heading: (
          <p className="Paragraph">
            {" "}
            <span style={{ color: "white" }}> Most watched</span> channels
          </p>
        ),
        subtitle: (
          <div className="Subtitle" style={{ width: "100%" }}>
            Across your top 10 channels, you've watched{" "}
            <span
              style={{
                borderBottom: "1px solid #f0f510",
                display: "inline-block",
                paddingBottom: 1,
                color: "white",
              }}
            >
              {reportData.tableText.hours} hours
            </span>
            . This makes up for{" "}
            <span
              style={{
                borderBottom: "1px solid #f0f510",
                display: "inline-block",
                paddingBottom: 1,
                color: "white",
              }}
            >
              {reportData.tableText.percentage}%
            </span>{" "}
            of your total watch time.
          </div>
        ),
        component: <TableComponent data={reportData.channelTable} />,
      },
      {
        heading: (
          <p className="Paragraph">See which categories you watch the most.</p>
        ),
        subtitle: (
          <div className="Subtitle">
            <p></p>
          </div>
        ),
        component: (
          <Chart
            key="categoryChart"
            type="doughnut"
            data={reportData.categoryChart.data}
            labels={reportData.categoryChart.labels}
            id="categoryChart"
            title=""
            // xAxesType="time"
          />
        ),
      },
    ];
    return (
      <div className="StatsContainer">
        {chartItems.map((item, index) => {
          return (
            <div
              key={index}
              id={`chart${index}`}
              style={{
                marginBottom: 100,
                paddingTop: 75,
              }}
            >
              <div
                className="categoryBox"
                style={{ margin: "auto", marginBottom: 50 }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: constants.Categories[index].color,
                    borderRadius: 20,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 550,
                    color: "#b4b4b4",
                    marginLeft: 12,
                  }}
                >
                  {constants.Categories[index].name}
                </span>
              </div>
              <div style={{ width: "90%", margin: "auto" }}>
                {item.heading}
                {item.subtitle}
              </div>

              {index !== 0 &&
                (index !== 4 ? (
                  <div
                    style={{
                      position: "relative",
                      width: "45vw",
                      height: "45vh",
                      minWidth: 375,
                      minHeight: 375,
                      maxWidth: 600,
                      margin: "auto",
                    }}
                  >
                    {item.component}
                  </div>
                ) : (
                  item.component
                ))}
            </div>
          );
        })}
      </div>
    );
  };
  let colorArray = ["white", "green", "red", "blue", "yellow", "purple"];

  return (
    <div className="App">
      <Menu />
      {reportData ? (
        <div className="Content">
          <div className="IntroSection">
            {sample ? (
              <div className="Hero">
                <h1 className="h1_monitor">Monitor your Youtube usage</h1>
                <p className="hero_subtitle">
                  It’s easy to lose track of how much time you spend watching
                  videos online.
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
              </div>
            ) : (
              <>
                <p className="Paragraph">
                  <span style={{ color: "white" }}>Scroll down</span> to see
                  your Youtube stats.
                </p>
                <div className="BreakdownImageContainer">
                  <img
                    src={process.env.PUBLIC_URL + "images/Arrows.png"}
                    alt="img"
                    style={{ width: 130, marginTop: 15 }}
                  />
                </div>
              </>
            )}

            <p className="BreakdownTitle">
              {sample ? "What you get" : "Data categories"}
            </p>
            <div className="BreakdownContainer">{mapCategories()}</div>
          </div>
          {sample && (
            <div className="Mini_IntroContainer">
              <p className="minitext">
                Our society is{" "}
                <span style={{ color: "white" }}>
                  addicted to digital consumption.{" "}
                </span>
                Most people spend a few hours of their day on Youtube.
                <p></p>
                <span style={{ color: "white" }}>
                  We know there is a problem.
                </span>{" "}
                But, how big is it?
                <p></p>
                We created a tool that calculates your total Youtube watchtime
                along with other key metrics. <p></p>
                <span style={{ color: "white" }}>
                  If you can’t measure it, you can’t manage it.
                </span>
              </p>
              <Link to={{ pathname: "/manifesto" }}>
                <div
                  className="read_more"
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
          {sample && <h2 className="BigText">But now you can.</h2>}
          <div className="ReportContainer">
            <Scrollspy
              className="Sidebar"
              items={[
                "chart0",
                "chart1",
                "chart2",
                "chart3",
                "chart4",
                "chart5",
              ]}
              currentClassName="is-active"
            >
              {colorArray.map((color, index) => {
                return (
                  <li className={`sidelink ${color}`}>
                    <a href={`#chart${index}`} className="sidedotAnchor">
                      <div
                        className="sidedot"
                        style={{
                          backgroundColor: constants.Categories[index].color,
                        }}
                      ></div>
                    </a>
                  </li>
                );
              })}
            </Scrollspy>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeIn"
              duration={6}
            >
              <div style={{ width: "100%" }}>{renderCharts()}</div>
            </ScrollAnimation>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {sample ? (
              <div className="Github_Container">
                <p style={{ textAlign: "center", color: "#9d9d9d" }}>
                  After processing your report, {""}
                  <span style={{ color: "white" }}>
                    we do not store any data. {""}
                  </span>
                  Our code is public and auditable.
                </p>

                <a href="https://github.com">
                  <div className="github_btn" key="github">
                    <img
                      src={process.env.PUBLIC_URL + "images/github.png"}
                      alt="img"
                      style={{ width: 24 }}
                    />
                    <span className="github_text" key="gittext">
                      Github
                    </span>
                  </div>
                </a>
              </div>
            ) : null}
          </div>

          {sample ? null : (
            <div className="Reccomendation_Section">
              <h1
                style={{
                  color: "white",
                  fontSize: 36,
                  marginBottom: 100,
                  width: "70%",
                }}
              >
                Now that you have a better sense of your usage. Here are some
                resources to help:
              </h1>
              <p style={{ fontSize: 20, color: "white" }}>
                Handpicked resources
              </p>
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
          )}
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
          <Scrollspy
            className="Sidebar"
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
            items={["chart0", "chart1", "chart2", "chart3", "chart4", "chart5"]}
            currentClassName="is-active"
          >
            {colorArray.map((color, index) => {
              return (
                <li
                  className={`sidelink ${color}`}
                  style={{
                    marginLeft: 11,
                    marginRight: 11,
                  }}
                >
                  <a href={`#chart${index}`} className="sidedotAnchor">
                    <div
                      className="sidedot"
                      style={{
                        backgroundColor: constants.Categories[index].color,
                      }}
                    ></div>
                  </a>
                </li>
              );
            })}
          </Scrollspy>
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
