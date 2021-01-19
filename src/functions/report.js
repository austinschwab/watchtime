import React, { useState, useEffect } from "react";
import _ from "lodash";
import * as constants from "../constants";
import moment from "moment";
import axios from "axios";
import { API_Key } from "../api";
// import data from "../data/watch-history1.json";

const GenerateReport = async (json, setProgress) => {
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

  const roundNumber = (number) => {
    return Math.round(number * 1e2) / 1e2;
  };

  const getTimeOfDay = (data) => {
    // data = reportData.averageTimeChart.data
    let index = data.indexOf(Math.max(...data));
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
        if (Number.isNaN(+b.time)) {
          return a + +0;
        } else {
          return a + +b.time;
        }
      }, 0);
    } else {
      sum = array.reduce((a, b) => a + b, 0);
    }
    return sum;
  };
  const getTopMonth = (data, labels) => {
    let index = data.indexOf(Math.max(...data));
    let hour = data[index];
    let label = labels[index];
    return { label, hour };
  };

  const percentageTimeOfDay = (data) => {
    // reportData.averageTimesChart.data
    let index = data.indexOf(Math.max(...data));
    let slicedData;
    if (index <= 11) {
      slicedData = data.slice(0, 12);
    }
    if (12 <= index && index < 16) {
      slicedData = data.slice(12, 17);
    } else {
      slicedData = data.slice(17, 23);
    }
    let sum = getSum(data, false);
    let durationSum = slicedData.reduce((a, b) => a + b, 0);
    let percentage = Math.round((durationSum / sum) * 100);
    return percentage;
  };

  // Extract video Ids from watch.json
  const getVideoIds = () => {
    let videoIdWithTime = [];
    let totalIdBatch = [];
    let idBatch = [];

    for (let i = 0; i < json.length - 1; i++) {
      if (json[i] && json[i].titleUrl) {
        if (
          json[i].titleUrl.indexOf("https://www.youtube.com/watch?v\u003d") !==
          -1
        ) {
          let id = json[i].titleUrl.replace(
            "https://www.youtube.com/watch?v\u003d",
            ""
          );
          videoIdWithTime.push({ videoId: id, time: json[i].time });
          if (idBatch.length < 50) {
            idBatch.push(id);
          } else {
            totalIdBatch.push(idBatch);
            idBatch = [];
            idBatch.push(
              json[i].titleUrl.replace(
                "https://www.youtube.com/watch?v\u003d",
                ""
              )
            );
          }
        }
      }
    }
    if (idBatch.length > 0) {
      totalIdBatch.push(idBatch);
      idBatch = [];
    }

    return { batch: totalIdBatch, batchWithTimes: videoIdWithTime };
  };

  // Get Day since first video
  const getDaySinceFirstVideo = () => {
    let Difference_In_Time =
      new Date().getTime() - new Date(json[json.length - 1].time).getTime();

    let Difference_In_Days = Math.floor(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    return Difference_In_Days;
  };

  // averageWeek Chart
  const getAverageWeekData = (daysWithCount) => {
    let averageWeekLabels = [];
    let averageWeekData = [];
    for (let index in daysWithCount) {
      let day = constants.daysOfWeek[index];
      averageWeekLabels.push(day);

      if (daysWithCount[index].count > 0) {
        averageWeekData.push(
          roundNumber(daysWithCount[index].count / daysWithCount[index].time)
        );
      } else {
        averageWeekData.push(0);
      }
    }
    return { labels: averageWeekLabels, data: averageWeekData };
  };

  // averageTimes Chart
  const getAverageTimesData = (timeOfDayWithCount, totalHoursWatched) => {
    let averageTimesLabels = [];
    let averageTimesData = [];
    for (let index in timeOfDayWithCount) {
      let hour = constants.hourFormat[index].value;
      averageTimesLabels.push(hour);
      if (timeOfDayWithCount[index].count > 0) {
        averageTimesData.push(
          // roundNumber(
          //   Math.floor(timeOfDayWithCount[index].time * 60) /
          //     timeOfDayWithCount[index].count
          // )
          roundNumber(
            (timeOfDayWithCount[index].time / totalHoursWatched) * 100
          )
        );
      } else {
        averageTimesData.push(0);
      }
    }
    for (let index in averageTimesLabels) {
      if (index < 12) {
        averageTimesLabels[index] = `${constants.hourFormat[index].value}am`;
      } else {
        averageTimesLabels[index] = `${constants.hourFormat[index].value}pm`;
      }
    }

    return { labels: averageTimesLabels, data: averageTimesData };
  };

  // category Chart
  const getCategoryChartData = (categoriesWithCount) => {
    let categoryLabels = [];
    let categoryData = [];
    let i = 0;
    for (let obj of Object.values(categoriesWithCount)) {
      if (i < 8) {
        categoryLabels.push(obj.id);
        categoryData.push(obj.value);
        i++;
      } else {
        continue;
      }
    }

    return { labels: categoryLabels, data: categoryData };
  };

  // channel overview Table
  const getChannelOverviewTableData = (channelsWithVideosAndTime) => {
    let channelTableData = Object.values(channelsWithVideosAndTime)
      .sort((a, b) => b.videos - a.videos)
      .slice(0, 10);
    channelTableData.map((obj, index) => {
      return {
        time: roundNumber(obj.time),
        title: obj.title,
        videos: obj.videos,
        key: index,
      };
    });
    channelTableData.unshift({
      title: "Channel Name",
      videos: "Videos",
      time: "Time(hrs)",
    });
    return channelTableData;
  };

  const getHistoricalData = (videoListData) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let usedMonths = [];
    let dataArray = {};
    for (let obj of videoListData) {
      let duration = convertISO8601ToSeconds(obj.duration);
      if (duration === undefined) {
        duration = 0;
      }
      let month = months[new Date(obj.time).getMonth()];
      let FourDigitYear = new Date(obj.time).getFullYear();
      let TwoDigitYear = FourDigitYear.toString().substr(-2);
      let string = month.concat(`${" "}${TwoDigitYear}`);
      if (usedMonths.indexOf(string) !== -1) {
        dataArray[string].time += duration;
      } else {
        usedMonths.push(string);
        dataArray[string] = {
          label: string,
          time: duration,
          date: new Date(obj.time),
        };
      }
    }
    let chronDates = Object.values(dataArray).sort((a, b) => b.date - a.date);
    let sortedDates = [];
    let labels = [];
    let data = [];

    for (let obj of chronDates) {
      sortedDates.unshift(obj);
    }

    for (let obj of sortedDates) {
      labels.push(obj.label);
      data.push(+(obj.time / 3600).toFixed(1));
    }

    return { labels, data };
  };

  const getWatchTimeChartData = (videoList) => {
    let channelList = [];
    let channelsWithVideosAndTime = {};

    let categoryList = [];
    let categoriesWithCount = {};

    let dateLabels = [];
    let dateOverTimeData = {};

    let totalHoursWatched = 0;

    let daysWithCount = _.cloneDeep(constants.daysWithCount);

    let timeOfDayWithCount = _.cloneDeep(constants.timeOfDayWithCount);

    for (let videoObj of videoList) {
      const date = new Date(videoObj.time);
      const formattedDate = moment(videoObj.time).format("l");
      const hour = date.getHours();
      let duration = convertISO8601ToSeconds(videoObj.duration) / 3600;
      const day = date.getDay();
      if (Number.isNaN(duration)) {
        duration = 0;
      }

      // populate channel data arrays
      if (channelList.indexOf(videoObj.channelTitle) !== -1) {
        channelsWithVideosAndTime[videoObj.channelTitle].videos += 1;
        channelsWithVideosAndTime[videoObj.channelTitle].time += duration;
      } else {
        channelList.push(videoObj.channelTitle);
        channelsWithVideosAndTime[videoObj.channelTitle] = {
          videos: 1,
          time: duration,
          title: videoObj.channelTitle,
        };
      }

      // populate historical date arrays, update this
      if (dateLabels.indexOf(formattedDate) !== -1) {
        dateOverTimeData[formattedDate].y += duration;
      } else {
        dateLabels.push(formattedDate);
        dateOverTimeData[formattedDate] = {
          y: duration,
          t: formattedDate,
        };
      }
      // populate category data arrays
      if (
        categoryList.indexOf(
          constants.YoutubeCategories[videoObj.categoryId]
        ) !== -1
      ) {
        categoriesWithCount[
          constants.YoutubeCategories[videoObj.categoryId]
        ].value += 1;
      } else {
        categoryList.push(constants.YoutubeCategories[videoObj.categoryId]);
        categoriesWithCount[
          constants.YoutubeCategories[videoObj.categoryId]
        ] = {
          value: 1,
          id: constants.YoutubeCategories[videoObj.categoryId],
        };
      }

      // populate hour and day arrays & total watched hours
      timeOfDayWithCount[hour].count += 1;
      timeOfDayWithCount[hour].time += duration;
      //11
      //200 mintues
      //

      daysWithCount[day].time += duration;
      daysWithCount[day].count += 1;

      totalHoursWatched += duration;
    }

    Math.round(totalHoursWatched);

    let averageWeekChartData = getAverageWeekData(daysWithCount);
    let averageTimesChartData = getAverageTimesData(
      timeOfDayWithCount,
      totalHoursWatched
    );
    let categoryChartData = getCategoryChartData(categoriesWithCount);
    let channelTableData = getChannelOverviewTableData(
      channelsWithVideosAndTime
    );
    let historicalUsageChartData = getHistoricalData(videoList);

    return {
      averageTimesChartData,
      averageWeekChartData,
      categoryChartData,
      totalHoursWatched,
      historicalUsageChartData,
      channelTableData,
    };
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
  // Request Youtube api for batched video/channel data
  const generateVideoList = async () => {
    const key = API_Key;

    // videoId structure = {batch: videoIdList, batchWithTimes: videoIdListWithVideoDurations}
    let videoIds = getVideoIds();
    let requestData = [];
    let totalRequests = videoIds.batch.length;
    let count = 0;
    for (let videoList of videoIds.batch) {
      await axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoList}&part=contentDetails&part=snippet&key=${key}`
        )
        .then((response) => {
          if (response) {
            count += 1;
            setProgress((count / totalRequests) * 100);
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

  // Outputs all watchtime report data fields
  const generateCompleteReportData = async () => {
    let videoList = await generateVideoList();
    let firstVideoWatchedOn = moment(json[json.length - 1].time).format("L");
    let numberOfVideosWatched = json.length.toLocaleString();
    let daysSinceFirstVideo = getDaySinceFirstVideo();
    let chartData = getWatchTimeChartData(videoList);
    let averageTimesText = {
      timeOfDay: getTimeOfDay(chartData.averageTimesChartData.data),
      timeOfDayPlural:
        getTimeOfDay(chartData.averageTimesChartData.data)[0].toUpperCase() +
        getTimeOfDay(chartData.averageTimesChartData.data).slice(1),
      percentage: percentageTimeOfDay(chartData.averageTimesChartData.data),
    };
    let tableText = {
      hours: getSum(chartData.channelTableData, true).toFixed(1),
      percentage: Math.round(
        (getSum(chartData.channelTableData, true) /
          chartData.totalHoursWatched) *
          100
      ),
    };

    let historicalText = getTopMonth(
      chartData.historicalUsageChartData.data,
      chartData.historicalUsageChartData.labels
    );

    return {
      firstVideoWatchedOn,
      numberOfVideosWatched,
      daysSinceFirstVideo,
      averageWeekChart: chartData.averageWeekChartData,
      averageTimesChart: chartData.averageTimesChartData,
      categoryChart: chartData.categoryChartData,
      totalHoursWatched: chartData.totalHoursWatched,
      historicalChart: chartData.historicalUsageChartData,
      channelTable: chartData.channelTableData,
      averageTimesText,
      tableText,
      historicalText,
    };
  };
  return generateCompleteReportData();
};
export default GenerateReport;
