import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import ChartComponent from "./chart";
import TableComponent from "./table";
import CategoryBox from "./categoryBox";

class RenderChart extends Component {
  render() {
    console.log(this.props.reportData);
    const reportData = this.props.reportData;
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
            <div className="margin-medium" />
            That's a total of{" "}
            <span className="white">
              {reportData.totalHoursWatched.toFixed(1)}
            </span>{" "}
            hours in the past{" "}
            <span className="white">{reportData.daysSinceFirstVideo}</span>{" "}
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
            <span className="white">
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
            {" "}
            Your daily average is{" "}
            <span
              className="white"
              style={{
                borderBottom: "1px solid #4fffaa",
                display: "inline-block",
              }}
            >
              {(
                reportData.averageWeekChart.data.reduce((a, b) => a + b) /
                reportData.averageWeekChart.data.length
              ).toFixed(1)}
            </span>{" "}
            hours.
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
              className="white"
              style={{
                borderBottom: "1px solid #c51818",
                display: "inline-block",
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
          title: "% of total hours watched",
        },
      },
      {
        heading: (
          <>
            Here’s a breakdown of your{" "}
            <span className="white">historical usage</span>
          </>
        ),
        subtitle: (
          <>
            Your top month was{" "}
            <span
              className="white"
              style={{
                borderBottom: "1px solid #10ccf5",
                display: "inline-block",
                paddingBottom: 1,
              }}
            >
              {reportData.historicalText.label}
            </span>
            . You watched{" "}
            <span
              className="white"
              style={{
                borderBottom: "1px solid #10ccf5",
                display: "inline-block",
                paddingBottom: 1,
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
            <span className="white"> Most watched</span> channels
          </>
        ),
        subtitle: (
          <>
            Across your top 10 channels, you've watched{" "}
            <span
              className="white"
              style={{
                borderBottom: "1px solid #f0f510",
                display: "inline-block",
                paddingBottom: 1,
              }}
            >
              {reportData.tableText.hours} hours
            </span>
            . This makes up for{" "}
            <span
              className="white"
              style={{
                borderBottom: "1px solid #f0f510",
                display: "inline-block",
                paddingBottom: 1,
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
        heading: <>See which categories you watch the most</>,
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
      <div className="full-width ">
        {chartDataArray.map((item, index) => {
          return (
            <div
              key={`chart${index}`}
              id={`chart${index}`}
              className="RenderChartContainer page-break"
            >
              <CategoryBox index={index} />

              <div
                className="margin-auto"
                style={{ width: "70%", marginTop: 50 }}
              >
                <div className="Paragraph grey margin-auto text-center">
                  {item.heading}
                </div>
                <div
                  className="Subtitle grey"
                  style={{ width: `${index === 4 && "90%"}` }}
                >
                  {item.subtitle}
                </div>
              </div>

              {index === 4 && <TableComponent data={item.component.data} />}

              {index !== 0 && index !== 4 && (
                <div className="ChartContainer margin-auto">
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
  }
}

export default RenderChart;
