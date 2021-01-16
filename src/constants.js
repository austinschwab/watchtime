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
    link: "https://www.reddit.com/r/nosurf/",
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
    link: "https://www.humanetech.com/",
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
    link:
      "https://www.amazon.com/Shallows-What-Internet-Doing-Brains/dp/0393339750",
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
    link: "https://www.freedom.to",
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
    link: "https://www.rescuetime.com/",
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
    link: "https://www.netflix.com/title/81254224",
  },
];
export const Categories = [
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

export const TestData = {
  firstVideoWatchedOn: "1/16/2020",
  numberOfVideosWatched: "2,700",
  daysSinceFirstVideo: 366,
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
    data: [3.4, 2.34, 2.4, 3.03, 6.14, 2.24, 1.92],
  },
  averageTimesChart: {
    labels: [
      "12am",
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm",
      "11pm",
    ],
    data: [
      5,
      0,
      0,
      0,
      0,
      0,
      10,
      10,
      10,
      20,
      3,
      2,
      3,
      2,
      3,
      1,
      1,
      1,
      5,
      1,
      1,
      3,
      5,
      5,
    ],
  },
  categoryChart: {
    labels: [
      "Gaming",
      "Education",
      "People & Blogs",
      "Music",
      "Science & Technology",
    ],
    data: [60, 10, 10, 5, 5],
  },
  totalHoursWatched: 1200,
  historicalChart: {
    labels: [
      "Jan 20",
      "Feb 20",
      "Mar 20",
      "Apr 20",
      "May 20",
      "Jun 20",
      "Jul 20",
      "Aug 20",
      "Sept 20",
      "Oct 20",
      "Nov 20",
      "Dec 20",
    ],
    data: [30, 60, 80, 100, 130, 100, 50, 60, 20, 60, 50, 50],
  },
  channelTable: [
    {
      time: 11.56,
      title: "Kitco NEWS",
      videos: 40,
      key: 0,
      tableData: {
        id: 0,
      },
    },
    {
      time: 16.92,
      title: "Fox News",
      videos: 37,
      key: 1,
      tableData: {
        id: 1,
      },
    },
    {
      time: 10.56,
      title: "Webflow",
      videos: 15,
      key: 2,
      tableData: {
        id: 2,
      },
    },
    {
      time: 0.86,
      title: "Zeth Beatz",
      videos: 14,
      key: 3,
      tableData: {
        id: 3,
      },
    },
    {
      time: 7.33,
      title: "Automate All the Things",
      videos: 9,
      key: 4,
      tableData: {
        id: 4,
      },
    },
    {
      time: 0.54,
      title: "FeidVEVO",
      videos: 9,
      key: 5,
      tableData: {
        id: 5,
      },
    },
    {
      time: 1.81,
      title: "Donald J Trump",
      videos: 7,
      key: 6,
      tableData: {
        id: 6,
      },
    },
    {
      time: 1.23,
      title: "CNBC Television",
      videos: 7,
      key: 7,
      tableData: {
        id: 7,
      },
    },
    {
      time: 3.29,
      title: "Framer",
      videos: 7,
      key: 8,
      tableData: {
        id: 8,
      },
    },
    {
      time: 0.47,
      title: "Hedgeye",
      videos: 6,
      key: 9,
      tableData: {
        id: 9,
      },
    },
  ],
  averageTimesText: {
    timeOfDay: "early morning",
    timeOfDayPlural: "Early morning",
    percentage: 26,
  },
  tableText: {
    hours: "54.6",
    percentage: 34,
  },
  historicalText: {
    label: "Sep 20",
    hour: 158.9,
  },
};

export const quotes = [
  {
    description: "Day by day, what you do is who you become. — Heraclitus",
    image: process.env.PUBLIC_URL + "images/heraclitus.png",
  },
  {
    description:
      "This is your life and it's ending one minute at a time — Tyler Durden",
    image: process.env.PUBLIC_URL + "images/life.png",
  },
  {
    description: "You are what you do, not what you say you'll do. — Carl Jung",
    image: process.env.PUBLIC_URL + "images/jung.jpg",
  },

  {
    description: "The sooner we start, the sooner we improve.",
    image: process.env.PUBLIC_URL + "images/improve.png",
  },
  {
    description:
      "Reduce options. Increase focus. Multiply results. — Carl Richards",
    image: process.env.PUBLIC_URL + "images/focus.jpg",
  },
  {
    description: "Chase discipline, not dopamine. — Jim Fisher",
    image: process.env.PUBLIC_URL + "images/dopamine.jpg",
  },
  {
    description: "Don't stop working before it starts working.",
    image: process.env.PUBLIC_URL + "images/pointless.png",
  },
  {
    description: "To produce signal, mute noise.",
    image: process.env.PUBLIC_URL + "images/signal.png",
  },
];
