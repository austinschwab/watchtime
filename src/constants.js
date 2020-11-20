import React from "react";

export const hourFormat = [
  { value: 12, period: "AM" },
  { value: 1, period: "AM" },
  { value: 2, period: "AM" },
  { value: 3, period: "AM" },
  { value: 4, period: "AM" },
  { value: 5, period: "AM" },
  { value: 6, period: "AM" },
  { value: 7, period: "AM" },
  { value: 8, period: "AM" },
  { value: 9, period: "AM" },
  { value: 10, period: "AM" },
  { value: 11, period: "AM" },
  { value: 12, period: "PM" },
  { value: 1, period: "PM" },
  { value: 2, period: "PM" },
  { value: 3, period: "PM" },
  { value: 4, period: "PM" },
  { value: 5, period: "PM" },
  { value: 6, period: "PM" },
  { value: 7, period: "PM" },
  { value: 8, period: "PM" },
  { value: 9, period: "PM" },
  { value: 10, period: "PM" },
  { value: 11, period: "PM" },
];
export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const YoutubeCategories = {
  1: "Film & Animation",
  2: " Autos & Vehicles",
  10: "Music",
  15: "Pets & Animals",
  17: "Sports",
  18: "Short Movies",
  19: "Travel & Events",
  20: "Gaming",
  21: "Videoblogging",
  22: "People & Blogs",
  23: "Comedy",
  24: "Entertainment",
  25: "News & Politics",
  26: " Howto & Style",
  27: "Education",
  28: " Science & Technology",
  29: " Nonprofits & Activism",
  30: "Movies",
  31: "Anime/Animation",
  32: "Action/Adventure",
  33: "Classics",
  34: "Comedy",
  35: "Documentary",
  36: "Drama",
  37: "Family",
  38: "Foreign",
  39: "Horror",
  40: "Sci:Fi/Fantasy",
  41: "Thriller",
  42: "Shorts",
  43: "Shows",
  44: "Trailers",
};

export const sampleReportData = {
  firstVideoWatchedOn: "07/28/2016",
  numberOfVideosWatched: 17400,
  daysSinceFirstVideo: 1569,
  averageTimesChart: {
    labels: [
      12,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
    ],
    data: [
      0,
      0,
      0,
      0,
      4,
      3.3333333333333335,
      13.866666666666667,
      59.42857142857143,
      5.5,
      14.333333333333334,
      18.5,
      24.166666666666668,
      38.666666666666664,
      30.625,
      63,
      30.055555555555557,
      12.058823529411764,
      15.12,
      34.1764705882353,
      23.5,
      13.592592592592593,
      5.375,
      10,
      21,
    ],
  },
  averageWeekChart: {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    data: [
      3.5714285714285716,
      3.2,
      2.0714285714285716,
      3.7857142857142856,
      4.1,
      2,
      2,
    ],
  },
  categoryChart: {
    labels: [
      " Science & Technology",
      "Education",
      "People & Blogs",
      "Music",
      " Howto & Style",
      "News & Politics",
      "Entertainment",
      "Comedy",
      "Film & Animation",
    ],
    data: [27, 43, 27, 62, 3, 58, 14, 1, 1],
  },
  historicalChart: {
    labels: [
      "9/23/2020",
      "9/22/2020",
      "9/21/2020",
      "9/20/2020",
      "9/19/2020",
      "9/18/2020",
      "9/17/2020",
      "9/16/2020",
      "9/15/2020",
      "9/14/2020",
      "9/13/2020",
    ],
    data: [
      5.517222222222222,
      6.394722222222223,
      4.868611111111111,
      3.861666666666667,
      12.692222222222222,
      24.637777777777778,
      10.234444444444444,
      9.152222222222223,
      8.445555555555556,
      0.49027777777777776,
      3.2316666666666665,
    ],
  },
  totalHoursWatched: 89,
  channelTable: [
    { number: "1", time: "10.7", title: "Fox News", count: 19, key: 0 },
    { number: "2", time: "2.6", title: "Kitco NEWS", count: 8, key: 1 },
    { number: "3", time: "1.1", title: "Webflow", count: 7, key: 2 },
    { number: "4", time: "0.5", title: "Hedgeye", count: 6, key: 3 },
    { number: "5", time: "0.2", title: "Donald J Trump", count: 5, key: 4 },
    {
      number: "6",
      time: "3.5",
      title: "Automate All the Things",
      count: 5,
      key: 5,
    },
    { number: "7", time: "6.5", title: "pixelgeek", count: 4, key: 6 },
    { number: "8", time: "0.2", title: "Zeth Beatz", count: 4, key: 7 },
    { number: "9", time: "1.0", title: "CNBC Television", count: 4, key: 8 },
    { number: "10", time: "1.8", title: "Figma", count: 4, key: 9 },
  ],
};
export const daysWithCount = {
  0: { count: 0, time: 0 },
  1: { count: 0, time: 0 },
  2: { count: 0, time: 0 },
  3: { count: 0, time: 0 },
  4: { count: 0, time: 0 },
  5: { count: 0, time: 0 },
  6: { count: 0, time: 0 },
};

export const timeOfDayWithCount = {
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

export const recommendations = [
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
];
