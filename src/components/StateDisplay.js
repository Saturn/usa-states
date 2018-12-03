import React, { Component } from 'react';


class StateDisplay extends Component {

  render () {
    return (
      <div className="state-name">
      <h1>{ this.props.theState }</h1>
      </div>
    )
  }
};

export default StateDisplay;
