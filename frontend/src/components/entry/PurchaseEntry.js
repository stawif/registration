import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";

const partyNamesFromApi = [];
const itemNamesFromApi = [];

fetch("http://127.0.0.1:8000/list-of-purchaseparty/")
  .then(res => res.json())
  .then(out => {
    partyListFunction(out);
  })
  .catch(err => {
    throw err;
  });

fetch("http://127.0.0.1:8000/list-of-item/")
  .then(res => res.json())
  .then(out => {
    itemListFunction(out);
  })
  .catch(err => {
    throw err;
  });
//below function is used to store api data in a array
function partyListFunction(data) {
  data.map(item => partyNamesFromApi.push(item.name));
}
function itemListFunction(data) {
  data.map(item => itemNamesFromApi.push(item.name));
}

export default class PurchaseEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      selectedItem: "",
      selectedParty: "",
      remark: "",
      paid: 0,
      quantity: 0,
      rate: 0,
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
      } 
      catch (err) {}
    };

    this.state.checkitem = dataFromChild => {
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
        itemNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    this.state.onSubmit = e => {
          axios.post("http://127.0.0.1:8000/enter-purchase-detail/", {
             party: this.state.selectedParty,
             item: this.state.selectedItem,
             date: this.state.date,
             paid: this.state.paid,
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
      console.log("paid type : "+typeof this.state.paid);     
      console.log("quantity type : "+typeof this.state.quantity);     
      console.log("rate type : "+typeof this.state.rate);     
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
  }

  myCallbackForSelectedParty = dataFromChild => {
    this.state.selectedParty = dataFromChild;
  };
  myCallbackForselectedItem = dataFromChild => {
    this.state.selectedItem = dataFromChild;
  };

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Purchase Entry</p>
        <div className="pt-5">
          <Autocomplete
            suggestions={partyNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedParty}
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />

          <p>{this.state.partyExistMessage}</p>
          <br/>

          <Autocomplete
            suggestions={itemNamesFromApi}
            callbackFromParent={this.myCallbackForselectedItem}
            placeholderfrom={"Item name"}
            checkFromParent={this.state.checkitem}
          />

          <br/>
          <br/>

          <input
            type="date"
            //data-date=""
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.state.date = e.target.value;
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
            //minLength="5"
            onChange={e => {
              this.setState({
                  remark: e.target.value
              });
            }}
            //required
          />

          <br/>
          <br/>

          <input
            type="number"
            className="mb-2"
            name="paid"
            placeholder="Paid amount"
            autoComplete="off"
            onChange={e => {
                this.setState({
                    paid: parseInt(e.target.value)
                });
              }}
            required
          />

          <br/>
          <br/>

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

          <br/>
          <br/>

          <input
            type="number"
            className="mb-2"
            name="rate"
            placeholder="Rate"
            autoComplete="off"
            onChange={e => {
                this.setState({
                    rate: parseInt(e.target.value)
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
