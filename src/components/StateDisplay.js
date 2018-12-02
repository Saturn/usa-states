import React, { Component } from 'react';


class StateDisplay extends Component {

  render () {
    return (
      <h1>{ this.props.theState }</h1>
    )
  }
};

export default StateDisplay;
