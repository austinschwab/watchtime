import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const ChartComponent = ({ id, type, data, labels, title, xAxesType }) => {
  const chartRef = useRef();
  let colorArray = [];
  let greenForMaxDaily = "#4fffaa";
  let redForMaxWeekly = "#c51818";
  let purpleForMaxCategory = "#4A0DCD";

  var myChart;

  for (let index in data) {
    colorArray.push("white");
  }

  const getMaxBorderColor = () => {
    switch (id) {
      case "averageWeek":
        return greenForMaxDaily;
      case "averageTimes":
        return redForMaxWeekly;
      case "categoryChart":
        return purpleForMaxCategory;
      default:
        return greenForMaxDaily;
    }
  };

  const getLargeNumber = () => {
    let largeNumber = Math.max(...data);
    let largeNumberIndex = data.indexOf(largeNumber);
    colorArray[largeNumberIndex] = getMaxBorderColor();

    return largeNumber;

    // if (data === largeNumber) {
    //   borderColors.push("green");
    // } else {
    //   borderColors.push("white");
    // }

    // let borderColors = [];
    // let iterationCount = Math.round(data.length / colorPalette.length);
    // for (let i = 0; i < iterationCount; i++) {
    //   for (let item of colorPalette) {
    //     borderColors.push(item);
    //   }
    // }
    // return borderColors;
  };
  getLargeNumber();

  const styles = {
    averageWeek: {
      borderColor: colorArray,
      backgroundColor: "#111111",
    },
    averageTimes: {
      borderColor: colorArray,
      backgroundColor: "#111111",
    },
    categoryChart: {
      borderColor: "white",
      backgroundColor: [
        colorArray,
        "#005CFF",
        "#0083FF",
        "#00A0FF",
        "#00B9DD",
        "#00CFA8",
        "#E3F3FB",
      ],
    },
    historicalUsage: {
      borderColor: "#10ccf5",
      backgroundColor: "#111111",
    },
  };

  useEffect(() => {
    if (chartRef) {
      myChart = new Chart(chartRef.current.getContext("2d"), {
        type: type,
        id: id,
        data: {
          labels: labels,
          datasets: [
            {
              label: title,
              data: data,
              // backgroundColor: styles.averageWeek.backgroundColor,
              backgroundColor: styles[id].backgroundColor,
              borderWidth: 2,
              borderColor: styles[id].borderColor,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            // xAxes: [{ type: xAxesType, time: { unit: "month" } }],
          },
        },
      });
    }
    if (id === "categoryChart") {
      console.log("hey", id);
    }
  }, [chartRef]);

  return <canvas id="chart" width="650" height="312" ref={chartRef}></canvas>;
};
export default ChartComponent;
