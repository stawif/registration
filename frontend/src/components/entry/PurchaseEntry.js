import React from "react";
import axios from "axios";
import './entry.css';
import Autocomplete from "./AutoComplete.jsx";
import InputDateField from "../modular/InputDateField";
import InputRemarkField from "../modular/InputRemarkField";
import InputQuantityField from "../modular/InputQuantityField";
import InputRateField from "../modular/InputRateField.js";

export default class PurchaseEntry extends React.Component {
  //Fetching products from DataBase
  fetchProduct = async () => {
    try {
      const responsePartyList = await fetch(
        "http://127.0.0.1:8000/list-of-purchaseparty/"
      );
      const jsonPartyList = await responsePartyList.json();

      jsonPartyList.map(item => this.state.partyNamesFromApi.push(item.name));

      const responseItemList = await fetch(
        "http://127.0.0.1:8000/list-of-material/"
      );
      const jsonItemList = await responseItemList.json();

      jsonItemList.map(item => 
        this.setState({ 
          materialNamesFromApi: [...this.state.materialNamesFromApi, item.name] 
        })
      );
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

  // Check existence of Item name
  checkMaterial = dataFromChild => {
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
      this.state.materialNamesFromApi.forEach(showList);
    } catch (err) {}
  };

  //From Submit Handler
  onSubmit = e => {
    axios
      .post("http://127.0.0.1:8000/enter-purchase-detail/", {
        party: this.state.selectedParty,
        material: this.state.selectedMaterial,
        date: this.state.date,
        quantity: this.state.quantity,
        rate: this.state.rate,
        remark: this.state.remark
      })
      .then(res => {
        this.fetchProduct();
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
      materialNamesFromApi: [],
      date: null,
      selectedMaterial: "",
      selectedParty: "",
      remark: "",
      quantity: 0,
      rate: 0,
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
    this.checkMaterial = this.checkMaterial.bind(this);
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
        <p className="headingViewPart">Purchase Entry</p>
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

          <select onChange={e => this.state.selectedMaterial=e.target.value}>
                {this.state.materialNamesFromApi.map((item) => (
                    <option value={item}>{item}</option>
                ))}
          </select> 

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
