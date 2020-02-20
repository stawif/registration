//this file is used to show radio buttons in party registration page
// this export 4 radio buttons


import React, { Component } from "react";

export default class RadioButtons extends Component {
  constructor() {
    super();
    this.state = { checked: -1 };
  }

  onChange(i) {
    
    this.setState({
      checked: i
    });
    console.log(i);
  }

  render() {
    return (
      <div>
        {["machine_work", "vehicle_work", "daily_work", "purchase_party"].map(
          (option, i) => {
            return (
              <label key={i}>
                <input
                  type="radio"
                  checked={this.state.checked === i ? true : false}
                  key={i + 100}
                  onChange={this.onChange.bind(this, i)}
                  value={option}
                  required
                />
                {option}
              </label>
            );
          }
        )}
      </div>
    );
  }
}

