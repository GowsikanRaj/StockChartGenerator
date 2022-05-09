import React, { Component } from "react";
import { connect } from "react-redux";
import { getWatchlist, removeFromWatchlist } from "../Actions";

class Watchlist extends Component {
  componentDidMount() {
    this.props.getWatchlist();
  }
  render() {
    const { changeStock } = this.props;
    return (
      <div className="ui secondary vertical menu">
        <h3>Stock Watchlist</h3>
        {this.props.watchlist.map((item) => (
          <>
            <button
              className="ui tiny button"
              onClick={() => changeStock(item.Stock)}
            >
              {item.Stock}
            </button>
            <button
              className="negative ui tiny button"
              onClick={() => this.props.removeFromWatchlist(item.id)}
            >
              Remove
            </button>
            <br />
            <br />
          </>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    watchlist: Object.values(state.watchlist),
  };
};

export default connect(mapStateToProps, { getWatchlist, removeFromWatchlist })(
  Watchlist
);
