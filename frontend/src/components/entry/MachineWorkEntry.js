import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
//import Autosuggest from "react-autosuggest";

// Imagine you have a list of languages that you'd like to autosuggest.

const languages = [];

fetch("http://127.0.0.1:8000/list-of-machineparty/")
  .then(res => res.json())
  .then(out => {
    console.log("ashok", out);

    ashok(out);
  })
  .catch(err => {
    throw err;
  });
//below function is used to store api data in a array
function ashok(data) {
  data.map(item => languages.push(item.name));
  console.log("langu", languages);
}

export default class MachinePartyRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,

      partyList: [],
      machineList: [],

      selectedMachine: null,
      selectedParty: null,

      partyExistMessage: [],

      //   value: "",
      //   suggestions: [],

      remark: null,
      dieselamount: null,
      drillingFeet: null,

      buttonStatus: {
        visibility: "visible"
      },
      radioButtonStyle: {
        float: "left"
      }
    };

    // Fetch party list from server
    this.state.fetchProduct = async () => {
      const responsepartyList = await fetch(
        "http://127.0.0.1:8000/list-of-machineparty/"
      );
      const jsonpartyList = await responsepartyList.json();
      this.state.partyList = jsonpartyList;

      const responsemachineList = await fetch(
        "http://127.0.0.1:8000/list-of-machines/"
      );
      const jsonmachineList = await responsemachineList.json();
      this.state.machineList = jsonmachineList;
    };

    this.state.fetchProduct();

    // Check existence of party name
    this.state.checkparty = () => {
      try {
        this.setState({
          partyExistMessage: [],
          buttonStatus: {
            visibility: "visible"
          }
        });

        // this.state.partyExistMessage = [];
        const showList = (item, index) => {
          if (
            item.name
              .toLowerCase()
              .startsWith(this.state.partyName.toLowerCase())
          ) {
            this.state.partyExistMessage.push(item.name.toLowerCase());
            //this.state.partyExistMessage=item.name.toLowerCase();

            this.setState({
              partyExistMessage: this.state.partyExistMessage,
              buttonStatus: {
                visibility: "hidden"
              }
            });
          } else {
          }
        };
        this.state.partyList.forEach(showList);
      } catch (err) {}
    };

    this.state.onSubmit = e => {
      //   axios
      //     .post("", {
      //       name: this.state.partyName,
      //       contact: this.state.partyContact,
      //       village: this.state.partyVillage
      //     })
      //     .then(res => {
      //       this.state.fetchProduct();
      //     })
      //     .catch(error => {
      //       alert(error.response.request._response);
      //     });
      console.log(this.state.date);
      console.log(this.state.dieselamount);
      console.log(this.state.drillingFeet);
      console.log(this.state.remark);
      console.log(this.state.selectedParty);
      console.log(this.state.selectedMachine);

      e.target.reset();
      e.preventDefault();
    };

    this.state.getDate = () => {
      // var date = { currentTime: new Date().toLocaleString() }
      var curr = new Date();
      curr.setDate(curr.getDate() + 3);
      var date = curr.toISOString().substr(0, 10);
      this.state.date = date;
    };

    this.state.getDate();
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a programming language",
      value,
      onChange: this.onChange
    };

    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Machine Party Registration</p>
        <div className="pt-5">
          <Autocomplete suggestions={languages} />

          <input
            type="date"
            //data-date=""
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.state.date = e.target.value;
            }}
            required
         />
          <input
            type="text"
            className="mb-2"
            name="remark"
            placeholder="Remark"
            autoComplete="off"
            maxLength="30"
            //minLength="5"
            onChange={e => {
              this.state.remark = e.target.value;
            }}
            //required
          />
          <input
            type="number"
            className="mb-2"
            name="dieselAmount"
            placeholder="Diesel Amount"
            autoComplete="off"
            onChange={e => {
              this.state.dieselamount = e.target.value;
            }}
            required
          />
          <input
            type="number"
            className="mb-2"
            name="drillingFeet"
            placeholder="Drilling Feet"
            autoComplete="off"
            onChange={e => {
              this.state.drillingFeet = e.target.value;
            }}
            required
          />
        </div>
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
