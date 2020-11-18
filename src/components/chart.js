import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const ChartComponent = ({ id, type, data, labels, title, xAxesType }) => {
  const chartRef = useRef();
  let colorArray = [];
  let greenForMaxDaily = "#4fffaa";
  let redForMaxWeekly = "#c51818";

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
    },
    averageTimes: {
      borderColor: colorArray,
    },
    categoryChart: {
      borderColor: "white",
    },
    historicalUsage: {
      borderColor: "#10ccf5",
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
              backgroundColor: ["#111111"],
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
  }, [chartRef]);

  return <canvas id="chart" width="650" height="312" ref={chartRef}></canvas>;
};
export default ChartComponent;
