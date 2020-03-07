import React from "react";
import axios from "axios";
import Autocomplete from "./AutoComplete.jsx";
<<<<<<< HEAD

const partyNamesFromApi = [];
const itemNamesFromApi = [];

fetch("http://127.0.0.1:8000/list-of-machineparty/")
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
      },
      loadingStatus: {
        visibility: "visible"
      },
      loadedStatus: {
        visibility: "hidden"
      }
    };

<<<<<<< HEAD
<<<<<<< HEAD
=======
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

    //Check Existance of Item Names
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
          axios.post("http://127.0.0.1:8000/enter-machine-supply/", {
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

    //Form Handler
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/enter-machine-supply/", {
          party: this.state.selectedParty,
          item: this.state.selectedItem,
          date: this.state.date,
          quantity: this.state.quantity
        })
        .then(res => {console.log(res.data);
          this.setState({
            
            
            responseMessage: res.data
          });
        })
        .catch(error => {
          alert(error.response.request._response);
        });
=======
    this.fetchProduct = this.fetchProduct.bind(this);
    this.checkParty = this.checkParty.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLoadStatus = this.toggleLoadStatus.bind(this);
    this.fetchProduct();
  }
>>>>>>> 6b960ada3a0d675a2c7544f7cf6e2cee71f69237

  componentDidMount() {
    this.toggleLoadStatus();
  }

>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.onSubmit(e)}
      >
        <p className="headingViewPart">Machine Supply Entry</p>
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
<<<<<<< HEAD
>>>>>>> 63414e050b0cfab68922f55b7a5313fc3916db0e
            checkFromParent={this.state.checkparty}
=======
            checkFromParent={this.checkParty}
>>>>>>> 6b960ada3a0d675a2c7544f7cf6e2cee71f69237
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
            checkFromParent={this.checkItem}
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
