import React from "react";

import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
  ];

  return <Chart options={options} series={series} type="bar" />;
};
export default LineChart;
