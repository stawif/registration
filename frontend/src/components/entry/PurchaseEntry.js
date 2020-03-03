import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
import InputDateField from "../modular/InputDateField";
import InputRemarkField from "../modular/InputRemarkField";
import InputQuantityField from "../modular/InputQuantityField";
import InputRateField from "../modular/InputRateField.js";

export default class PurchaseEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyNamesFromApi: [],
      itemNamesFromApi: [],
      date: null,
      selectedItem: "",
      selectedParty: "",
      remark: "",
      quantity: 0,
      rate: 0,
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    };

    //Fetching products from DataBase
    this.state.fetchProduct = async () => {
      fetch("http://127.0.0.1:8000/list-of-purchaseparty/")
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

    // Check existence of Item name
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

    //From Submit Handler
    this.state.onSubmit = e => {
      axios.post("http://127.0.0.1:8000/enter-purchase-detail/", {
         party: this.state.selectedParty,
         item: this.state.selectedItem,
         date: this.state.date,
         quantity: this.state.quantity,
         rate: this.state.rate,
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
  }

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Purchase Entry</p>
        <div className="pt-5">
          <Autocomplete
            suggestions={this.state.partyNamesFromApi}
            callbackFromParent={dataFromChild => {
              this.state.selectedParty = dataFromChild;
            }}
            checkFromParent={this.state.checkparty}
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
            checkFromParent={this.state.checkitem}
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

          <InputRemarkField
            callbackFromParent={dataFromChild => {
              this.state.remark = dataFromChild;
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

          <br />
          <br />

          <InputRateField
            placeholderParent={"Rate"}
            callbackFromParent={dataFromChild => {
              this.state.rate = dataFromChild;
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
