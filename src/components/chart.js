import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const ChartComponent = ({ id, type, data, labels, title }) => {
  const chartRef = useRef();
  let colorArray = [];
  let categoryChartColors = [
    "#005CFF",
    "#0083FF",
    "#00A0FF",
    "#00B9DD",
    "#00CFA8",
    "#FFFFFF",
    "#E3F3FB",
    "#5391FF",
  ];
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
    categoryChartColors[largeNumberIndex] = getMaxBorderColor();

    return largeNumber;
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
      backgroundColor: categoryChartColors,
    },
    historicalUsage: {
      borderColor: "#10ccf5",
      backgroundColor: "#111111",
    },
  };

  useEffect(() => {
    let options;
    if (type !== "doughnut") {
      options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    } else {
      options = {};
    }
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
        options: options,
      });
    }
  }, [chartRef]);

  return (
    <canvas
      id="chart"
      responsive="true"
      width="440"
      height="320"
      ref={chartRef}
    ></canvas>
  );
};
export default ChartComponent;
