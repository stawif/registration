import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
import InputDateField from "../modular/InputDateField";
import InputQuantityField from "../modular/InputQuantityField";
export default class MachineSupplyEntry extends React.Component {
  //Fetching Products from database
  fetchProduct = async () => {
    try {
      const responseMachineList = await fetch(
        "http://127.0.0.1:8000/list-of-machineparty/"
      );
      const jsonMachineList = await responseMachineList.json();
      jsonMachineList.map(item => this.state.partyNamesFromApi.push(item.name));

      const responseItemList = await fetch(
        "http://127.0.0.1:8000/list-of-item/"
      );

      const jsonItemList = await responseItemList.json();
      jsonItemList.map(item => this.state.itemNamesFromApi.push(item.name));
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

  //Check Existance of Item Names
  checkItem = dataFromChild => {
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
      this.state.itemNamesFromApi.forEach(showList);
    } catch (err) {}
  };

  //Form Handler
  onSubmit = e => {
    axios
      .post("http://127.0.0.1:8000/enter-machine-supply/", {
        party: this.state.selectedParty,
        item: this.state.selectedItem,
        date: this.state.date,
        quantity: this.state.quantity
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
      itemNamesFromApi: [],
      date: null,
      selectedParty: "",
      selectedItem: "",
      quantity: 0,
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
    this.checkItem = this.checkItem.bind(this);
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
        <p className="headingViewPart">Machine Supply Entry</p>
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

          <Autocomplete
            suggestions={this.state.itemNamesFromApi}
            callbackFromParent={dataFromChild => {
              this.state.selectedItem = dataFromChild;
            }}
            placeholderfrom={"Item name"}
            checkFromParent={this.checkItem}
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
            placeholder={"Quantity"}
            callbackFromParent={dataFromChild => {
              this.state.quantity = dataFromChild;
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
