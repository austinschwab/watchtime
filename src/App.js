import React, { useState, useEffect, Item } from "react";
import data from "./data/watch-history1.json";
import * as classes from "./App.css";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { Button, Row, Col, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as constants from "./constants";
import Chart from "./components/chart";
import TableComponent from "./components/table";
import Radium from "radium";
import ScrollIntoView from "react-scroll-into-view";
import * as functions from "./functions/report";
import Scrollspy from "react-scrollspy";

const key = "AIzaSyBGA1zk3BrWeWEPMOv4zI1u0-wEvByfRdo";

const App = () => {
  const [reportData, setReportData] = useState(
    constants.sampleReportData ? constants.sampleReportData : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const getTimeOfDay = () => {
    let index = reportData.averageTimesChart.data.indexOf(
      Math.max(...reportData.averageTimesChart.data)
    );
    if (index < 6) {
      return "early morning";
    }
    if (6 <= index && index < 11) {
      return "morning";
    }
    if (12 <= index && index < 16) {
      return "afternoon";
    } else {
      return "evening";
    }
  };
  const getSum = (array, isObj) => {
    let sum;
    if (isObj) {
      sum = array.reduce((a, b) => {
        return a + +b.time;
      }, 0);
    } else {
      sum = array.reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  const percentageTimeOfDay = () => {
    let index = reportData.averageTimesChart.data.indexOf(
      Math.max(...reportData.averageTimesChart.data)
    );
    let slicedData;
    if (index <= 11) {
      slicedData = reportData.averageTimesChart.data.slice(0, 12);
    }
    if (12 <= index && index < 16) {
      slicedData = reportData.averageTimesChart.data.slice(12, 17);
    } else {
      slicedData = reportData.averageTimesChart.data.slice(17, 23);
    }
    let sum = getSum(reportData.averageTimesChart.data, false);
    let durationSum = slicedData.reduce((a, b) => a + b, 0);
    let percentage = Math.round((durationSum / sum) * 100);
    return percentage;
  };

  // Request Youtube api for batched video/channel data
  const generateVideoList = async () => {
    // videoId structure = {batch: videoIdList, batchWithTimes: videoIdListWithVideoDurations}
    let videoIds = functions.getVideoIds();
    let requestData = [];
    for (let videoList of videoIds.batch) {
      await axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoList}&part=contentDetails&part=snippet&key=${key}`
        )
        .then((response) => {
          console.log("API response", response);
          if (response) {
            for (let obj of response.data.items) {
              requestData.push({
                duration: obj.contentDetails.duration,
                categoryId: obj.snippet.categoryId,
                channelTitle: obj.snippet.channelTitle,
                videoId: obj.id,
              });
            }
          }
        })
        .catch((e) => console.log(e));
    }

    if (requestData.length > 0) {
      updateVideoListWithTimes(requestData, videoIds.batchWithTimes);
      return requestData;
    } else {
      return null;
    }
  };

  // Updates video list with video duration times. This is needed because we lose the 'date/time' you watched a video on after we make
  // the youtube api request to get the video data. So we have to go back and append the 'date/time' you watch the video to the video data obj
  const updateVideoListWithTimes = (videoList, videoIdWithTime) => {
    for (let videoObj of videoList) {
      for (let videoObjWithTime of videoIdWithTime) {
        if (videoObj.videoId === videoObjWithTime.videoId) {
          videoObj.time = videoObjWithTime.time;
        }
      }
    }
  };

  // Outputs all watchtime report data fields
  const generateCompleteReportData = async () => {
    setIsLoading(true);
    let videoList = await generateVideoList();
    let firstVideoWatchedOn = moment(data[data.length - 1].time).format("L");
    let numberOfVideosWatched = data.length;
    let daysSinceFirstVideo = functions.getDaySinceFirstVideo();
    let chartData = functions.getWatchTimeChartData(videoList);

    setIsLoading(false);

    setReportData({
      firstVideoWatchedOn,
      numberOfVideosWatched,
      daysSinceFirstVideo,
      averageWeekChart: chartData.averageWeekChartData,
      averageTimesChart: chartData.averageTimesChartData,
      categoryChart: chartData.categoryChartData,
      totalHoursWatched: chartData.totalHoursWatched,
      historicalChart: chartData.historicalUsageChartData,
      channelTable: chartData.channelTableData,
    });
  };

  const selectCategory = [
    {
      name: "Total Watch Time",
      color: "#FFFFFF",
      id: Math.floor(Math.random() * 1000000),
    },
    {
      name: "Avg. Daily Usage",
      color: "#4FFFAA",
      id: Math.floor(Math.random() * 1000000),
    },
    {
      name: "Avg. Weekly Usage",
      color: "#C51818",
      id: Math.floor(Math.random() * 1000000),
    },
    {
      name: "Historical Usage",
      color: "#10CCF5",
      id: Math.floor(Math.random() * 1000000),
    },
    {
      name: "Most Watched Channels",
      color: "#F0F510",
      id: Math.floor(Math.random() * 1000000),
    },
    {
      name: "Category Breakdown",
      color: "#4A0DCD",
      id: Math.floor(Math.random() * 1000000),
    },
  ];

  const mapCategories = () => {
    return selectCategory.map((item, index) => (
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
  const chartItems = [
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
          <span style={{ color: "white" }}>{getTimeOfDay()}</span>
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
            {getTimeOfDay()[0].toUpperCase() + getTimeOfDay().slice(1)}'s make
            up {percentageTimeOfDay()}%{" "}
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
        <p className="Paragraph">Here’s a breakdown of your historical usage</p>
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
            {getSum(reportData.channelTable, true).toFixed(1)} hours
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
            {Math.round(
              (getSum(reportData.channelTable, true) /
                reportData.totalHoursWatched) *
                100
            )}
            %
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
  const renderCharts = () => {
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
                    fontWeight: 20,
                    backgroundColor: selectCategory[index].color,
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
                  {selectCategory[index].name}
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

  /* {isLoading && <LoadingOutlined style={{ fontSize: 300 }} spin />} */

  return (
    <div className="App">
      <Button type="primary" onClick={() => generateCompleteReportData()}>
        Generate Report
      </Button>

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
            Ok <span style={{ color: "white" }}>Ricky</span> We're ready.{" "}
            <span style={{ color: "white" }}>Are you Ready?</span>
          </p>
          <p className="Paragraph">
            <span style={{ color: "white" }}>Scroll down</span> to see your
            Youtube stats.
          </p>
          <div className="BreakdownImageContainer">
            <img
              src={process.env.PUBLIC_URL + "images/Arrows.png"}
              alt="img"
              style={{ width: 130 }}
            />
          </div>
          <p className="BreakdownTitle">Data categories</p>
          <div className="BreakdownContainer">{mapCategories()}</div>
        </div>
        {reportData && (
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
                        style={{ backgroundColor: selectCategory[0].color }}
                      ></div>
                    </a>
                  </li>
                  <li className="sidelink green">
                    <a href="#chart1" className="SideLinkAnchor">
                      {" "}
                      <div
                        className="sidedot"
                        style={{ backgroundColor: selectCategory[1].color }}
                      ></div>
                    </a>
                  </li>
                  <li className="sidelink red">
                    <a href="#chart2" className="SideLinkAnchor">
                      <div
                        className="sidedot"
                        style={{ backgroundColor: selectCategory[2].color }}
                      ></div>
                    </a>
                  </li>
                  <li className="sidelink blue">
                    <a href="#chart3" className="SideLinkAnchor">
                      {" "}
                      <div
                        className="sidedot"
                        style={{ backgroundColor: selectCategory[3].color }}
                      ></div>
                    </a>
                  </li>
                  <li className="sidelink  yellow">
                    <a href="#chart4" className="SideLinkAnchor">
                      {" "}
                      <div
                        className="sidedot"
                        style={{ backgroundColor: selectCategory[4].color }}
                      ></div>
                    </a>
                  </li>
                  <li className="sidelink purple">
                    <a href="#chart5" className="SideLinkAnchor">
                      {" "}
                      <div
                        className="sidedot"
                        style={{ backgroundColor: selectCategory[5].color }}
                      ></div>
                    </a>
                  </li>
                </Scrollspy>
              </Col>
              <Col span={16}> {renderCharts()}</Col>
              <Col span={4}> </Col>
            </Row>
          </div>
        )}
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
      </div>
    </div>
  );
};

export default Radium(App);
