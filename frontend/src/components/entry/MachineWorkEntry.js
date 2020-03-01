import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
import InputDateField from "../modular/InputDateField";
import InputRemarkField from "../modular/InputRemarkField";
import InputQuantityField from "../modular/InputQuantityField";
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

    //Fetching Machines And Machine Parties from DataBase
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

    this.state.fetchProduct();

    // Check existence of party name
    this.state.checkparty = dataFromChild => {
      try {
        this.setState({
          responseMessage: "",
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

    //Check Existance for MAchine name
    this.state.checkmachine = dataFromChild => {
      try {
        this.setState({
          responseMessage: "",
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

    //form Handler Submitting
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

        console.log(this.state.selectedParty,
          this.state.selectedMachine,
          this.state.date,
           this.state.drillingFeet,
           this.state.dieselAmount,
           this.state.remark);
        

      e.target.reset();
      e.preventDefault();
    };
  }

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
            callbackFromParent={dataFromChild => {
              this.state.selectedParty = dataFromChild;
            }}
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />

          <p>{this.state.partyExistMessage}</p>
          <br />

          <Autocomplete
            suggestions={this.state.machineNamesFromApi}
            callbackFromParent={dataFromChild => {
              this.state.selectedMachine = dataFromChild;
            }}
            placeholderfrom={"Machine name"}
            checkFromParent={this.state.checkmachine}
          />

          <br />
          <br />

          <InputDateField
            callbackFromParent={dataFromChild => {
              this.state.date = dataFromChild;
            }}
          />
          <br />
          <br />

          <InputRemarkField
            callbackFromParent={dataFromChild => {
              this.state.remark = dataFromChild;
            }}
          />

          <br />
          <br />
          <InputQuantityField
            placeholder={"Diesel Amount"}
            callbackFromParent={dataFromChild => {
              this.state.dieselAmount = parseInt(dataFromChild);
            }}
          />

          <br />
          <br />

          <InputQuantityField
            placeholder={"Drilling Feet"}
            callbackFromParent={dataFromChild => {
              this.state.drillingFeet = parseInt(dataFromChild);
            }}
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
