import React, { Component } from 'react';
import './App.css';
import listOfStates from './states.json';

import StartButton from './components/buttons/StartButton';
import RestartButton from './components/buttons/RestartButton';
import SkipButton from './components/buttons/SkipButton';
import Counter from './components/Counter.js';
import StateDisplay from './components/StateDisplay.js';

import { shuffle } from 'lodash';


const getUSStateList = () => {
    const theStatesNew = [];
    shuffle(listOfStates).forEach(value => {
        theStatesNew.push({
            name: value.name,
            id: value.id,
            done: false,
            skipped: false
        });
    });
    return theStatesNew;
}

let theStateList = getUSStateList();


class App extends Component {

  constructor() {
    super();
    this.state = this.getInitialState();
    this.map = window.renderMap();

    window.map = this.map;
    window.checkTheState = this.checkTheState;
  }

  componentDidMount() {
  }

  getInitialState() {
    return {
      started: false,
      score: 0,
      skipped: 0,
      current: 0,
      complete: false
    }
  }

  setCurrent() {
    let newCurrent = null;
    let checkForSkipped = true;
    if (this.state.score + this.state.skipped === theStateList.length){
      for (let state of theStateList){
        state.skipped = false;
        this.setState({skipped: 0})
      }
    }
    for (let i = 0; i < theStateList.length; i++){
          if (!theStateList[i].done && !theStateList[i].skipped){
            newCurrent = i;
          }
          if (newCurrent !== null){
            break;
          }
    }
    this.setState({
      current: newCurrent
    });
  }

  markStateDone() {
    theStateList[this.state.current].done = true;
    let newScore = this.state.score += 1;
    if (newScore === 50){
      this.setState({complete: true});
    }
    this.setState(
      {score: newScore},
      () => {this.setCurrent()}
    );
  }

  checkTheState = (the_state) => {
    if (the_state.name === theStateList[this.state.current].name){
      this.markStateColor(the_state.id);
      this.markStateDone();
    }
  }

  skipTheState() {
    theStateList[this.state.current].skipped = true;
    this.setState(
      {skipped: this.state.skipped += 1},
      () => {this.setCurrent()}
    );
  }

  markStateColor(state_id) {
    this.map.updateChoropleth(
      {[state_id]: {fillKey: 'done'}
    });
  }

  getCurrentStateName() {
    return theStateList[this.state.current].name;
  }

  redrawMap() {
    let states = getUSStateList();
    let stateIds = {};
    for (let i = 0; i < states.length; i++){
      stateIds[states[i].id] = {fillkey: 'done'}
    }
    this.map.updateChoropleth(stateIds);
  }

  startClickHandler = () => {
    this.setCurrent();
    this.setState({started: true});
  }

  restartClickHandler = () => {
    this.redrawMap()
    theStateList = getUSStateList();
    this.setState(
      this.getInitialState(),
      () => {this.setCurrent()}
    );
  }

  skipClickHandler = (the_state) => {
    this.skipTheState()
  }

  render() {
    let startButton;
    let restartButton;
    let counterDisplay;
    let stateDisplay;
    let skipButton;
    let complete;

    if (this.state.started === false) {
      startButton = <StartButton click={this.startClickHandler}/>;
    }
    else {
      restartButton = <RestartButton click={this.restartClickHandler}/>;
      counterDisplay = <Counter count={this.state.score}/>;
      stateDisplay = <StateDisplay theState={this.getCurrentStateName()}/>;
      skipButton = <SkipButton theState={this.state.current}
                               click={this.skipClickHandler}/>
    }

    if (this.state.complete) {
      complete = <h1> Yahooo! </h1>
    }

    return (
      <div>
        {startButton}
        {restartButton}
        {counterDisplay}
        {stateDisplay}
        {skipButton}
        {complete}
      </div>
    );
  }
}

export default App;
