import React, { Component } from 'react';


class Counter extends Component {

  render () {
    return (
      <div>
      <div className="counter">
      <p>{this.props.count}/50</p>
      </div>
      </div>
    )
  }
};


export default Counter;
