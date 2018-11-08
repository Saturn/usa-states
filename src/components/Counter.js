import React, { Component } from 'react';


class Counter extends Component {

  render () {
    return (
      <p>{this.props.count}/50</p>
    )
  }
};


export default Counter;
