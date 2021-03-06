import React, { Component } from "react";

class RestartButton extends Component {
  render() {
    return (
      <button
        id="restart"
        className="restart-button"
        onClick={this.props.click}
      >
        Restart!
      </button>
    );
  }
}

export default RestartButton;
