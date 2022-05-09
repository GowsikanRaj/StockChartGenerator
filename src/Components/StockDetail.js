import React from "react";

const StockDetail = ({ fiftyTwoWeekHigh, fiftyTwoWeekLow }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">Stock Details</div>
      </div>
      <div className="content">
        <div className=" description">
          <h3>52 week high: {fiftyTwoWeekHigh}</h3>
          <h3>52 week low: {fiftyTwoWeekLow}</h3>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
