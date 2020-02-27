import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
const partyNamesFromApi = [];
const vehicleNamesFromApi = [];

fetch("http://127.0.0.1:8000/list-of-vehicleparty/")
  .then(res => res.json())
  .then(out => {
    partyListFunction(out);
  })
  .catch(err => {
    throw err;
  });

fetch("http://127.0.0.1:8000/list-of-vehicles/")
  .then(res => res.json())
  .then(out => {
    vehicleListFunction(out);
  })
  .catch(err => {
    throw err;
  });
//below function is used to store api data in a array
function partyListFunction(data) {
  data.map(item => partyNamesFromApi.push(item.name));
}
function vehicleListFunction(data) {
  data.map(item => vehicleNamesFromApi.push(item.name));
}

export default class VehicleWorkEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

    // Check existence of party name
    this.state.checkparty = dataFromChild => {
      try {
        this.setState({
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
        partyNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    this.state.checkvehicle = dataFromChild => {
      try {
        this.setState({
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
        vehicleNamesFromApi.forEach(showList);
      } 
      catch (err) {}
    };

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

    this.state.getDate = () => {
      var curr = new Date();
      curr.setDate(curr.getDate());
      var date = curr.toISOString().substr(0, 10);
      this.state.date = date;
    };

    this.state.getDate();

    this.handleMultipleVehicle = this.handleMultipleVehicle.bind(this);
  }

  handleMultipleVehicle = async e => {
    await this.setState({
      selectedVehicle: Array.from(e.target.selectedOptions, (item) => item.value)
    });
};

  myCallbackForSelectedParty = dataFromChild => {
    this.selectedParty = dataFromChild;
  };
  myCallbackForSelectedVehicle = dataFromChild => {
    this.selectedVehicle = dataFromChild;
  };

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Vehicle Party Registration</p>
      <div className="pt-5">
          
          <Autocomplete
            suggestions={partyNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedParty}
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />
          <p>{this.state.partyExistMessage}</p>

          {<select className="form-control" name="vehicles" 
            onChange={e => this.handleMultipleVehicle(e)}
            multiple
            required>
            { vehicleNamesFromApi.map(item => (
              <option value={item}>{item}</option>
            )) }
          </select>}

          <br/>

          <input
            type="date"
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.date = e.target.value;
            }}
            required
          />

          <br/>
          <br/>

          <input
            type="text"
            className="mb-2"
            name="remark"
            placeholder="Remark"
            autoComplete="off"
            maxLength="30"
            onChange={e => {
              this.remark = e.target.value;
            }}
          />

          <br/>
          <br/>

          <input
            type="number"
            className="mb-2"
            name="fiveFeet"
            placeholder="5 Feet"
            autoComplete="off"
            onChange={e => {
              this.setState({
                fiveFeet: e.target.value
              });
            }}
            required
          />

          <br/>
          <br/>

          <input
            type="number"
            className="mb-2"
            name="twoHalfFeet"
            placeholder="2.5 Feet"
            autoComplete="off"
            onChange={e => {
              this.setState({
                twoHalfFeet: e.target.value
              });
            }}
            required
          />
        </div>
          <p>{ this.state.responseMessage }</p>
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
