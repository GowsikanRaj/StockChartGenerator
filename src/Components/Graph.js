import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

const Graph = ({
  stock,
  stockChartXValues,
  stockChartYValues,
  fiftyDayEMAYValues,
  fiftyDaySMAYValues,
  hundredDaySMAYValues,
  twoHundredDaySMAYValues,
}) => {
  const yValues = [...stockChartYValues];
  const yAxisRange = yValues.sort(function (a, b) {
    return a - b;
  });
  const min = yAxisRange[0];
  const max = yAxisRange[252];

  const data = stockChartXValues.map((x, index) => ({
    name: x,
    stockValues: stockChartYValues[index],
    fiftyEMA: fiftyDayEMAYValues[index],
    fiftySMA: fiftyDaySMAYValues[index],
    hundredSMA: hundredDaySMAYValues[index],
    twoHundredSMA: twoHundredDaySMAYValues[index],
  }));

  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Stock Chart for {stock}
      </h3>
      <LineChart width={1500} height={750} data={data}>
        <Line
          type="monotone"
          dataKey="stockValues"
          name={stock}
          stroke="blue"
          strokeWidth={1}
          dot={false}
        />
        {fiftyDayEMAYValues.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="fiftyEMA"
            name="EMA 50"
            stroke="red"
            strokeWidth={1}
            dot={false}
          />
        ) : (
          ""
        )}
        {fiftyDaySMAYValues.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="fiftySMA"
            name="SMA 50"
            stroke="green"
            strokeWidth={1}
            dot={false}
          />
        ) : (
          ""
        )}
        {hundredDaySMAYValues.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="hundredSMA"
            name="EMA 100"
            stroke="purple"
            strokeWidth={1}
            dot={false}
          />
        ) : (
          ""
        )}
        {twoHundredDaySMAYValues.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="twoHundredSMA"
            name="EMA 200"
            stroke="orange"
            strokeWidth={1}
            dot={false}
          />
        ) : (
          ""
        )}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[min, max]} />
        <Legend />
      </LineChart>
    </>
  );
};

export default Graph;
