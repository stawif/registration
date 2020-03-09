import React, { Component, Fragment } from "react";

export default class InputPartyVillageField extends Component {
  

  onChange = e => {


    // var numm = e.target.value.trim();
    // e.target.value = numm;


    this.props.callbackFromParent(e.target.value);
    
  };

  render() {
    return (
      <Fragment>
        <input
            type="text"
            className="mb-2"
            //name="partyVillage"
            placeholder="Village"
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={this.onChange}
            required
          />
      </Fragment>
    );
  }
}
