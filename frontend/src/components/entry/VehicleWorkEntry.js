import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
import InputDateField from "../modular/InputDateField";
import InputRemarkField from "../modular/InputRemarkField";
import InputRateField from "../modular/InputRateField.js";

export default class VehicleWorkEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyNamesFromApi: [],
      vehicleNamesFromApi: [],
      date: null,
      selectedVehicle: [],
      selectedParty: "",
      remark: "",
      fiveFeet: 0,
      twoHalfFeet: 0,
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      },
      radioButtonStyle: {
        float: "left"
      }
    };

    //fetching VehicleParty and Vehicles from database
    this.state.fetchProduct = async () => {
      fetch("http://127.0.0.1:8000/list-of-vehicleparty/")
        .then(res => res.json())
        .then(out => {
          out.map(item => this.state.partyNamesFromApi.push(item.name));
        })
        .catch(err => {
          throw err;
        });

      fetch("http://127.0.0.1:8000/list-of-vehicles/")
        .then(res => res.json())
        .then(out => {
          out.map(item => this.state.vehicleNamesFromApi.push(item.name));
        })
        .catch(err => {
          throw err;
        });
    };

    //default call for fetching data
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
        const showList = (item, index) => {
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

    //Check Existance of vehicle
    this.state.checkvehicle = dataFromChild => {
      try {
        this.setState({
          responseMessage: "",
          buttonStatus: {
            visibility: "hidden"
          }
        });
        const showList = (item, index) => {
          if (dataFromChild.toLowerCase() === item.toLowerCase()) {
            this.setState({
              buttonStatus: {
                visibility: "visible"
              }
            });
          } else {
          }
        };
        this.state.vehicleNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    //Form Handler Function
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/enter-vehicleparty-work/", {
          party: this.state.selectedParty,
          vehicle: this.state.selectedVehicle,
          date: this.state.date,
          five_feet: this.state.fiveFeet,
          two_half_feet: this.state.twoHalfFeet,
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

      e.target.reset();
      e.preventDefault();
    };

    //This is a Function call to check multiple selected vehicles
    this.handleMultipleVehicle = this.handleMultipleVehicle.bind(this);
  }

  //This Function Handles multiple vehicle to push them in an array to Pass to DataBase
  handleMultipleVehicle = async e => {
    await this.setState({
      selectedVehicle: Array.from(e.target.selectedOptions, item => item.value)
    });
  };

  //This Function is called to set Selected Party which is coming from AutoSuggestion
  myCallbackForSelectedParty = dataFromChild => {
    this.state.selectedParty = dataFromChild;
  };

  //This Function is called to set Selected Vehicle which is coming from AutoSuggestion
  myCallbackForSelectedVehicle = dataFromChild => {
    this.state.selectedVehicle = dataFromChild;
  };

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Vehicle Work Entry</p>
        <div className="pt-5">
          <Autocomplete
            suggestions={this.state.partyNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedParty}
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />
          <p>{this.state.partyExistMessage}</p>

          {
            <select
              className="form-control"
              name="vehicles"
              onChange={e => this.handleMultipleVehicle(e)}
              multiple
              required
            >
              {this.state.vehicleNamesFromApi.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          }

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
          <InputRateField
            callbackFromParent={dataFromChild => {
              this.state.fiveFeet = dataFromChild;
            }}
            placeholderParent={"5 Feet"}
          />

          <br />
          <br />
          <InputRateField
            callbackFromParent={dataFromChild => {
              this.state.twoHalfFeet = dataFromChild;
            }}
            placeholderParent={"2.5 Feet"}
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
