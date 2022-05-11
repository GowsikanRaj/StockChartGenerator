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
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [fiftyDaySMAYValues, setFiftyDaySMAYValues] = useState([]);
  const [fiftyDayEMAYValues, setFiftyDayEMAYValues] = useState([]);
  const [hundredDaySMAYValues, setHundredDaySMAYValues] = useState([]);
  const [hundredDayEMAYValues, setHundredDayEMAYValues] = useState([]);
  const [twoHundredDaySMAYValues, setTwoHundredDaySMAYValues] = useState([]);
  const [twoHundredDayEMAYValues, setTwoHundredDayEMAYValues] = useState([]);
  const [fiftyEMA, setFiftyEMA] = useState([]);
  const [fiftySMA, setFiftySMA] = useState([]);
  const [hundredEMA, setHundredEMA] = useState([]);
  const [hundredSMA, setHundredSMA] = useState([]);
  const [twoHundredEMA, setTwoHundredEMA] = useState([]);
  const [twoHundredSMA, setTwoHundredSMA] = useState([]);
  const [fiftyTwoWeekHigh, setFiftyTwoWeekHigh] = useState(0);
  const [fiftyTwoWeekLow, setFiftyTwoWeekLow] = useState(0);

  useEffect(() => {
    const search = async () => {
      setFiftyDayEMAYValues([]);
      setFiftyEMA([]);
      setFiftyDaySMAYValues([]);
      setFiftySMA([]);
      setHundredDaySMAYValues([]);
      setHundredSMA([]);
      setHundredDayEMAYValues([]);
      setHundredEMA([]);
      setTwoHundredDaySMAYValues([]);
      setTwoHundredSMA([]);
      setTwoHundredDayEMAYValues([]);
      setTwoHundredEMA([]);

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
      setStockChartXValues([...xValues].splice(0, 253).reverse());
      setStockChartYValues([...yValues].splice(0, 253).reverse());
      setXValues([...xValues].splice(0, 253).reverse());
      setYValues([...yValues].splice(0, 253).reverse());
    };

    if (stock && !stockChartXValues.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (stock) {
          search();
        }
      }, 3000);

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
      setFiftyDaySMAYValues([...movingYValues].splice(0, 253).reverse());
      setFiftySMA([...movingYValues].splice(0, 253).reverse());
    } else if (timePeriod === "50" && functionType === "EMA") {
      setFiftyDayEMAYValues([...movingYValues].splice(0, 253).reverse());
      setFiftyEMA([...movingYValues].splice(0, 253).reverse());
    } else if (timePeriod === "100" && functionType === "SMA") {
      setHundredDaySMAYValues([...movingYValues].splice(0, 253).reverse());
      setHundredSMA([...movingYValues].splice(0, 253).reverse());
    } else if (timePeriod === "100" && functionType === "EMA") {
      setHundredDayEMAYValues([...movingYValues].splice(0, 253).reverse());
      setHundredEMA([...movingYValues].splice(0, 253).reverse());
    } else if (timePeriod === "200" && functionType === "SMA") {
      setTwoHundredDaySMAYValues([...movingYValues].splice(0, 253).reverse());
      setTwoHundredSMA([...movingYValues].splice(0, 253).reverse());
    } else if (timePeriod === "200" && functionType === "EMA") {
      setTwoHundredDayEMAYValues([...movingYValues].splice(0, 253).reverse());
      setTwoHundredEMA([...movingYValues].splice(0, 253).reverse());
    }
  };

  const changeStock = (value) => {
    setStock(value);
  };

  const changeStartingDay = (values) => {
    let datax = [...stockChartXValues];
    let datay = [...stockChartYValues];
    let fiftyemay = [...fiftyDayEMAYValues];
    let fiftysmay = [...fiftyDaySMAYValues];
    let hundredemay = [...hundredDayEMAYValues];
    let hundredsmay = [...hundredDaySMAYValues];
    let twohundredemay = [...twoHundredDayEMAYValues];
    let twohundredsmay = [...twoHundredDaySMAYValues];
    setXValues(datax.splice(values, 253));
    setYValues(datay.splice(values, 253));
    setFiftyEMA(fiftyemay.splice(values, 253));
    setFiftySMA(fiftysmay.splice(values, 253));
    setHundredEMA(hundredemay.splice(values, 253));
    setHundredSMA(hundredsmay.splice(values, 253));
    setTwoHundredEMA(twohundredemay.splice(values, 253));
    setTwoHundredSMA(twohundredsmay.splice(values, 253));
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
              stockChartXValues={xValues}
              stockChartYValues={yValues}
              fiftyDayEMAYValues={fiftyEMA}
              fiftyDaySMAYValues={fiftySMA}
              hundredDaySMAYValues={hundredSMA}
              hundredDayEMAYValues={hundredEMA}
              twoHundredDayEMAYValues={twoHundredEMA}
              twoHundredDaySMAYValues={twoHundredSMA}
              startingDay={changeStartingDay}
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
