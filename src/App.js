import React, { Component } from 'react';
import './App.css';
import theStates from './states.json';

import StartButton from './components/buttons/StartButton';
import RestartButton from './components/buttons/RestartButton';
import Counter from './components/Counter.js';

import { shuffle } from 'lodash';

class App extends Component {

  constructor() {
    super();
    window.getUSAStateClicked = this.getUSAStateClicked;

    let theStates = this.getUSAStates();
    theStates = shuffle(theStates);

    this.state = {
      started: false,
      score: 0,
      skipped: 0,
      theStates: theStates
    }
  }

  getUSAStates () {
    const theStatesNew = {};
    theStates.forEach(value => {
      theStatesNew[value.id] = {id: value.id, name: value.name, done: 0}
    });
    return theStatesNew;
  }

  incrementCounter() {
    this.setState({score: this.state.score + 1});
  }

  getUSAStateClicked(the_state) {
    console.log(the_state);
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
