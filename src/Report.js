import React, { useState, useEffect } from "react";
import _ from "lodash";
import * as constants from "./constants";
import Radium from "radium";
import ScrollIntoView from "react-scroll-into-view";
import * as functions from "./functions/report";
import Scrollspy from "react-scrollspy";
import GenerateCompleteReportData from "./functions/report";
import ProgressBar from "./components/progress";
import { Link } from "react-router-dom";
import Menu from "./components/menu";
import "animate.css/animate.min.css";
import { useSpring, animated } from "react-spring";
import { Spring, config } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import RenderChart from "./components/renderchart";

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
              fontSize: 18,
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

  const chartDataArray = [
    {
      heading: (
        <>
          Since you watched your first Youtube video on{" "}
          <span className="white">{reportData.firstVideoWatchedOn}</span>,
          you've watched{" "}
          <span className="white">
            {reportData.numberOfVideosWatched} videos.
          </span>
          <div className="marginMedium" />
          That's a total of{" "}
          <span style={{ color: "whit" }}>
            {reportData.totalHoursWatched.toFixed(1)}
          </span>{" "}
          hours in the past{" "}
          <span style={{ color: "white" }}>
            {reportData.daysSinceFirstVideo}
          </span>{" "}
          days.
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
      component: {
        key: "averageWeek",
        type: "bar",
        data: reportData.averageWeekChart.data,
        labels: reportData.averageWeekChart.labels,
        id: "averageWeek",
        title: "Hours per Day",
      },
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
      component: {
        key: "averageTimes",
        type: "bar",
        data: reportData.averageTimesChart.data,
        labels: reportData.averageTimesChart.labels,
        id: "averageTimes",
        title: "Minutes per hour",
      },
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
      component: {
        key: "historicalUsage",
        type: "line",
        data: reportData.historicalChart.data,
        labels: reportData.historicalChart.labels,
        id: "historicalUsage",
        title: "Hours per month",
      },
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
      component: {
        data: reportData.channelTable,
      },
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
      component: {
        key: "categoryChart",
        type: "doughnut",
        data: reportData.categoryChart.data,
        labels: reportData.categoryChart.labels,
        id: "categoryChart",
        title: "",
      },
    },
  ];

  let colorArray = ["white", "green", "red", "blue", "yellow", "purple"];

  return (
    <div className="App">
      {reportData ? (
        <div className="Content">
          <Menu />
          <div className="HomepageSection column_center">
            {sample ? (
              <>
                <h1 className="h1_monitor">Monitor your Youtube usage</h1>
                <p className="subtitle">
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
              </>
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
            <div className="BreakdownContainer column_center">
              {mapCategories()}
            </div>
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

            <div style={{ width: "100%" }}>
              {chartDataArray.map((item, index) => {
                return <RenderChart item={item} index={index} />;
              })}
            </div>
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
