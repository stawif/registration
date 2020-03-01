import React from "react";
import axios from "axios";
import InputPartyNameField from "../modular/InputPartyNameField";
import InputContactField from "../modular/InputContactField";
import InputPartyVillageField from "../modular/InputPartyVillageField";
export default class MachinePartyRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyName: "",
      partyContact: "",
      partyVillage: "",
      partyList: {},
      partyExistMessage: "",
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    };

    // Fetch party list from server
    this.state.fetchProduct = async () => {
      const responsePartyList = await fetch(
        "http://127.0.0.1:8000/list-of-machineparty/"
      );
      const jsonPartyList = await responsePartyList.json();
      this.state.partyList = jsonPartyList;
    };

    this.state.fetchProduct();

    // Check existence of party name
    this.state.checkparty = () => {
      try {
        this.setState({
          partyExistMessage: "",
          responseMessage: "",
          buttonStatus: {
            visibility: "visible"
          }
        });
        const showList = (item, index) => {
          if (this.state.partyName.toLowerCase() === item.name.toLowerCase()) {
            this.setState({
              partyExistMessage: "* This party name is already exist!!!",
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

    //Form Handler
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/machine-party-registration/", {
          name: this.state.partyName,
          contact: this.state.partyContact,
          village: this.state.partyVillage
        })
        .then(res => {
          this.state.fetchProduct();
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
  }

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Machine Party Registration</p>
        <div className="pt-5">
          <InputPartyNameField
            callbackFromParent={dataFromChild => {
              this.state.partyName = dataFromChild;
            }}
            checkFromParent={this.state.checkparty}
          />

          <p>{this.state.partyExistMessage}</p>
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
