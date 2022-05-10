import React from "react";

export const Indicator = ({ createMovingAverage }) => {
  return (
    <div>
      <button
        className="ui tiny button"
        onClick={() => createMovingAverage("SMA", "50")}
      >
        Add 50 Day Simple Moving Average
      </button>
      <button
        className="ui tiny button"
        onClick={() => createMovingAverage("SMA", "100")}
      >
        Add 100 Day Simple Moving Average
      </button>
      <button
        className="ui tiny button"
        onClick={() => createMovingAverage("SMA", "200")}
      >
        Add 200 Day Simple Moving Average
      </button>
      <button
        className="ui tiny button"
        onClick={() => createMovingAverage("EMA", "50")}
      >
        Add 50 Day Exponential Moving Average
      </button>
      <button
        className="ui tiny button"
        onClick={() => createMovingAverage("EMA", "100")}
      >
        Add 100 Day Exponential Moving Average
      </button>
      <button
        className="ui tiny button"
        onClick={() => createMovingAverage("EMA", "200")}
      >
        Add 200 Day Exponential Moving Average
      </button>
    </div>
  );
};
