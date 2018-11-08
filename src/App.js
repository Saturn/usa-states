import React, { Component } from 'react';
import './App.css';
import theStates from './states.json';

import StartButton from './components/buttons/StartButton';
import RestartButton from './components/buttons/RestartButton';


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
    console.log(this.state);
    console.log(this.state.started);

    let button;
    if (this.state.started === false) {
      button = <StartButton />;
    }

    return (
      <div>
        {button}
        <RestartButton />
      </div>
    );
  }
}

export default App;
