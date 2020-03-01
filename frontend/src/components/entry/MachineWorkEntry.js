import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
export default class MachineWorkEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyNamesFromApi: [],
      machineNamesFromApi: [],

      date: null,
      selectedMachine: "",
      selectedParty: "",
      remark: "",
      dieselAmount: 0,
      drillingFeet: 0,
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      },
      radioButtonStyle: {
        float: "left"
      }
    };

    this.state.fetchProduct = async () => {
      fetch("http://127.0.0.1:8000/list-of-machineparty/")
        .then(res => res.json())
        .then(out => {
          out.map(item => this.state.partyNamesFromApi.push(item.name));
        })
        .catch(err => {
          throw err;
        });

      fetch("http://127.0.0.1:8000/list-of-machines/")
        .then(res => res.json())
        .then(out => {
          out.map(item => this.state.machineNamesFromApi.push(item.name));
        })
        .catch(err => {
          throw err;
        });
    };

    console.log(this.state.machineNamesFromApi);
    console.log(this.state.partyNamesFromApi);
    this.state.fetchProduct();
    // Check existence of party name
    this.state.checkparty = dataFromChild => {
      try {
        this.setState({
          buttonStatus: {
            visibility: "hidden"
          }
        });
        const showList = item => {
          if (dataFromChild.toLowerCase() === item.toLowerCase()) {
            this.setState({
              buttonStatus: {
                visibility: "visible"
              }
            });
          } else {
          }
        };
        this.state.partyNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    this.state.checkmachine = dataFromChild => {
      try {
        this.setState({
          buttonStatus: {
            visibility: "hidden"
          }
        });
        const showList = item => {
          if (dataFromChild.toLowerCase() === item.toLowerCase()) {
            this.setState({
              buttonStatus: {
                visibility: "visible"
              }
            });
          } else {
          }
        };
        this.state.machineNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/enter-machineparty-work/", {
          party: this.state.selectedParty,
          machine: this.state.selectedMachine,
          date: this.state.date,
          drilling_feet: this.state.drillingFeet,
          diesel_amount: this.state.dieselAmount,
          remark: this.state.remark
        })
        .then(res => {
          this.setState({
            responseMessage: res.data
          });
        })
        .catch(error => {
          alert(error.response.request._response);
        });
      console.log(this.state.selectedParty);
      console.log(this.state.selectedMachine);
      console.log(this.state.date);
      console.log(this.state.drillingFeet);
      console.log(this.state.dieselAmount);
      console.log(this.state.remark);
      e.target.reset();
      e.preventDefault();
    };

    this.state.getDate = () => {
      var curr = new Date();
      curr.setDate(curr.getDate());
      var date = curr.toISOString().substr(0, 10);
      this.state.date = date;
    };

    this.state.getDate();
  }

  myCallbackForSelectedParty = dataFromChild => {
    this.state.selectedParty = dataFromChild;
  };
  myCallbackForSelectedMachine = dataFromChild => {
    this.state.selectedMachine = dataFromChild;
  };

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Machine Work Entry</p>
        <div className="pt-5">
          <Autocomplete
            suggestions={this.state.partyNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedParty}
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />

          <p>{this.state.partyExistMessage}</p>
          <br />

          <Autocomplete
            suggestions={this.state.machineNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedMachine}
            placeholderfrom={"Machine name"}
            checkFromParent={this.state.checkmachine}
          />

          <br />
          <br />

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

          <br />
          <br />

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

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="dieselAmount"
            placeholder="Diesel Amount"
            autoComplete="off"
            onChange={e => {
              this.state.dieselAmount = parseInt(e.target.value);
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="drillingFeet"
            placeholder="Drilling Feet"
            autoComplete="off"
            onChange={e => {
              this.state.drillingFeet = parseInt(e.target.value);
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
