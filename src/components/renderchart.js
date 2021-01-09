import React from "react";
import { Spring, config } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import * as constants from "../constants";
import "../App.css";
import ChartComponent from "./chart";
import TableComponent from "./table";
import CategoryBox from "./categoryBox";
const RenderChart = ({ reportData }) => {
  const chartDataArray = [
    {
      heading: (
        <>
          Since you watched your first Youtube video on{" "}
          <span className="white">{reportData.firstVideoWatchedOn}</span>,
          you've watched{" "}
          <span className="white">
            {reportData.numberOfVideosWatched} videos.
          </span>
          <div className="marginMedium" />
          That's a total of{" "}
          <span style={{ color: "white" }}>
            {reportData.totalHoursWatched.toFixed(1)}
          </span>{" "}
          hours in the past{" "}
          <span style={{ color: "white" }}>
            {reportData.daysSinceFirstVideo}
          </span>{" "}
          days.
        </>
      ),
      subtitle: null,
      component: null,
    },
    {
      heading: (
        <>
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
        </>
      ),
      subtitle: (
        <>
          <p
            style={{
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
        </>
      ),
      component: {
        key: "averageWeek",
        type: "bar",
        data: reportData.averageWeekChart.data,
        labels: reportData.averageWeekChart.labels,
        id: "averageWeek",
        title: "Hours per Day",
      },
    },
    {
      heading: (
        <>
          You prefer watching videos during the{" "}
          <span style={{ color: "white" }}>
            {reportData.averageTimesText.timeOfDay}
          </span>
        </>
      ),
      subtitle: (
        <>
          {reportData.averageTimesText.timeOfDayPlural}'s make up{" "}
          <span
            style={{
              borderBottom: "1px solid #c51818",
              display: "inline-block",
              color: "white",
            }}
          >
            {reportData.averageTimesText.percentage}%{" "}
          </span>{" "}
          of your daily Youtube usage.
        </>
      ),
      component: {
        key: "averageTimes",
        type: "bar",
        data: reportData.averageTimesChart.data,
        labels: reportData.averageTimesChart.labels,
        id: "averageTimes",
        title: "Minutes per hour",
      },
    },
    {
      heading: (
        <>
          Here’s a breakdown of your{" "}
          <span style={{ color: "white" }}>historical usage</span>
        </>
      ),
      subtitle: (
        <>
          Your top month was{" "}
          <span
            style={{
              borderBottom: "1px solid #10ccf5",
              display: "inline-block",
              paddingBottom: 1,
              color: "white",
            }}
          >
            {reportData.historicalText.label}
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
            {reportData.historicalText.hour}
          </span>{" "}
          hours.
        </>
      ),
      component: {
        key: "historicalUsage",
        type: "line",
        data: reportData.historicalChart.data,
        labels: reportData.historicalChart.labels,
        id: "historicalUsage",
        title: "Hours per month",
      },
    },
    {
      heading: (
        <>
          {" "}
          <span style={{ color: "white" }}> Most watched</span> channels
        </>
      ),
      subtitle: (
        <>
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
        </>
      ),
      component: {
        data: reportData.channelTable,
      },
    },
    {
      heading: <>See which categories you watch the most.</>,
      subtitle: null,
      component: {
        key: "categoryChart",
        type: "doughnut",
        data: reportData.categoryChart.data,
        labels: reportData.categoryChart.labels,
        id: "categoryChart",
        title: "",
      },
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      {chartDataArray.map((item, index) => {
        return (
          <div
            id={`chart${index}`}
            style={{
              marginBottom: 100,
              paddingTop: 75,
            }}
          >
            <VisibilitySensor>
              {({ isVisible }) => (
                <Spring delay={100} to={{ opacity: isVisible ? 1 : 0 }}>
                  {({ opacity }) => (
                    <CategoryBox opacity={opacity} index={index} />
                  )}
                </Spring>
              )}
            </VisibilitySensor>

            <VisibilitySensor>
              {({ isVisible }) => (
                <Spring delay={100} to={{ opacity: isVisible ? 1 : 0 }}>
                  {({ opacity }) => (
                    <div style={{ opacity, width: "60%", margin: "auto" }}>
                      <div className="Paragraph">{item.heading}</div>
                      <div className="Subtitle">{item.subtitle}</div>
                    </div>
                  )}
                </Spring>
              )}
            </VisibilitySensor>

            {index === 4 && <TableComponent data={item.component.data} />}

            {index !== 0 && index !== 4 && (
              <div
                style={{
                  position: "relative",
                  width: "45vw",
                  height: "45vh",
                  minWidth: 375,
                  minHeight: 375,
                  maxWidth: 600,
                  margin: "auto",
                }}
              >
                <ChartComponent
                  key={item.component.key}
                  type={item.component.type}
                  data={item.component.data}
                  labels={item.component.labels}
                  id={item.component.id}
                  title={item.component.title}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RenderChart;
