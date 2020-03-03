import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class InputContactField extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onChange = e => {
    var numm = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = numm;

    this.props.callbackFromParent(e.target.value);
  };

  render() {
    return (
      <Fragment>
        <input
          type="text"
          className="mb-2"
          maxLength="10"
          placeholder="Enter 10 digit Phone no"
          autoComplete="off"
          onChange={this.onChange}
          required
        />
      </Fragment>
    );
  }
}
