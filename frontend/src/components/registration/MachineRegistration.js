import React from "react";
import axios from "axios";

export default class MachineRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      machineName: "",
      machineExistStatus: "",
      machineList: {},
      responseMessage: "",
      buttonStatus: {
        visibility: "visible"
      }
    };

    // Fetch machine list from server
    this.state.fetchProduct = async () => {
      const responseMachineList = await fetch(
        "http://127.0.0.1:8000/list-of-machines/"
      );
      const jsonMachineList = await responseMachineList.json();
      this.state.machineList = jsonMachineList;
    };
    this.state.fetchProduct();

    // Check existence of machine name
    this.state.checkMachine = () => {
      try {
        this.setState({
          machineExistStatus: "",
          responseMessage: "",
          buttonStatus: {
            visibility: "visible"
          }
        });
        const showList = (item, index) => {
          if (
            this.state.machineName.toLowerCase() === item.name.toLowerCase()
          ) {
            this.setState({
              machineExistStatus: "* This machine name is already exist!!!",
              buttonStatus: {
                visibility: "hidden"
              }
            });
          } else {
          }
        };
        this.state.machineList.forEach(showList);
      } catch (err) {}
      console.log(this.state.machineName);
    };

    //Form Handler
    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/machine-registration/", {
          name: this.state.machineName
        })
        .then(res => {
          this.state.fetchProduct();
          this.setState({
            responseMessage: res.data
          });
        })
        .catch(error => {});
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
        <p className="headingViewPart">Machine Registration</p>
        <div className="pt-5">
          <input
            type="text"
            className="mb-2"
            name="machineName"
            placeholder="Machine Name"
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={e => {
              this.state.machineName = e.target.value;
              this.state.checkMachine();
            }}
            required
          />
        </div>
        <p>{this.state.machineExistStatus}</p>
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
