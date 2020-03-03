import React from "react";
import axios from "axios";
import InputPartyNameField from "../modular/InputPartyNameField";
import InputContactField from "../modular/InputContactField";
import InputPartyVillageField from "../modular/InputPartyVillageField";

export default class VehiclePartyRegistration extends React.Component {
  // Fetch party list and contact list from server
  fetchProduct = async () => {
    try {
      const responsePartyList = await fetch(
        "http://127.0.0.1:8000/list-of-vehicleparty/"
      );
      const jsonPartyList = await responsePartyList.json();
      this.state.partyList = jsonPartyList;

      const responseContactList = await fetch(
        "http://127.0.0.1:8000/list-of-partycontacts/"
      );
      const jsonContactList = await responseContactList.json();
      this.state.partyContacts = jsonContactList;
    } catch {
      this.toggleLoadStatus();
    }
  };

  // Take name and village from contact
  getNameVillage = matchContact => {
    axios
      .post("http://127.0.0.1:8000/party-through-contact/", {
        contact: matchContact
      })
      .then(res => {
        const jsonNameVillage = JSON.parse(res.data);

        this.setState({
          partyName: jsonNameVillage.name,
          partyVillage: jsonNameVillage.village
        });
      })
      .catch(error => {
        //console.log( error.response.request._response )
      });
  };

  checkVillage = () => {
    this.setState({
      partyExistMessage: "",
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    });
  };

  // Check existence of party name
  checkParty = () => {
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

  onSubmit = e => {
    axios
      .post("http://127.0.0.1:8000/vehicle-party-registration/", {
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
        //alert(error.response.request._response);
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
      partyContact: "",
      partyVillage: "",
      partyList: {},
      partyExistMessage: "",
      responseMessage: "",
      partyContacts: "",
      buttonStatus: {
        visibility: "visible"
      },
      disabled: true,
      loadingStatus: {
        visibility: "visible"
      },
      loadedStatus: {
        visibility: "hidden"
      }
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.getNameVillage = this.getNameVillage.bind(this);
    this.checkVillage = this.checkVillage.bind(this);
    this.checkParty = this.checkParty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLoadStatus = this.toggleLoadStatus.bind(this);
    this.fetchProduct();
  }

  componentDidMount() {
    this.toggleLoadStatus();
  }
  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.onSubmit(e)}
      >
        <p className="headingViewPart">Vehicle Party Registration</p>
        <div className="pt-5">
          <InputContactField
            callbackFromParent={dataFromChild => {
              this.state.partyContact = dataFromChild;
              if (dataFromChild.length === 10) {
                if (this.state.partyContacts.indexOf(dataFromChild) > -1) {
                  this.getNameVillage(dataFromChild);
                } else
                  this.setState({
                    disabled: !this.state.disabled,
                    partyName: "",
                    partyVillage: ""
                  });
              }
            }}
          />

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
              this.checkParty();
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
              this.checkVillage();
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
