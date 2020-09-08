import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <div className="counter">
          <p>Score: {this.props.count}</p>
        </div>
      </div>
    );
  }
}

export default Counter;
