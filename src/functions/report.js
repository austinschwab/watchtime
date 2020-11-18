import _ from "lodash";
import * as constants from "../constants";
import moment from "moment";
import data from "../data/watch-history1.json";
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

const roundNumber = (number) => {
  return Math.round(number * 1e2) / 1e2;
};

// Extract video Ids from watch.json
export const getVideoIds = () => {
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
          data[i].titleUrl.replace("https://www.youtube.com/watch?v\u003d", "")
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

// Get Day since first video
export const getDaySinceFirstVideo = () => {
  let Difference_In_Time =
    new Date().getTime() - new Date(data[data.length - 1].time).getTime();

  let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
};

export const getWatchTimeChartData = (videoList) => {
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
    const duration = convertISO8601ToSeconds(videoObj.duration) / 3600;
    const day = date.getDay();
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
      categoryList.indexOf(constants.YoutubeCategories[videoObj.categoryId]) !==
      -1
    ) {
      categoriesWithCount[
        constants.YoutubeCategories[videoObj.categoryId]
      ].value += 1;
    } else {
      categoryList.push(constants.YoutubeCategories[videoObj.categoryId]);
      categoriesWithCount[constants.YoutubeCategories[videoObj.categoryId]] = {
        value: 1,
        id: constants.YoutubeCategories[videoObj.categoryId],
      };
    }

    // populate hour and day arrays & total watched hours
    timeOfDayWithCount[hour].count += 1;
    timeOfDayWithCount[hour].time += duration;

    daysWithCount[day].time += duration;
    daysWithCount[day].count += 1;

    totalHoursWatched += duration;
  }

  Math.round(totalHoursWatched);

  let averageWeekChartData = getAverageWeekData(daysWithCount);
  let averageTimesChartData = getAverageTimesData(timeOfDayWithCount);
  let categoryChartData = getCategoryChartData(categoriesWithCount);
  let channelTableData = getChannelOverviewTableData(channelsWithVideosAndTime);
  let historicalUsageChartData = getHistoricalUsageChartData(
    dateLabels,
    dateOverTimeData
  );

  return {
    averageTimesChartData,
    averageWeekChartData,
    categoryChartData,
    totalHoursWatched,
    historicalUsageChartData,
    channelTableData,
  };
};

// averageWeek Chart
const getAverageWeekData = (daysWithCount) => {
  console.log("daysWithCount", daysWithCount);

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
const getAverageTimesData = (timeOfDayWithCount) => {
  console.log("Timeofdaywithcount", timeOfDayWithCount);
  let averageTimesLabels = [];
  let averageTimesData = [];
  for (let index in timeOfDayWithCount) {
    let hour = constants.hourFormat[index].value;
    averageTimesLabels.push(hour);
    if (timeOfDayWithCount[index].count > 0) {
      averageTimesData.push(
        roundNumber(
          Math.floor(timeOfDayWithCount[index].time * 60) /
            timeOfDayWithCount[index].count
        )
      );
    } else {
      averageTimesData.push(0);
    }
  }

  return { labels: averageTimesLabels, data: averageTimesData };
};

// category Chart
const getCategoryChartData = (categoriesWithCount) => {
  let categoryLabels = [];
  let categoryData = [];

  for (let obj of Object.values(categoriesWithCount)) {
    categoryLabels.push(obj.id);
    categoryData.push(obj.value);
  }

  return { labels: categoryLabels, data: categoryData };
};

// channel overview Table
const getChannelOverviewTableData = (channelsWithVideosAndTime) => {
  console.log("channelsWithVideosAndTime", channelsWithVideosAndTime);
  let channelTableData = Object.values(channelsWithVideosAndTime)
    .sort((a, b) => b.videos - a.videos)
    .slice(0, 10);
  return channelTableData.map((obj, index) => {
    return {
      time: roundNumber(obj.time),
      title: obj.title,
      count: obj.videos,
      key: index,
    };
  });
};

// historical data chart
const getHistoricalUsageChartData = (dateLabels, dateOverTimeData) => {
  console.log("historical usage", dateLabels, dateOverTimeData);
  let historicalData = Object.values(dateOverTimeData).sort(
    (a, b) => new Date(b.t) - new Date(a.t)
  );
  //   let adjustedHistoricalDataTimes = historicalData.map((data) => data.y / 3600);
  dateLabels.sort((a, b) => new Date(b) - new Date(a));

  return {
    labels: dateLabels,
    data: historicalData,
  };
};
