import React, { Component } from 'react';
import './App.css';
import listOfStates from './states.json';

import StartButton from './components/buttons/StartButton';
import RestartButton from './components/buttons/RestartButton';
import Counter from './components/Counter.js';
import StateDisplay from './components/StateDisplay.js';

import { shuffle } from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = this.getInitialState();
    this.map = window.renderMap();
    window.map = this.map;
    window.checkTheState = this.checkTheState;
  }

  componentDidMount() {
    this.setNextState();
  }

  getInitialState() {
    let theStates = this.getUSAStates();
    return {
      started: false,
      score: 0,
      skipped: new Set(),
      done: new Set(),
      left: theStates,
      current: null
    }
  }

  getUSAStates() {
    const theStatesNew = [];
    listOfStates.forEach(value => {
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
    console.log(the_state);
    if (this.state.started){
      if (the_state.name === this.state.current){
        this.setState({done: new Set(this.state.done.add(the_state.name))});
        this.incrementCounter();
        this.markStateColor(the_state.id);
        this.setNextState();
      }
    }
  }

  markStateColor(state_id) {
    this.map.updateChoropleth({[state_id]: {fillKey: 'done'}});
  }

  incrementCounter() {
    this.setState({score: this.state.score + 1});
  }

  startClickHandler = () => {
    this.setState({started: true});
  }

  restartClickHandler = () => {
    this.setState(this.getInitialState());
    this.setNextState();
  }

  render() {
    let startButton;
    let restartButton;
    let counterDisplay;
    let stateDisplay;

    if (this.state.started === false) {
      startButton = <StartButton click={this.startClickHandler}/>;
    }
    else {
      restartButton = <RestartButton click={this.restartClickHandler}/>;
      counterDisplay = <Counter count={this.state.score}/>;
      stateDisplay = <StateDisplay theState={this.state.current}/>;
    }

    return (
      <div>
        {startButton}
        {restartButton}
        {counterDisplay}
        {stateDisplay}
      </div>
    );
  }
}

export default App;
