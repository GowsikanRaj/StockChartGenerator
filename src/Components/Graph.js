import React from "react";
import Plot from "react-plotly.js";

const Graph = ({
  stock,
  stockChartXValues,
  stockChartYValues,
  fiftyDayEMAXValues,
  fiftyDayEMAYValues,
  fiftyDaySMAXValues,
  fiftyDaySMAYValues,
  hundredDaySMAXValues,
  hundredDaySMAYValues,
  twoHundredDaySMAXValues,
  twoHundredDaySMAYValues,
}) => {
  const today =
    String(new Date().getFullYear()) +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  const lastYearsDate =
    String(new Date().getFullYear() - 1) +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  return (
    <Plot
      data={[
        {
          x: stockChartXValues,
          y: stockChartYValues,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "blue" },
          name: stock,
        },
        {
          x: fiftyDaySMAXValues,
          y: fiftyDaySMAYValues,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "purple" },
          name: "50-day simple moving average",
        },
        {
          x: hundredDaySMAXValues,
          y: hundredDaySMAYValues,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
          name: "100-day simple moving average",
        },
        {
          x: twoHundredDaySMAXValues,
          y: twoHundredDaySMAYValues,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "green" },
          name: "200-day simple moving average",
        },
        {
          x: fiftyDayEMAXValues,
          y: fiftyDayEMAYValues,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "orange" },
          name: "50-day exponential moving average",
        },
      ]}
      layout={{
        xaxis: {
          linecolor: "black",
          mirror: true,
          range: [lastYearsDate, today],
          title: "Date",
        },
        yaxis: {
          linecolor: "black",
          mirror: true,
          title: "Stock Price",
        },
        width: 1500,
        height: 750,
        title: "Stock Chart for " + stock,
        bordercolor: "black",
      }}
    />
  );
};

export default Graph;
