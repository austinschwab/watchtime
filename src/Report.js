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
const Report = ({ json }) => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (json && json.length > 0) {
      processReport();
    }
  }, [json]);
  console.log(progress);
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
              width: 16,
              height: 16,
              fontWeight: 20,
              backgroundColor: item.color,
              borderRadius: 20,
              marginRight: 10,
            }}
          ></div>
          <span
            style={{
              fontSize: 18,
              fontHeight: 16,
              fontWeight: "Medium",
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
                {reportData.totalHoursWatched}
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
          <p
            style={{
              fontSize: 14,
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
            <span
              style={{
                borderBottom: "1px solid #c51818",
                display: "inline-block",
                paddingBottom: 1,
                color: "white",
              }}
            >
              {reportData.averageTimesText.timeOfDayPlural}'s make up{" "}
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
            Here’s a breakdown of your historical usage
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
              June 2020
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
              {" "}
              160
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
        heading: <p className="Paragraph">Most watched channels</p>,
        subtitle: (
          <div className="Subtitle">
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
        subtitle: <p></p>,
        component: (
          <Chart
            key="categoryChart"
            type="pie"
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
              <div className="categoryBox">
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: constants.Categories[index].color,
                    borderRadius: 20,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: 18,
                    fontHeight: 16,
                    fontWeight: "Medium",
                    color: "#b4b4b4",
                    marginLeft: 12,
                  }}
                >
                  {constants.Categories[index].name}
                </span>
              </div>
              {item.heading}
              {item.subtitle}
              <div
                style={{
                  position: "relative",
                  width: "40vw",
                  height: "40vh",
                  minWidth: 300,
                  minHeight: 300,
                }}
              >
                {item.component}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="App">
      {/* <Button type="primary" onClick={() => generateCompleteReportData()}>
        Generate Report
      </Button> */}
      {reportData ? (
        <>
          <div className="Content">
            <div className="Menu">
              <img
                src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
                alt="img"
                style={{ width: 200, padding: 40 }}
              />
            </div>
            <div className="IntroSection">
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
              <p className="BreakdownTitle">Data categories</p>
              <div className="BreakdownContainer">{mapCategories()}</div>
            </div>
            <div className="ReportContainer">
              <Row>
                <Col span={4}>
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
                    <li className="sidelink white">
                      <a href="#chart0" className="SideLinkAnchor">
                        <div
                          className="sidedot"
                          style={{
                            backgroundColor: constants.Categories[0].color,
                          }}
                        ></div>
                      </a>
                    </li>
                    <li className="sidelink green">
                      <a href="#chart1" className="SideLinkAnchor">
                        {" "}
                        <div
                          className="sidedot"
                          style={{
                            backgroundColor: constants.Categories[1].color,
                          }}
                        ></div>
                      </a>
                    </li>
                    <li className="sidelink red">
                      <a href="#chart2" className="SideLinkAnchor">
                        <div
                          className="sidedot"
                          style={{
                            backgroundColor: constants.Categories[2].color,
                          }}
                        ></div>
                      </a>
                    </li>
                    <li className="sidelink blue">
                      <a href="#chart3" className="SideLinkAnchor">
                        {" "}
                        <div
                          className="sidedot"
                          style={{
                            backgroundColor: constants.Categories[3].color,
                          }}
                        ></div>
                      </a>
                    </li>
                    <li className="sidelink  yellow">
                      <a href="#chart4" className="SideLinkAnchor">
                        {" "}
                        <div
                          className="sidedot"
                          style={{
                            backgroundColor: constants.Categories[4].color,
                          }}
                        ></div>
                      </a>
                    </li>
                    <li className="sidelink purple">
                      <a href="#chart5" className="SideLinkAnchor">
                        {" "}
                        <div
                          className="sidedot"
                          style={{
                            backgroundColor: constants.Categories[5].color,
                          }}
                        ></div>
                      </a>
                    </li>
                  </Scrollspy>
                </Col>
                <Col span={16}> {renderCharts()}</Col>
                <Col span={4}> </Col>
              </Row>
            </div>
          </div>
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
              resources to help :D
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
          </div>{" "}
        </>
      ) : (
        <ProgressBar progress={progress} />
      )}
    </div>
  );
};

export default Report;