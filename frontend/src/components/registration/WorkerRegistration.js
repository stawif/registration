import React from "react";
import axios from "axios";

export default class WorkerRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workerName: "",
      workerContact: "",
      workerVillage: "",
      workerSalary: 0,
      advance: 0,
      date: null,
      workerList: {},
      workerExistMessage: "",

      responseMessage: "",

      buttonStatus: {
        visibility: "visible"
      }
    };

    // Fetch worker list from server
    this.state.fetchProduct = async () => {
      const responseWorkerList = await fetch(
        "http://127.0.0.1:8000/list-of-worker/"
      );
      const jsonWorkerList = await responseWorkerList.json();
      this.state.workerList = jsonWorkerList;
    };

    this.state.fetchProduct();

    // Check existence of worker name
    this.state.checkworker = () => {
      try {
        this.setState({
          workerExistMessage: "",
          responseMessage: "",
          buttonStatus: {
            visibility: "visible"
          }
        });
        const showList = (item, index) => {
          if (this.state.workerName.toLowerCase() === item.name.toLowerCase()) {
            this.setState({
              workerExistMessage: "* This worker name is already exist!!!",
              buttonStatus: {
                visibility: "hidden"
              }
            });
          } else {
          }
        };
        this.state.workerList.forEach(showList);
      } catch (err) {}
    };

    this.state.onSubmit = e => {
      axios
        .post("http://127.0.0.1:8000/worker-registration/", {
          name: this.state.workerName,
          contact: this.state.workerContact,
          village: this.state.workerVillage,
          salary: this.state.workerSalary,
          advance: this.state.advance,
          date: this.state.date
        })
        .then(res => {
          this.state.fetchProduct();
          this.setState({
            responseMessage: res.data
          });
        })
        .catch(error => {
          console.log(error.response.request._response);
        });

      e.target.reset();
      e.preventDefault();
    };
    this.state.getDate = () => {
      var curr = new Date();
      curr.setDate(curr.getDate());
      var date = curr.toISOString().substr(0, 10);
      this.state.date = date;
      console.log(this.state.date);
    };

    this.state.getDate();
  }

  render() {
    return (
      <form
        className="form-container form-group"
        onSubmit={e => this.state.onSubmit(e)}
      >
        <p className="headingViewPart">Machine Worker Registration</p>
        <div className="pt-5">
          <input
            type="text"
            className="mb-2"
            name="workerName"
            placeholder="Worker Name"
            autoComplete="off"
            maxLength="30"
            minLength="3"
            onChange={e => {
              this.state.workerName = e.target.value;

              this.state.checkworker();
            }}
            required
          />

          <p>{this.state.workerExistMessage}</p>
          <br />

          <input
            type="tel"
            className="mb-2"
            name="workerContact"
            placeholder="Enter 10 digit Phone no"
            autoComplete="off"
            pattern="^\d{10}$"
            // maxLength="10"
            // minLength="10"
            onChange={e => {
              this.state.workerContact = parseInt(e.target.value);
              //this.state.validatePhone();
            }}
            required
          />

          <br />
          <br />

          <input
            type="text"
            className="mb-2"
            name="workerVillage"
            placeholder="Worker Village"
            autoComplete="off"
            maxLength="30"
            minLength="5"
            onChange={e => {
              this.state.workerVillage = e.target.value;
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="workerSalary"
            placeholder="Worker Salary"
            autoComplete="off"
            onChange={e => {
              this.state.workerSalary = parseInt(e.target.value);
            }}
            required
          />

          <br />
          <br />

          <input
            type="date"
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.state.date = e.target.value;
            }}
            required
          />

          <br />
          <br />

          <input
            type="number"
            className="mb-2"
            name="workerAdvance"
            placeholder="Worker Advance"
            autoComplete="off"
            onChange={e => {
              this.state.advance = parseInt(e.target.value);
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
