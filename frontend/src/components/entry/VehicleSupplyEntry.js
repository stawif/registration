import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
<<<<<<< HEAD

const partyNamesFromApi = [];
const itemNamesFromApi = [];

fetch("http://127.0.0.1:8000/list-of-vehicleparty/")
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
=======
import InputDateField from "../modular/InputDateField";
import InputQuantityField from "../modular/InputQuantityField";
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e

export default class VehicleSupplyEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
=======
      partyNamesFromApi: [],
      itemNamesFromApi: [],

>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
      date: null,
      selectedParty: "",
      selectedItem: "",
      quantity: 0,
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    };

<<<<<<< HEAD
=======
    //Fetching Products from Database to use them in AutoSugestion and for Checking While Entered Value Exists in Database or Not
    this.state.fetchProduct = async () => {
      fetch("http://127.0.0.1:8000/list-of-vehicleparty/")
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

>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
    // Check existence of party name
    this.state.checkparty = dataFromChild => {
      try {
        this.setState({
<<<<<<< HEAD
=======
          responseMessage: "",
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
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
<<<<<<< HEAD
        partyNamesFromApi.forEach(showList);
      } 
      catch (err) {}
    };

    this.state.checkitem = dataFromChild => {
      try {
        this.setState({
=======
        this.state.partyNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    //Check Existence of item list
    this.state.checkitem = dataFromChild => {
      try {
        this.setState({
          responseMessage: "",
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
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
<<<<<<< HEAD
        itemNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    this.state.onSubmit = e => {
          axios.post("http://127.0.0.1:8000/enter-vehicle-supply/", {
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
=======
        this.state.itemNamesFromApi.forEach(showList);
      } catch (err) {}
    };

    // Form Submit Handling
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/enter-vehicle-supply/", {
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
  }


>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Vehicle Supply Entry</p>
        <div className="pt-5">
          <Autocomplete
<<<<<<< HEAD
            suggestions={partyNamesFromApi}
            callbackFromParent={this.myCallbackForSelectedParty}
=======
            suggestions={this.state.partyNamesFromApi}
            callbackFromParent={dataFromChild => {
              this.state.selectedParty = dataFromChild;
            }}
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
            checkFromParent={this.state.checkparty}
            placeholderfrom={"Party name"}
          />

          <p>{this.state.partyExistMessage}</p>
<<<<<<< HEAD
          <br/>

          <Autocomplete
            suggestions={itemNamesFromApi}
            callbackFromParent={this.myCallbackForselectedItem}
=======
          <br />

          <Autocomplete
            suggestions={this.state.itemNamesFromApi}
            callbackFromParent={dataFromChild => {
              this.state.selectedItem = dataFromChild;
            }}
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
            placeholderfrom={"Item name"}
            checkFromParent={this.state.checkitem}
          />

<<<<<<< HEAD
          <br/>
          <br/>

          <input
            type="date"
            //data-date=""
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

=======
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
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
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
