import React, {
  Component
} from 'react';
import './App.css';
import listOfStates from './states.json';

import StartButton from './components/buttons/StartButton';
import RestartButton from './components/buttons/RestartButton';
import Counter from './components/Counter.js';
import StateDisplay from './components/StateDisplay.js';

import {
  shuffle
} from 'lodash';


const getListOfStates = () => {
  return shuffle(listOfStates);
}

let theStateList = getListOfStates();



class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.map = window.renderMap();
    this.correctStates = new Set();

    window.map = this.map;
    window.checkTheState = this.checkTheState;
  }

  getInitialState() {
    return {
      started: false,
      score: 0,
      current: 0,
      complete: false
    };
  }

  checkTheState = (the_state) => {
    if (this.correctStates.has(the_state.id) || this.state.complete === true){
      return;
    }
    let score = 0;
    if (the_state.name === theStateList[this.state.current].name) {
      this.markStateCorrect(the_state.id);
      this.correctStates.add(the_state.id);
      score = 1;
    } else {
      this.markStateIncorrect(the_state.id);
    }
    let newCurrent = this.state.current + 1;
    if (newCurrent === theStateList.length) {
      this.setState({
        complete: true
      });
    } else {
      this.setState({
        score: this.state.score + score,
        current: this.state.current + 1
      });
    }
  }

  markStateCorrect(state_id) {
    this.markStateColor(state_id, 'correct');
  }

  markStateIncorrect(state_id) {
    this.markStateColor(state_id, 'incorrect');
  }

  markStateColor(state_id, color_key) {
    this.map.updateChoropleth({
      [state_id]: {
        fillKey: color_key
      }
    });
  }

  getCurrentStateName() {
    return theStateList[this.state.current].name;
  }

  redrawMap() {
    let states = getListOfStates();
    let stateIds = {};
    for (let i = 0; i < states.length; i++) {
      stateIds[states[i].id] = {
        fillkey: 'defaultFill'
      }
    }
    this.map.updateChoropleth(stateIds);
  }

  startClickHandler = () => {
    window.gameStarted = true;
    this.setState({
      started: true
    });
  }

  restartClickHandler = () => {
    window.gameStarted = false;
    this.redrawMap()
    theStateList = getListOfStates();
    this.setState(this.getInitialState());
  }

  skipClickHandler = (the_state) => {
    this.skipTheState()
  }

  render() {
    let startButton;
    let restartButton;
    let counterDisplay;
    let stateDisplay;
    let complete;

    if (this.state.started === false) {
      startButton = < StartButton click = {
        this.startClickHandler
      }
      />;
    } else {
      restartButton = < RestartButton click = {
        this.restartClickHandler
      }
      />;
      if (!this.state.complete) {
        counterDisplay = < Counter count = {
          this.state.score
        }
        />;
        stateDisplay = < StateDisplay theState = {
          this.getCurrentStateName()
        }
        />;
      }
    }

    if (this.state.complete) {
      complete = ( <
        >
        <
        h1 > Game Over < /h1> <
        h2 > You scored {
          this.state.score
        } < /h2> <
        />
      )
    }

    return ( <
      div > {
        startButton
      } {
        restartButton
      } {
        counterDisplay
      } {
        stateDisplay
      } {
        complete
      } <
      /div>
    );
  }
}

export default App;