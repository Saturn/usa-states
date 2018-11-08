import React, { Component } from 'react';
import './App.css';
import theStates from './states.json';

import StartButton from './components/buttons/StartButton';
import RestartButton from './components/buttons/RestartButton';
import Counter from './components/Counter.js';


class App extends Component {

  state = {
    started: false,
    score: 0,
    skipped: 0,
    theStates: this.getUSAStates()
  }

  getUSAStates () {
    const theStatesNew = {};
    theStates.forEach(value => {
      theStatesNew[value.id] = {id: value.id, name: value.name, done: 0}
    });
    return theStatesNew;
  }

  render() {
    let startButton;
    if (this.state.started === false) {
      startButton = <StartButton />;
    }

    let restartButton;
    let counterDisplay;
    if (this.state.started === true) {
      restartButton = <RestartButton />;
      counterDisplay = <Counter count={this.state.score}/>;
    }

    return (
      <div>
        {startButton}
        {restartButton}
        {counterDisplay}
      </div>
    );
  }
}

export default App;
