import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Watchlist from "./Watchlist";
import { Indicator } from "./Indicator";
import StockDetail from "./StockDetail";
import Graph from "./Graph";

const API_KEY = process.env.REACT_APP_API_KEY;

export const App = () => {
  const [stock, setStock] = useState("AAPL");
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [fiftyDaySMAXValues, setFiftyDaySMAXValues] = useState([]);
  const [fiftyDaySMAYValues, setFiftyDaySMAYValues] = useState([]);
  const [fiftyDayEMAXValues, setFiftyDayEMAXValues] = useState([]);
  const [fiftyDayEMAYValues, setFiftyDayEMAYValues] = useState([]);
  const [hundredDaySMAXValues, setHundredDaySMAXValues] = useState([]);
  const [hundredDaySMAYValues, setHundredDaySMAYValues] = useState([]);
  const [twoHundredDaySMAXValues, setTwoHundredDaySMAXValues] = useState([]);
  const [twoHundredDaySMAYValues, setTwoHundredDaySMAYValues] = useState([]);
  const [fiftyTwoWeekHigh, setFiftyTwoWeekHigh] = useState(0);
  const [fiftyTwoWeekLow, setFiftyTwoWeekLow] = useState(0);

  useEffect(() => {
    const search = async () => {
      setFiftyDayEMAXValues([]);
      setFiftyDayEMAYValues([]);
      setFiftyDaySMAXValues([]);
      setFiftyDaySMAYValues([]);
      setHundredDaySMAXValues([]);
      setHundredDaySMAYValues([]);
      setTwoHundredDaySMAXValues([]);
      setTwoHundredDaySMAYValues([]);

      const data = await axios
        .get(`https://www.alphavantage.co/query`, {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: stock,
            outputsize: "full",
            apikey: API_KEY,
          },
        })
        .then((response) =>
          JSON.parse(JSON.stringify(response.data["Time Series (Daily)"]))
        );

      let xValues = [];
      let yValues = [];

      let lowValues = [];
      let highValues = [];

      for (var key1 in data) {
        xValues.push(key1);
        yValues.push(data[key1]["1. open"]);
        highValues.push(parseFloat(data[key1]["2. high"]));
        lowValues.push(parseFloat(data[key1]["3. low"]));
      }

      const low = lowValues.splice(0, 253).sort(function (a, b) {
        return a - b;
      });

      const high = highValues.splice(0, 253).sort(function (a, b) {
        return a - b;
      });

      setFiftyTwoWeekHigh((Math.round(high[252] * 100) / 100).toFixed(2));
      setFiftyTwoWeekLow((Math.round(low[0] * 100) / 100).toFixed(2));
      setStockChartXValues(xValues.splice(0, 253));
      setStockChartYValues(yValues.splice(0, 253));
    };

    if (stock) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (stock) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [stock]);

  const createMovingAverage = async (functionType, timePeriod) => {
    const movingAverageData = await axios
      .get(`https://www.alphavantage.co/query`, {
        params: {
          function: functionType,
          symbol: stock,
          interval: "daily",
          time_period: timePeriod,
          series_type: "open",
          apikey: API_KEY,
        },
      })
      .then((response) =>
        JSON.parse(
          JSON.stringify(
            response.data["Technical Analysis: " + functionType + ""]
          )
        )
      );

    let movingXValues = [];
    let movingYValues = [];

    for (var key2 in movingAverageData) {
      movingXValues.push(key2);
      movingYValues.push(movingAverageData[key2][functionType]);
    }

    if (timePeriod === "50" && functionType === "SMA") {
      setFiftyDaySMAXValues(movingXValues.splice(0, 253));
      setFiftyDaySMAYValues(movingYValues.splice(0, 253));
    } else if (timePeriod === "50" && functionType === "EMA") {
      setFiftyDayEMAXValues(movingXValues.splice(0, 253));
      setFiftyDayEMAYValues(movingYValues.splice(0, 253));
    } else if (timePeriod === "100" && functionType === "SMA") {
      setHundredDaySMAXValues(movingXValues.splice(0, 253));
      setHundredDaySMAYValues(movingYValues.splice(0, 253));
    } else if (timePeriod === "200" && functionType === "SMA") {
      setTwoHundredDaySMAXValues(movingXValues.splice(0, 253));
      setTwoHundredDaySMAYValues(movingYValues.splice(0, 253));
    }
  };

  const changeStock = (value) => {
    setStock(value);
  };

  return (
    <>
      <div className="ui center aligned header" style={{ margin: "10px" }}>
        <h1 className="ui block header">Stock Chart Generator</h1>
      </div>
      <div className="ui grid" style={{ margin: "10px" }}>
        <div className="fourteen wide stretched centered column">
          <SearchBar stock={stock} changeStock={changeStock} />
          <div className="ui center aligned field">
            <Graph
              stock={stock}
              stockChartXValues={stockChartXValues}
              stockChartYValues={stockChartYValues}
              fiftyDayEMAXValues={fiftyDayEMAXValues}
              fiftyDayEMAYValues={fiftyDayEMAYValues}
              fiftyDaySMAXValues={fiftyDaySMAXValues}
              fiftyDaySMAYValues={fiftyDaySMAYValues}
              hundredDaySMAXValues={hundredDaySMAXValues}
              hundredDaySMAYValues={hundredDaySMAYValues}
              twoHundredDaySMAXValues={twoHundredDaySMAXValues}
              twoHundredDaySMAYValues={twoHundredDaySMAYValues}
            />
            <Indicator createMovingAverage={createMovingAverage} />
            <br />
            <StockDetail
              fiftyTwoWeekHigh={fiftyTwoWeekHigh}
              fiftyTwoWeekLow={fiftyTwoWeekLow}
            />
          </div>
        </div>
        <div className="two wide column">
          <Watchlist changeStock={changeStock} />
        </div>
      </div>
    </>
  );
};

export default App;
