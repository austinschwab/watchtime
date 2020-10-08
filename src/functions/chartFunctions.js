import { getHourFromDate } from "./timeFunctions";
import data from "../data/watch-history1.json";

export const timesBarChartData = () => {
  // uncomment for period hours
  //   let amHours = [];
  //   let pmHours = [];
  let hoursArray = [];
  data.map((data) => {
    hoursArray.push(getHourFromDate(data.time));
    // uncomment for period hours
    // hourInfo.period === "AM"
    //   ? amHours.push(hourInfo.hour)
    //   : pmHours.push(hourInfo.hour);
  });

  //uncomment for period hours
  //   let periodHours = [
  //     { value: 12, count: amHours.filter((x) => x == 12).length },
  //     { value: 1, count: amHours.filter((x) => x == 1).length },
  //     { value: 2, count: amHours.filter((x) => x == 2).length },
  //     { value: 3, count: amHours.filter((x) => x == 3).length },
  //     { value: 4, count: amHours.filter((x) => x == 4).length },
  //     { value: 5, count: amHours.filter((x) => x == 5).length },
  //     { value: 6, count: amHours.filter((x) => x == 6).length },
  //     { value: 7, count: amHours.filter((x) => x == 7).length },
  //     { value: 8, count: amHours.filter((x) => x == 8).length },
  //     { value: 9, count: amHours.filter((x) => x == 9).length },
  //     { value: 10, count: amHours.filter((x) => x == 10).length },
  //     { value: 11, count: amHours.filter((x) => x == 11).length },
  //     { value: 12, count: pmHours.filter((x) => x == 12).length },
  //     { value: 1, count: pmHours.filter((x) => x == 1).length },
  //     { value: 2, count: pmHours.filter((x) => x == 2).length },
  //     { value: 3, count: pmHours.filter((x) => x == 3).length },
  //     { value: 4, count: pmHours.filter((x) => x == 4).length },
  //     { value: 5, count: pmHours.filter((x) => x == 5).length },
  //     { value: 6, count: pmHours.filter((x) => x == 6).length },
  //     { value: 7, count: pmHours.filter((x) => x == 7).length },
  //     { value: 8, count: pmHours.filter((x) => x == 8).length },
  //     { value: 9, count: pmHours.filter((x) => x == 9).length },
  //     { value: 10, count: pmHours.filter((x) => x == 10).length },
  //     { value: 11, count: pmHours.filter((x) => x == 11).length },
  //   ];
  let hourData = [
    { hour: 0, count: hoursArray.filter((x) => x == 0).length },
    { hour: 1, count: hoursArray.filter((x) => x == 1).length },
    { hour: 2, count: hoursArray.filter((x) => x == 2).length },
    { hour: 3, count: hoursArray.filter((x) => x == 3).length },
    { hour: 4, count: hoursArray.filter((x) => x == 4).length },
    { hour: 5, count: hoursArray.filter((x) => x == 5).length },
    { hour: 6, count: hoursArray.filter((x) => x == 6).length },
    { hour: 7, count: hoursArray.filter((x) => x == 7).length },
    { hour: 8, count: hoursArray.filter((x) => x == 8).length },
    { hour: 9, count: hoursArray.filter((x) => x == 9).length },
    { hour: 10, count: hoursArray.filter((x) => x == 10).length },
    { hour: 11, count: hoursArray.filter((x) => x == 11).length },
    { hour: 12, count: hoursArray.filter((x) => x == 12).length },
    { hour: 13, count: hoursArray.filter((x) => x == 13).length },
    { hour: 14, count: hoursArray.filter((x) => x == 14).length },
    { hour: 15, count: hoursArray.filter((x) => x == 15).length },
    { hour: 16, count: hoursArray.filter((x) => x == 16).length },
    { hour: 17, count: hoursArray.filter((x) => x == 17).length },
    { hour: 18, count: hoursArray.filter((x) => x == 18).length },
    { hour: 19, count: hoursArray.filter((x) => x == 19).length },
    { hour: 20, count: hoursArray.filter((x) => x == 20).length },
    { hour: 21, count: hoursArray.filter((x) => x == 21).length },
    { hour: 22, count: hoursArray.filter((x) => x == 22).length },
    { hour: 23, count: hoursArray.filter((x) => x == 23).length },
  ];
  console.log(hourData);
  return hourData;
};
