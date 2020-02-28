import React from "react";
import axios from "axios";

export default class DailyWorkEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyName: "",
      partyContact: "",
      partyVillage: "",
      date: null,
      fiveFeet: 0,
      fiveFeetRate: 0,
      twoHalfFeet: 0,
      twoHalfFeetRate: 0,
      dieselSpend: 0,
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    };

    this.state.onChange = () => {
      this.setState({
        workerExistMessage: "",
        responseMessage: ""
      });
    };

    //Form Handler
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/enter-daily-work/", {
          name: this.state.partyName,
          contact: this.state.partyContact,
          village: this.state.partyVillage,
          date: this.state.date,
          five_feet: this.state.fiveFeet,
          five_feet_rate: this.state.fiveFeetRate,
          two_half_feet: this.state.twoHalfFeet,
          two_half_feet_rate: this.state.twoHalfFeetRate,
          diesel_spend: this.state.dieselSpend
        })
        .then(res => {
          this.setState({
            responseMessage: res.data
          });
        })
        .catch(error => {
          console.log(error.response.request._response);
        });

      e.target.reset();
      e.preventDefault();
    };

    //Getting Current Date
    this.state.getDate = () => {
      var curr = new Date();
      curr.setDate(curr.getDate());
      var date = curr.toISOString().substr(0, 10);
      this.state.date = date;
      console.log(this.state.date);
    };

    this.state.getDate();
  }

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Daily Work Entry</p>
        <div className="pt-5">
          <input
            type="text"
            className="mb-2"
            name="partyName"
            placeholder="Party Name"
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={e => {
              this.state.partyName = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <p>{this.state.workerExistMessage}</p>
          <br />

          <input
            type="number"
            className="mb-2"
            name="partyContact"
            placeholder="Phone No"
            autoComplete="off"
            maxLength="10"
            minLength="10"
            onChange={e => {
              this.state.partyContact = parseInt(e.target.value);
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="text"
            className="mb-2"
            name="partyVillage"
            placeholder="Village"
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={e => {
              this.state.partyVillage = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="date"
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.state.date = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="fiveFeet"
            placeholder="5 Feet"
            autoComplete="off"
            onChange={e => {
              this.state.fiveFeet = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            step="0.1"
            className="mb-2"
            name="fiveFeetRate"
            placeholder="5 Feet Rate"
            autoComplete="off"
            onChange={e => {
              this.state.fiveFeetRate = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="twoHalfFeet"
            placeholder="2.5 Feet"
            autoComplete="off"
            onChange={e => {
              this.state.twoHalfFeet = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            step="0.1"
            className="mb-2"
            name="twoHalfFeetRate"
            placeholder="2.5 Feet Rate"
            autoComplete="off"
            onChange={e => {
              this.state.twoHalfFeetRate = e.target.value;
              this.state.onChange();
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="dieselSpend"
            placeholder="Diesel Spend"
            autoComplete="off"
            onChange={e => {
              this.state.dieselSpend = e.target.value;
              this.state.onChange();
            }}
            required
          />
        </div>
        <p>{this.state.responseMessage}</p>
        <button
          type="submit"
          className="btn btn-outline-dark"
          style={this.state.buttonStatus}
        >
          Save
        </button>
      </form>
    );
  }
}
