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
      partyContacts: "",
      buttonStatus: {
        visibility: "visible"
      },
      disabled: true
    };

    // Fetch party list and contact list from server
    this.state.fetchProduct = async () => {
      const responsePartyList = await fetch(
        "http://127.0.0.1:8000/list-of-machineparty/"
      );
      const jsonPartyList = await responsePartyList.json();
      this.state.partyList = jsonPartyList;
      const responseContactList = await fetch(
        "http://127.0.0.1:8000/list-of-partycontacts/"
      );
      const jsonContactList = await responseContactList.json();
      this.state.partyContacts = jsonContactList;
      console.log(this.state.partyContacts);
    };

    this.state.fetchProduct();

    // Take name and village from contact
    this.state.getNameVillage = matchContact => {
      console.log(matchContact);

      axios
        .post("http://127.0.0.1:8000/party-through-contact/", {
          contact: matchContact
        })
        .then(res => {
          const jsonNameVillage = JSON.parse(res.data);

          this.setState({
            //disabled: !this.state.disabled,

            partyName: jsonNameVillage.name,
            partyVillage: jsonNameVillage.village
          });
          // this.state.partyName = jsonNameVillage.name;
          // this.state.partyVillage = jsonNameVillage.village;
          console.log("Name ", this.state.partyName);
          console.log("Village ", this.state.partyVillage);
        })
        .catch(error => {
          //console.log( error.response.request._response )
        });
    };

    this.state.checkVillage = () => {
      this.setState({
        partyExistMessage: "",
        responseMessage: "",
        buttonStatus: {
          visibility: "visible"
        }
      });
    }
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
      console.log("Name ", this.state.partyContact);
      console.log("Name ", this.state.partyName);
      console.log("Village ", this.state.partyVillage);
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
          {/* <InputPartyNameField
            callbackFromParent={dataFromChild => {
              this.state.partyName = dataFromChild;
            }}
            checkFromParent={this.state.checkparty}
          /> */}

          <input
            type="number"
            className="mb-2"
            pattern="^\d{10}$"
            name="partyContact"
            placeholder="Party Contact"
            autoComplete="off"
            onChange={e => {
              this.state.partyContact = e.target.value;
              if (e.target.value.length === 10) {
                if (this.state.partyContacts.indexOf(e.target.value) > -1) {
                  this.state.getNameVillage(e.target.value);
                } else
                  this.setState({
                    
                    disabled: !this.state.disabled,
                    partyName: "",
                    partyVillage: ""
                  });
              }
            }}
            required
          />

          {/* <InputContactField
            callbackFromParent={dataFromChild => {
              this.state.partyContact = dataFromChild;
            }}
          /> */}

          <br />
          <br />

          {/* <InputPartyVillageField
            callbackFromParent={dataFromChild => {
              this.state.partyVillage = dataFromChild;
            }}
          /> */}

          <input
            type="text"
            className="mb-2"
            name="partyName"
            placeholder="Party Name"
            value={this.state.partyName}
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={e => {
              this.state.partyName = e.target.value;
              this.state.checkparty();
            }}
            required
            disabled={this.state.disabled ? "disabled" : ""}
          />

          <input
            type="text"
            className="mb-2"
            name="partyVillage"
            placeholder="Party Village"
            value={this.state.partyVillage}
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={e => {
              this.state.partyVillage = e.target.value;
              this.state.checkVillage();
            }}
            required
            disabled={this.state.disabled ? "disabled" : ""}
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
