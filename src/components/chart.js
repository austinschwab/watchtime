import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const ChartComponent = ({ id, type, data, labels, title, xAxesType }) => {
  const chartRef = useRef();
  var myChart;
  useEffect(() => {
    if (chartRef) {
      myChart = new Chart(chartRef.current.getContext("2d"), {
        type: type,
        data: {
          labels: labels,
          datasets: [
            {
              label: title,
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
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

  return <canvas id="chart" width="400" height="400" ref={chartRef}></canvas>;
};
export default ChartComponent;
