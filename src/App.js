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
    this.state = this.getInitialState();
  }

  componentDidMount() {
    this.setNextState();
  }

  getInitialState() {
    this.theStates = this.getUSAStates();
    return {
      started: false,
      score: 0,
      skipped: new Set(),
      done: new Set(),
      left: this.theStates,
      current: null
    }
  }

  getUSAStates() {
    const theStatesNew = [];
    theStates.forEach(value => {
      theStatesNew.push(value.name);
    });
    return new Set(shuffle(theStatesNew));
  }

  setNextState() {
    let found;
    for (let state of this.state.left){
      if (!found && !this.state.done.has(state)){
        found = state;
      }
    }
    this.setState({current: found});
  }

  checkTheState = (the_state) => {
    return the_state === this.state.current;
  }

  incrementCounter() {
    this.setState({score: this.state.score + 1});
  }

  startClickHandler = () => {
    this.setState({started: true});
  }

  restartClickHandler = () => {
    this.setState(this.getInitialState());
  }

  render() {
    let startButton;
    let restartButton;
    let counterDisplay;

    if (this.state.started === false) {
      startButton = <StartButton click={this.startClickHandler}/>;
    }
    else {
      restartButton = <RestartButton click={this.restartClickHandler}/>;
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
