import React from "react";
import axios from "axios";
import './entry.css';
import Autocomplete from "./AutoComplete.jsx";
import InputDateField from "../modular/InputDateField";
import InputRemarkField from "../modular/InputRemarkField";
import InputQuantityField from "../modular/InputQuantityField";
import InputRateField from "../modular/InputRateField";


export default class MachineWorkEntry extends React.Component {
  //Fetching Machines And Machine Parties from DataBase
  fetchProduct = async () => {
    try {
      const responsePartyList = await fetch(
        "http://127.0.0.1:8000/list-of-machineparty/"
      );
      const jsonPartyList = await responsePartyList.json();

      jsonPartyList.map(item => this.state.partyNamesFromApi.push(item.name));

      const responseMachineList = await fetch(
        "http://127.0.0.1:8000/list-of-machines/"
      );
      const jsonMachineList = await responseMachineList.json();

      jsonMachineList.map(item =>
        this.setState({ 
          machineNamesFromApi: [...this.state.machineNamesFromApi, item.name] 
        })
      );
    } catch {
      this.toggleLoadStatus();
    }
  };

  // Check existence of party name
  checkParty = dataFromChild => {
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
  checkMachine = dataFromChild => {
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
  onSubmit = e => {
    axios
      .post("http://127.0.0.1:8000/enter-machineparty-work/", {
        party: this.state.selectedParty,
        machine: this.state.selectedMachine,
        date: this.state.date,
        drilling_feet: this.state.drillingFeet,
        diesel_amount: this.state.dieselAmount,
        remark: this.state.remark,
        payment: this.state.payment,
        holes: this.state.holes
      })
      .then(res => {
        this.fetchProduct();
        this.setState({
          responseMessage: res.data
        });
      })
      .catch(error => {
        alert(error.response.request._response);
      });

    e.target.reset();
    e.preventDefault();
  };

  // toggle load status
  toggleLoadStatus = async () => {
    if (this.state.loadingStatus.visibility === "visible") {
      await this.setState({
        loadingStatus: {
          visibility: "hidden"
        },
        loadedStatus: {
          visibility: "visible"
        }
      });
    } else {
      await this.setState({
        loadingStatus: {
          visibility: "visible"
        },
        loadedStatus: {
          visibility: "hidden"
        }
      });
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      partyNamesFromApi: [],
      machineNamesFromApi: [],
      payment: 0,
      holes: 0,
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
      loadingStatus: {
        visibility: "visible"
      },
      loadedStatus: {
        visibility: "hidden"
      }
    };

    this.fetchProduct = this.fetchProduct.bind(this);
    this.checkParty = this.checkParty.bind(this);
    this.checkMachine = this.checkMachine.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLoadStatus = this.toggleLoadStatus.bind(this);
    this.fetchProduct();
  }

  componentDidMount() {
    this.toggleLoadStatus();
  }

  render() {
    return (
      <div id="mainComponent">
        <div className="d-flex justify-content-center align-items-center scrollingSection">
          <form
            className="form-container form-group"
            onSubmit={e => this.onSubmit(e)}
          >
            <p className="headingViewPart">Machine Work Entry</p>
            <div className="pt-5">
              <Autocomplete
                suggestions={this.state.partyNamesFromApi}
                callbackFromParent={dataFromChild => {
                  this.state.selectedParty = dataFromChild;
                }}
                checkFromParent={this.checkParty}
                placeholderfrom={"Party name"}
              />

              <p>{this.state.partyExistMessage}</p>
              <br />
              
              <select onChange={e => this.state.selectedMachine=e.target.value}>
                {this.state.machineNamesFromApi.map((item) => (
                    <option value={item}>{item}</option>
                ))}
              </select> 

              <br />
              <br />

              <InputDateField
                callbackFromParent={dataFromChild => {
                  this.state.date = dataFromChild;
                }}
              />

              <br />
              <br />
              <InputRateField
                placeholderParent={"Diesel Amount"}
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
              <br />
              <br />

              <InputQuantityField
                placeholder={"Holes"}
                callbackFromParent={dataFromChild => {
                  this.state.holes = parseInt(dataFromChild);
                }}
              />
              <br />
              <br />

              <InputRateField
                placeholderParent={"Payment Received"}
                callbackFromParent={dataFromChild => {
                  this.state.payment = dataFromChild;
                }}
              />
              <br />
              <br />

              <InputRemarkField
                callbackFromParent={dataFromChild => {
                  this.state.remark = dataFromChild;
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
        </div>
      </div>    
    );
  }
}
