import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

const Graph = ({
  stock,
  stockChartXValues,
  stockChartYValues,
  fiftyDayEMAYValues,
  fiftyDaySMAYValues,
  hundredDayEMAYValues,
  hundredDaySMAYValues,
  twoHundredDayEMAYValues,
  twoHundredDaySMAYValues,
  startingDay,
}) => {
  const yValues = [...stockChartYValues];
  const yAxisRange = yValues.sort(function (a, b) {
    return a - b;
  });
  const yMin = yAxisRange[0];
  const yMax = yAxisRange[252];

  const data = stockChartXValues.map((x, index) => ({
    name: x,
    stockValues: stockChartYValues[index],
    fiftyEMA: fiftyDayEMAYValues[index],
    fiftySMA: fiftyDaySMAYValues[index],
    hundredSMA: hundredDaySMAYValues[index],
    hundredEMA: hundredDayEMAYValues[index],
    twoHundredSMA: twoHundredDaySMAYValues[index],
    twoHundredEMA: twoHundredDayEMAYValues[index],
  }));

  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Stock Chart for {stock}
      </h3>
      <div style={{ marginBottom: "2vh", marginLeft: "3vw" }}>
        <button className="ui tiny button" onClick={() => startingDay(247)}>
          1w
        </button>
        <button className="ui tiny button" onClick={() => startingDay(231)}>
          1m
        </button>
        <button className="ui tiny button" onClick={() => startingDay(189)}>
          3m
        </button>
        <button className="ui tiny button" onClick={() => startingDay(126)}>
          6m
        </button>
        <button className="ui tiny button" onClick={() => startingDay(0)}>
          1y
        </button>
      </div>
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
        {hundredDayEMAYValues.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="hundredEMA"
            name="EMA 100"
            stroke="pink"
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
            name="SMA 100"
            stroke="purple"
            strokeWidth={1}
            dot={false}
          />
        ) : (
          ""
        )}
        {twoHundredDayEMAYValues.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="twoHundredEMA"
            name="EMA 200"
            stroke="black"
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
            name="SMA 200"
            stroke="orange"
            strokeWidth={1}
            dot={false}
          />
        ) : (
          ""
        )}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[yMin, yMax]} />
        <Legend />
      </LineChart>
    </>
  );
};

export default Graph;
