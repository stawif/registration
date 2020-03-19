import React from "react";
import axios from "axios";
import '../../homePage.css';
import './entry.css';
import InputPartyNameField from "../modular/InputPartyNameField";
import InputDateField from "../modular/InputDateField";
import Autocomplete from "./AutoComplete";
import InputPartyVillageField from "../modular/InputPartyVillageField";
import InputRateField from "../modular/InputRateField";
import InputRemarkField from "../modular/InputRemarkField";

export default class DailyWorkEntry extends React.Component {
  //Fetching Products from database
  fetchProduct = async () => {
    try {
      const responseVehicleList = await fetch(
        "http://127.0.0.1:8000/list-of-vehicles/"
      );
      const jsonVehicleList = await responseVehicleList.json();
      jsonVehicleList.map(item =>
        this.setState({ 
          vehicleNamesFromApi: [...this.state.vehicleNamesFromApi, item.name] 
        })
      );
    } catch {
      this.toggleLoadStatus();
    }
  };

  checkVehicle = datafromparent => {};

  //Form Handler
  onSubmit = e => {
    axios
      .post("http://127.0.0.1:8000/enter-daily-work/", {
        name: this.state.partyName,
        village: this.state.partyVillage,
        vehicle: this.state.selectedVehicle,
        date: this.state.date,
        five_feet: this.state.fiveFeet,
        five_feet_rate: this.state.fiveFeetRate,
        two_half_feet: this.state.twoHalfFeet,
        two_half_feet_rate: this.state.twoHalfFeetRate,
        diesel_spend: this.state.dieselSpend,
        received_amount: this.state.receivedAmount,
        remark: this.state.remark
      })
      .then(res => {
        this.fetchProduct();
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
      partyName: "",
      selectedVehicle: "",
      vehicleNamesFromApi: [],
      partyVillage: "",
      date: null,
      fiveFeet: 0,
      fiveFeetRate: 0,
      twoHalfFeet: 0,
      twoHalfFeetRate: 0,
      dieselSpend: 0,
      receivedAmount: 0,
      remark: "",
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
            <p className="headingViewPart">Daily Work Entry</p>
            <div className="pt-5">
              <InputPartyNameField
                callbackFromParent={dataFromChild => {
                  this.state.partyName = dataFromChild;
                }}
              />

              <br />  
              <br />

              <select onChange={e => this.state.selectedVehicle=e.target.value}>
                {this.state.vehicleNamesFromApi.map((item) => (
                    <option value={item}>{item}</option>
                ))}
              </select> 

              <br />
              <br />

              <InputPartyVillageField
                callbackFromParent={dataFromChild => {
                  this.state.partyVillage = dataFromChild;
                }}
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

              <InputRateField
                placeholderParent="5 Feet"
                callbackFromParent={dataFromChild => {
                  this.state.fiveFeet = dataFromChild;
                }}
              />

              <br />
              <br />

              <InputRateField
                placeholderParent={"5 Feet Rate"}
                callbackFromParent={dataFromChild => {
                  this.state.fiveFeetRate = dataFromChild;
                }}
              />

              <br />
              <br />

              <InputRateField
                placeholderParent="2.5 Feet"
                callbackFromParent={dataFromChild => {
                  this.state.twoHalfFeet = dataFromChild;
                }}
              />

              <br />
              <br />

              <InputRateField
                callbackFromParent={dataFromChild => {
                  this.state.twoHalfFeetRate = dataFromChild;
                }}
                placeholderParent={"2.5 Feet Rate"}
              />

              <br />
              <br />

              <InputRateField
                placeholderParent="Diesel Spend"
                callbackFromParent={dataFromChild => {
                  this.state.dieselSpend = dataFromChild;
                }}
              />

              <br />
              <br />

              <InputRateField
                placeholderParent="Received Amount"
                callbackFromParent={dataFromChild => {
                  this.state.receivedAmount = dataFromChild;
                }}
              />
              <br />
              <br />

              <InputRemarkField
                placeholderParent="Remark"
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
