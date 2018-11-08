import React, { Component } from 'react';
import './App.css';
import theStates from './states.json';


const StartButton = (props) => (
    <button id="start" onClick={props.click}>
        Start!
    </button>
);


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

  startClickHandler () {
    console.log('Start was clicked!');
  }

  render() {
    console.log(this.state);
    console.log(this.state.started);

    let button;
    if (this.state.started === false) {
      button = <StartButton click={this.startClickHandler} />;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}

export default App;
