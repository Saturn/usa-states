import React, { Component } from 'react';


class StartButton extends Component {

  startClickHandler () {
    console.log('Start was clicked!');
  }

  render () {
    return (
      <button id="start" onClick={this.startClickHandler}>
          Start!
      </button>
    )
  }
};


export default StartButton;
