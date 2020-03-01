import React from "react";
import axios from "axios";
import InputQuantityField from "../modular/InputQuantityField"
import InputCommonName from "../modular/InputCommonName"

export default class ItemRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      itemMeasurement: "",
      itemQuantity: 0,
      itemList: {},
      itemExistMessage: "",
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    };

    // Fetch item list from server
    this.state.fetchProduct = async () => {
      const responseItemList = await fetch(
        "http://127.0.0.1:8000/list-of-item/"
      );
      const jsonItemList = await responseItemList.json();
      this.state.itemList = jsonItemList;
    };

    this.state.fetchProduct();

    // Check existence of item name
    this.state.checkItem = () => {
      try {
        this.setState({
          itemExistMessage: "",
          responseMessage: "",
          buttonStatus: {
            visibility: "visible"
          }
        });
        const showList = (item, index) => {
          if (this.state.itemName.toLowerCase() === item.name.toLowerCase()) {
            this.setState({
              itemExistMessage: "* This item name is already exist!!!",
              buttonStatus: {
                visibility: "hidden"
              }
            });
          } else {
          }
        };
        this.state.itemList.forEach(showList);
      } catch (err) {}
    };

    //Form Handler
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/item-registration/", {
          name: this.state.itemName,
          measurement: this.state.itemMeasurement,
          quantity: this.state.itemQuantity
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
        <p className="headingViewPart">Item Registration</p>
        <div className="pt-5">
        <InputCommonName
            minLength={"2"}
            placeholderParent={"Item Name"}
            callbackFromParent={dataFromChild => {
              this.state.itemName = dataFromChild;
            }}
            checkFromParent={this.state.checkItem}
          />
          

          <p>{this.state.itemExistMessage}</p>
          <br />

          <input
            type="number"
            className="mb-2"
            name="itemMeasurement"
            placeholder="Item Measurement"
            autoComplete="off"
            maxLength="30"
            minLength="1"
            onChange={e => {
              this.state.itemMeasurement = e.target.value;
            }}
            required
          />

          <br />
          <br />

          <InputQuantityField
          placeholder={"Quantity"}
            callbackFromParent={dataFromChild => {
              this.state.itemQuantity = dataFromChild;
            }}
          />

          

          <hr />
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
