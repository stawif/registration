import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
export default class MachineSupplyEntry extends React.Component {
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
      }
    };

    //Fetching Products from database
    this.state.fetchProduct = async () => {
      fetch("http://127.0.0.1:8000/list-of-machineparty/")
        .then(res => res.json())
        .then(out => {
          out.map(item => this.state.partyNamesFromApi.push(item.name));
        })
        .catch(err => {
          throw err;
        });

      fetch("http://127.0.0.1:8000/list-of-item/")
        .then(res => res.json())
        .then(out => {
          out.map(item => this.state.itemNamesFromApi.push(item.name));
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
    this.state.checkitem = dataFromChild => {
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
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/enter-machine-supply/", {
          party: this.state.selectedParty,
          item: this.state.selectedItem,
          date: this.state.date,
          quantity: this.state.quantity,
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
      this.setState({
        selectedParty: "",
        selectedItem: ""
      });
    };

    //Getting Current Date
    this.state.getDate = () => {
      var curr = new Date();
      curr.setDate(curr.getDate());
      var date = curr.toISOString().substr(0, 10);
      this.state.date = date;
    };

    this.state.getDate();
  }

  //Callback to set Selected Party to state
  myCallbackForSelectedParty = dataFromChild => {
    this.state.selectedParty = dataFromChild;
  };

  //Callback to set Selected item to state
  myCallbackForselectedItem = dataFromChild => {
    this.state.selectedItem = dataFromChild;
  };

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Machine Supply Entry</p>
        <div className="pt-5">
          <Autocomplete
            suggestions={this.state.partyNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedParty}
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />

          <p>{this.state.partyExistMessage}</p>
          <br />

          <Autocomplete
            suggestions={this.state.itemNamesFromApi}
            callbackFromParent={this.myCallbackForselectedItem}
            placeholderfrom={"Item name"}
            checkFromParent={this.state.checkitem}
          />

          <br />
          <br />

          <input
            type="date"
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.setState({
                date: e.target.value
              });
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="quantity"
            placeholder="Quantity"
            autoComplete="off"
            onChange={e => {
              this.setState({
                quantity: parseInt(e.target.value)
              });
            }}
            required
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
