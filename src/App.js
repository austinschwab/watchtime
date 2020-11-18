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

const key = "AIzaSyBGA1zk3BrWeWEPMOv4zI1u0-wEvByfRdo";

const App = () => {
  const [reportData, setReportData] = useState(
    constants.sampleReportData ? constants.sampleReportData : null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to convert Youtube duration into seconds
  const convertISO8601ToSeconds = (input) => {
    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0,
      minutes = 0,
      seconds = 0,
      totalseconds;

    if (reptms.test(input)) {
      var matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalseconds = hours * 3600 + minutes * 60 + seconds;
    }

    return totalseconds;
  };

  // Extract video Ids from watch.json
  const getVideoIds = () => {
    let videoIdWithTime = [];
    let totalIdBatch = [];
    let idBatch = [];
    for (let i = 0; i < 250; i++) {
      if (
        data[i].titleUrl.indexOf("https://www.youtube.com/watch?v\u003d") !== -1
      ) {
        let id = data[i].titleUrl.replace(
          "https://www.youtube.com/watch?v\u003d",
          ""
        );
        videoIdWithTime.push({ videoId: id, time: data[i].time });
        if (idBatch.length < 50) {
          idBatch.push(id);
        } else {
          totalIdBatch.push(idBatch);
          idBatch = [];
          idBatch.push(
            data[i].titleUrl.replace(
              "https://www.youtube.com/watch?v\u003d",
              ""
            )
          );
        }
      }
    }
    if (idBatch.length > 0) {
      totalIdBatch.push(idBatch);
      idBatch = [];
    }
    return { batch: totalIdBatch, batchWithTimes: videoIdWithTime };
  };

  // Request Youtube api for batched video/channel data
  const generateVideoList = async () => {
    // videoId structure = {batch: videoIdList, batchWithTimes: videoIdListWithVideoDurations}
    let videoIds = getVideoIds();
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

  // Obtains several watchtime data requirments. Data includes: channel names with number of videos and time spent on channel, categories and number of
  // videos per category, the days of the week with the amount of videos watched on that day per full watch.json history, hours of the day with number of
  // videos watched during that hour for entire watch.json history
  const getVideoListRelevantData = (videoList) => {
    let channelList = [];
    let channelsWithVideosAndTime = {};

    let categoryList = [];
    let categoriesWithCount = {};

    let totalSecondsWatched = 0;

    let daysWithCount = {
      0: { count: 0, time: 0 },
      1: { count: 0, time: 0 },
      2: { count: 0, time: 0 },
      3: { count: 0, time: 0 },
      4: { count: 0, time: 0 },
      5: { count: 0, time: 0 },
      6: { count: 0, time: 0 },
    };

    let timeOfDayWithCount = {
      0: { count: 0, time: 0 },
      1: { count: 0, time: 0 },
      2: { count: 0, time: 0 },
      3: { count: 0, time: 0 },
      4: { count: 0, time: 0 },
      5: { count: 0, time: 0 },
      6: { count: 0, time: 0 },
      7: { count: 0, time: 0 },
      8: { count: 0, time: 0 },
      9: { count: 0, time: 0 },
      10: { count: 0, time: 0 },
      11: { count: 0, time: 0 },
      12: { count: 0, time: 0 },
      13: { count: 0, time: 0 },
      14: { count: 0, time: 0 },
      15: { count: 0, time: 0 },
      16: { count: 0, time: 0 },
      17: { count: 0, time: 0 },
      18: { count: 0, time: 0 },
      19: { count: 0, time: 0 },
      20: { count: 0, time: 0 },
      21: { count: 0, time: 0 },
      22: { count: 0, time: 0 },
      23: { count: 0, time: 0 },
    };

    let dateLabels = [];
    let dateOverTimeData = {};

    for (let videoObj of videoList) {
      const date = new Date(videoObj.time);
      const hour = date.getHours();
      const duration = convertISO8601ToSeconds(videoObj.duration);
      const day = date.getDay();

      if (channelList.indexOf(videoObj.channelTitle) !== -1) {
        channelsWithVideosAndTime[videoObj.channelTitle].count += 1;
        channelsWithVideosAndTime[videoObj.channelTitle].time += duration;
      } else {
        channelList.push(videoObj.channelTitle);
        channelsWithVideosAndTime[videoObj.channelTitle] = {
          count: 1,
          time: duration,
          title: videoObj.channelTitle,
        };
      }

      if (dateLabels.indexOf(moment(date).format("l")) !== -1) {
        dateOverTimeData[moment(date).format("l")].y += duration;
      } else {
        dateLabels.push(moment(date).format("l"));
        dateOverTimeData[moment(date).format("l")] = {
          y: duration,
          t: moment(date).format("l"),
        };
      }

      if (categoryList.indexOf(videoObj.categoryId) !== -1) {
        categoriesWithCount[
          constants.YoutubeCategories[videoObj.categoryId]
        ].value += 1;
      } else {
        categoryList.push(videoObj.categoryId);
        categoriesWithCount[
          constants.YoutubeCategories[videoObj.categoryId]
        ] = { value: 1, id: constants.YoutubeCategories[videoObj.categoryId] };
      }

      timeOfDayWithCount[hour].count += 1;
      timeOfDayWithCount[hour].time += duration;

      daysWithCount[day].time += duration;
      daysWithCount[day].count += 1;

      totalSecondsWatched += duration;
    }

    let totalHoursWatched = Math.floor(totalSecondsWatched / 3600);
    let averageWeekLabels = [];
    let averageWeekData = [];

    let averageTimesLabels = [];
    let averageTimesData = [];

    for (let index in daysWithCount) {
      let day = constants.daysOfWeek[index];
      averageWeekLabels.push(day);

      if (daysWithCount[index].count > 0) {
        averageWeekData.push(
          daysWithCount[index].count /
            Math.floor(daysWithCount[index].time / 3600)
        );
      } else {
        averageWeekData.push(0);
      }
    }

    for (let index in timeOfDayWithCount) {
      let hour = constants.hourFormat[index].value;
      averageTimesLabels.push(hour);
      if (timeOfDayWithCount[index].count > 0) {
        averageTimesData.push(
          Math.floor(timeOfDayWithCount[index].time / 60) /
            timeOfDayWithCount[index].count
        );
      } else {
        averageTimesData.push(0);
      }
    }

    let averageWeek = { labels: averageWeekLabels, data: averageWeekData };
    let averageTimes = { labels: averageTimesLabels, data: averageTimesData };

    let historicalData = Object.values(dateOverTimeData).sort(
      (a, b) => new Date(b.t) - new Date(a.t)
    );
    let adjustedHistoricalDataTimes = historicalData.map(
      (data) => data.y / 3600
    );
    dateLabels.sort((a, b) => new Date(b) - new Date(a));

    let historicalUsage = {
      labels: dateLabels,
      data: adjustedHistoricalDataTimes,
    };

    let categoryLabels = [];
    let categoryData = [];

    for (let obj of Object.values(categoriesWithCount)) {
      categoryLabels.push(obj.id);
      categoryData.push(obj.value);
    }

    let cateogryChartData = { labels: categoryLabels, data: categoryData };
    let channelTableData = Object.values(channelsWithVideosAndTime)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    let updatedChannelTimes = channelTableData.map((obj, index) => {
      return {
        time: (obj.time / 3600).toFixed(1),
        title: obj.title,
        count: obj.count,
        key: index,
      };
    });

    return {
      averageTimes,
      averageWeek,
      cateogryChartData,
      totalHoursWatched,
      historicalUsage,
      updatedChannelTimes,
    };
  };

  // Get Day since first video
  const getDaySinceFirstVideo = () => {
    let Difference_In_Time =
      new Date().getTime() - new Date(data[data.length - 1].time).getTime();

    let Difference_In_Days = Math.floor(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    return Difference_In_Days;
  };

  // Outputs all watchtime report data fields
  const generateCompleteReportData = async () => {
    setIsLoading(true);
    let videoList = await generateVideoList();
    let firstVideoWatchedOn = moment(data[data.length - 1].time).format("L");
    let numberOfVideosWatched = data.length;
    let daysSinceFirstVideo = getDaySinceFirstVideo();
    let additionalWatchTimeData = getVideoListRelevantData(videoList);
    setIsLoading(false);

    setReportData({
      firstVideoWatchedOn,
      numberOfVideosWatched,
      daysSinceFirstVideo,
      additionalWatchTimeData,
    });
  };

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
      name: "Most watched channels",
      color: "#F0F510",
      id: Math.floor(Math.random() * 1000000),
    },
    {
      name: "More...",
      color: "#4FFFAA",
      id: Math.floor(Math.random() * 1000000),
    },
  ]);

  const scroll = () => {};

  const mapCategories = () => {
    return selectCategory.map((item, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#1C1C1C",
          display: "inline-block",
          flexDirection: "row",
          fontSize: 18,
          fontHeight: 16,
          fontWeight: "Medium",
          margin: 10,
          justifyContent: "space-evenly",
          justifySelf: "",
          borderRadius: 12,
          padding: 20,
          color: "#b4b4b4",
          // hover effect using Radium
          ":hover": {
            border: "solid",
            borderColor: item.color,
            borderWidth: "1px",
          },
        }}
      >
        <ScrollIntoView selector="#chartOne" smooth>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                fontWeight: 20,
                backgroundColor: item.color,
                borderRadius: 20,
                float: "left",
                marginRight: 12,
              }}
            ></div>
            <span>{item.name}</span>
          </div>
        </ScrollIntoView>
      </div>
    ));
  };

  console.log(reportData);
  return (
    <div className="App">
      <img
        src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
        alt="img"
        style={{ width: 131 }}
      />
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
            <div className="Stats">
              <div className="Stats_Container">
                <p
                  style={{
                    color: "#9D9D9D",
                    fontSize: "48",
                    fontWeight: "Semi-bold",
                  }}
                >
                  Since you watched your first Youtube video on{" "}
                  <span style={{ color: "white" }}>
                    <p></p>
                    {reportData.firstVideoWatchedOn}
                  </span>
                  <div style={{ color: "white" }}>
                    {reportData.firstVideoWatchedOn}
                  </div>
                  , you've watched{" "}
                  <div style={{ color: "white" }}>
                    {reportData.numberOfVideosWatched}{" "}
                  </div>
                  , videos.{" "}
                </p>
                <p style={{ color: "white" }}>
                  <div style={{ color: "#9D9D9D" }}>That's a total of </div>
                  {reportData.additionalWatchTimeData.totalHoursWatched} hours
                  in the past {reportData.daysSinceFirstVideo} days
                </p>
                <p>
                  <div style={{ color: "#9D9D9D" }}> On average you watch </div>
                  {(
                    reportData.additionalWatchTimeData.totalHoursWatched /
                    reportData.daysSinceFirstVideo
                  ).toFixed(1)}{" "}
                  hours every day
                </p>

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
                    data={reportData.additionalWatchTimeData.averageWeek.data}
                    labels={
                      reportData.additionalWatchTimeData.averageWeek.labels
                    }
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
                    data={reportData.additionalWatchTimeData.averageTimes.data}
                    labels={
                      reportData.additionalWatchTimeData.averageTimes.labels
                    }
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
                    data={
                      reportData.additionalWatchTimeData.historicalUsage.data
                    }
                    labels={
                      reportData.additionalWatchTimeData.historicalUsage.labels
                    }
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

                <TableComponent
                  data={reportData.additionalWatchTimeData.updatedChannelTimes}
                />
              </div>
              {/* Insert Chart With most categories breakdown */}

              {/* <Chart
            key="categoryChart"
            type="pie"
            data={reportData.additionalWatchTimeData.cateogryChartData.data}
            labels={reportData.additionalWatchTimeData.cateogrychartData.labels}
            id="categoryChart"
            title=""
            // xAxesType="time"
          /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radium(App);
