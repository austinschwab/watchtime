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

const key = "AIzaSyBGA1zk3BrWeWEPMOv4zI1u0-wEvByfRdo";

const App = () => {
  const [reportData, setReportData] = useState(
    constants.sampleReportData ? constants.sampleReportData : null
  );
  const [isLoading, setIsLoading] = useState(false);

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

  const [reccomendations, setRecomendations] = useState([
    {
      name: "/r/Nosurf",
      type: "Community",
      image: (
        <img
          src={process.env.PUBLIC_URL + "images/r.png"}
          alt="img"
          width="40px"
        />
      ),
    },
    {
      name: "Humane Tech",
      type: "Community",
      image: (
        <img
          src={process.env.PUBLIC_URL + "images/htech.png"}
          alt="img"
          width="64px"
          color="white"
          invert="100%"
        />
      ),
    },
    {
      name: "The Shallows",
      type: "Book",
      image: (
        <img
          src={process.env.PUBLIC_URL + "images/TheShallows.jpg"}
          alt="img"
          width="56px"
          className="rec_image"
        />
      ),
    },
    {
      name: "Freedom App",
      type: "Tool",
      image: (
        <img
          src={process.env.PUBLIC_URL + "images/FreedomApp.png"}
          alt="img"
          width="40px"
        />
      ),
    },
    {
      name: "Rescue Time",
      type: "Tool",
      image: (
        <img
          src={process.env.PUBLIC_URL + "images/RescueTime.png"}
          alt="img"
          width="40px"
        />
      ),
    },
    {
      name: "The Social Dilemna",
      type: "Film",
      image: (
        <img
          src={process.env.PUBLIC_URL + "images/TheSocialDilemna.jpg"}
          alt="img"
          width="56px"
        />
      ),
    },
  ]);

  const [selectCategory, setselectCategory] = useState([
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
  ]);

  const mapCategories = () => {
    return selectCategory.map((item, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#1C1C1C",
          margin: 10,
          borderRadius: 12,
          padding: 20,
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
              marginRight: 12,
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
      heading: "You watch Youtube the most on Satrudays",
      subtitle: " Your daily average is 6.5 hours",
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
  ];
  const renderCharts = () => {
    return (
      <div style={{ width: "50%", margin: "auto" }}>
        {chartItems.map((item, index) => {
          return (
            <div key={index} id={`chart${index}`}>
              <h2 style={{ color: "white" }}>{item.heading}</h2>
              <p>{item.subtitle}</p>
              <div>{item.component}</div>
            </div>
          );
        })}
      </div>
    );
  };

  console.log(reportData);
  return (
    <div className="App">
      <div className="Menu">
        <img
          src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
          alt="img"
          style={{ width: 200, padding: 40 }}
        />
      </div>
      {/* <BarChart data={data} /> */}
      <Button type="primary" onClick={() => generateCompleteReportData()}>
        Generate Report
      </Button>
      {isLoading && <LoadingOutlined style={{ fontSize: 300 }} spin />}
      {reportData && (
        <div className="Body">
          <p>We've made it.</p>

          <p>Scroll down to see your Youtube stats.</p>
          <img
            src={process.env.PUBLIC_URL + "images/Arrows.png"}
            alt="img"
            style={{ width: 131 }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              direction: "horizontal",
              alignCenter: "center",
              justifySelf: "start",
              maxWidth: 862,
              margin: "2%",
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: "Semi-bold",
              }}
            >
              Data categories
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {mapCategories()}
            </div>
          </div>

          <div className="Youtube_Stats_Section">
            <div className="Sidebar">
              {selectCategory.map((item, index) => (
                <div
                  key={index}
                  className="sidelink"
                  style={
                    {
                      // ":hover": {
                      //   border: "solid",
                      //   borderColor: item.color,
                      //   borderWidth: "1px",
                      // },
                    }
                  }
                >
                  <div
                    className="sidedot"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ width: "50%", margin: "auto" }}>
              <p
                style={{
                  color: "#9D9D9D",
                  fontSize: "48",
                  fontWeight: "Semi-bold",
                }}
              >
                Since you watched your first Youtube video on{" "}
                <span style={{ color: "white" }}>
                  {reportData.firstVideoWatchedOn}
                </span>
                , you've watched{" "}
                <span style={{ color: "white" }}>
                  {reportData.numberOfVideosWatched} videos.
                </span>
              </p>
              <p />
              <p
                style={{
                  color: "#9D9D9D",
                  fontSize: "48",
                  fontWeight: "Semi-bold",
                }}
              >
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
            </div>

            <div className="Stats">
              <div className="Stats_Container">
                {/* Insert Chart With average week */}
                <div className="Stats_Container" id="chartOne">
                  <p
                    style={{
                      fontWeight: "Medium",
                      color: "#9d9d9d",
                      fontSize: 48,
                    }}
                  >
                    You watch Youtube the most on{" "}
                    <span style={{ color: "white" }}>Saturdays</span>.
                  </p>
                  <p
                    style={{
                      fontWeight: "Semi-bold",
                      color: "#9d9d9d",
                      fontSize: 20,
                    }}
                  >
                    Your daily average is{" "}
                    <span
                      style={{
                        borderBottom: "1px solid #4fffaa",
                        display: "inline-block",
                        paddingBottom: 1,
                        color: "white",
                      }}
                    >
                      6.5 hours.
                    </span>
                  </p>

                  <Chart
                    key="averageWeek"
                    type="bar"
                    data={reportData.averageWeekChart.data}
                    labels={reportData.averageWeekChart.labels}
                    id="averageWeek"
                    title="Hours per Day"
                  />
                </div>

                {/* Insert Chart With time on youtube */}
                <div className="Stats_Container">
                  <div>
                    <p
                      style={{
                        fontWeight: "Medium",
                        color: "#9d9d9d",
                        fontSize: 48,
                      }}
                    >
                      You prefer watching videos during the
                    </p>
                    <p
                      style={{
                        fontWeight: "Medium",
                        color: "#9d9d9d",
                        fontSize: 20,
                      }}
                    >
                      make up 51% of your daily Youtube usage.
                    </p>
                  </div>
                  <Chart
                    key="averageTimes"
                    type="bar"
                    data={reportData.averageTimesChart.data}
                    labels={reportData.averageTimesChart.labels}
                    id="averageTimes"
                    title="Minutes per hour"
                  />
                </div>
                {/* Insert Chart With historical breakdown */}
                <div className="Stats_Container">
                  <p
                    style={{
                      fontWeight: "Medium",
                      color: "#9d9d9d",
                      fontSize: 48,
                    }}
                  >
                    Here’s a breakdown of your{" "}
                    <p style={{ color: "white" }}>historical usage.</p>
                  </p>
                  <p
                    style={{
                      fontWeight: "Medium",
                      color: "#9d9d9d",
                      fontSize: 20,
                    }}
                  >
                    Your top month was June 2020. You watched 160 hours.
                  </p>

                  <Chart
                    key="historicalUsage"
                    type="line"
                    data={reportData.historicalChart.data}
                    labels={reportData.historicalChart.labels}
                    id="historicalUsage"
                    title="Hours per month"
                    // xAxesType="time"
                  />
                </div>
                {/* Insert Chart With most watched channels */}

                <p
                  style={{
                    fontWeight: "Medium",
                    color: "#9d9d9d",
                    fontSize: 48,
                  }}
                >
                  Most watched <p style={{ color: "white" }}>channels</p>
                </p>
                <p
                  style={{
                    fontWeight: "Medium",
                    color: "#9d9d9d",
                    fontSize: 20,
                  }}
                >
                  Across your top 10 channels, you've watched 555 hours. This
                  makes up for 68% of your total watch time.
                </p>

                <TableComponent data={reportData.channelTable} />
              </div>
              {/* Insert Chart With most categories breakdown */}

              <Chart
                key="categoryChart"
                type="pie"
                data={reportData.categoryChart.data}
                labels={reportData.categoryChart.labels}
                id="categoryChart"
                title=""
                // xAxesType="time"
              />
            </div>
          </div>
          <div className="Reccomendation_Section">
            <h1 style={{ color: "white", fontSize: 38, marginBottom: 160 }}>
              Now that you have a better sense of your usage. Here are some
              resources to help :D
            </h1>
            <p style={{ fontSize: 20 }}>Handpicked resources</p>
            <div className="Reccomendation_Container">
              {reccomendations.map((item, index) => (
                <div className="reccomendation_item" key={index}>
                  {item.image}
                  <div style={{ marginLeft: 16 }}>
                    <p style={{ fontSize: 16 }}>{item.name}</p>
                    <p style={{ fontSize: 16 }}>{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radium(App);
