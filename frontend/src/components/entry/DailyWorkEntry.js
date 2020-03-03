import React from "react";
import axios from "axios";
import InputPartyNameField from "../modular/InputPartyNameField";
import InputDateField from "../modular/InputDateField";
import InputContactField from "../modular/InputContactField";
import InputPartyVillageField from "../modular/InputPartyVillageField";
import InputRateField from "../modular/InputRateField";
import InputQuantityField from "../modular/InputQuantityField";

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
    this.state.onSubmit =(e) => {
      axios.post('http://127.0.0.1:8000/enter-daily-work/', 
      {
        name: this.state.partyName,
        contact: this.state.partyContact,
        village: this.state.partyVillage,
        date: this.state.date,
        five_feet: this.state.fiveFeet,
        five_feet_rate: this.state.fiveFeetRate,
        two_half_feet: this.state.twoHalfFeet,
        two_half_feet_rate: this.state.twoHalfFeetRate,
        diesel_spend: this.state.dieselSpend
      }
      ).then(res => {
        this.setState({
          responseMessage: res.data
        });         
      }
      ).catch(error => {
         console.log( error.response.request._response )
      });

      console.log(this.state.partyName);
      console.log(this.state.partyContact);
      console.log(this.state.partyVillage);
      console.log(this.state.date);
      console.log(this.state.fiveFeet);
      console.log(this.state.fiveFeetRate);
      console.log(this.state.twoHalfFeet);
      console.log(this.state.twoHalfFeetRate);
      console.log(this.state.dieselSpend);
    
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
        <p className="headingViewPart">Daily Work Entry</p>
        <div className="pt-5">
          
          <InputPartyNameField
            callbackFromParent={dataFromChild => {
              this.state.partyName = dataFromChild;
              
              
            }}
            checkFromParent={e => {this.state.onChange()}}
          />

          <p>{this.state.workerExistMessage}</p>
          <br />

          <InputContactField
            callbackFromParent={dataFromChild => {
              this.state.partyContact = dataFromChild;
            }}
          />

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

          <InputQuantityField 
            placeholder="5 Feet"
            callbackFromParent= {
              dataFromChild => {
                this.state.fiveFeet = dataFromChild;
                this.state.onChange();
              }
            }
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

          <InputQuantityField 
            placeholder="2.5 Feet"
            callbackFromParent={dataFromChild => {
              this.state.twoHalfFeet = dataFromChild;
              this.state.onChange();
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

          <InputQuantityField 
            placeholder="Diesel Spend"
            callbackFromParent={dataFromChild => {
              this.state.dieselSpend = dataFromChild;
              this.state.onChange();
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
