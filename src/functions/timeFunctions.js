import React from "react";
import { hourFormat } from "../constants";

export const getHourFromDate = (dateString = new Date()) => {
  let hour = new Date(dateString).getHours();

  // if period is needed uncomment
  //   return { hour: hourFormat[hour].value, period: hourFormat[hour].period };

  // assuming 0-23 hour format
  return hour;
};
