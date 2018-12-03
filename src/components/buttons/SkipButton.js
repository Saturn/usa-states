import React, { Component } from 'react';


class SkipButton extends Component {

  render () {
    return (
      <div>
      <button id="skip" className="skip-button" onClick={() => {
        this.props.click(this.props.theState)}}>
          Skip
      </button>
      </div>
    )
  }
};

export default SkipButton;
