import React, { Component } from 'react';


class RestartButton extends Component {

  restartClickHandler () {
    console.log('Restart was clicked!');
  }

  render () {
    return (
      <button id="start" onClick={this.restartClickHandler}>
          Restart!
      </button>
    )
  }
};


export default RestartButton;
