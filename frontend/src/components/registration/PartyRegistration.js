import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function PartyRegistration() {
  const [data, setData] = useState({});

  const [name, userName] = useState("");
  const [contact, userContact] = useState(0);
  const [address, userAddress] = useState("");
  const [party, setParty] = useState("");
  const { register, errors, handleSubmit } = useForm();

  async function fetchProduct() {
    const response = await fetch("http://127.0.0.1:8000/list-of-party/");

    const res = await response.json();
    setData(res);
  }

  useEffect(() => {
    fetchProduct();
    checkName();
  }, [name]);

  // below function is used to check typed machine name is already in database or not
  function checkName() {
    try {
      const showList = (item, index) => {
        console.log("Name is = " + item.name);
        if (name === item.name) {
          alert("Party name already exists. please change Party name");
        }
      };
      data.forEach(showList);
    } catch (err) {
      console.log("Still loading...");
    }
  }

  // below function is used to submit the machine registration request

  const onSubmit = (data, e) => {
    axios
      .post("http://127.0.0.1:8000/party-registration/", {
        name: name,
        contact: contact,
        village: address,
        party_type: party
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setData(res);
      });

    alert("machine registered successfully" + name);
    e.target.reset();
  };

  return (
    <div>
      <center>
        <h2>Party Registration</h2>
      </center>
      <hr />
      <br />
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="partyName"
            ref={register({
              required: true,
              maxLength: 30,
              minLength: { value: 5, message: "Min length for Party Name is 5" }
            })}
            onChange={e => userName(e.target.value)}
            placeholder="Enter Party Name"
          />
          {errors.partyName && errors.partyName.message}
          <input
            type="tel"
            name="contactNumber"
            ref={register({
              required: true,
              maxLength: 13,
              minLength: 10
            })}
            onChange={e => userContact(e.target.value)}
            placeholder="Enter Contact Number"
          />

          <input
            type="text"
            name="addressName"
            ref={register({
              required: true,
              maxLength: 30,
              minLength: { value: 5, message: "Min length is 5" }
            })}
            onChange={e => userAddress(e.target.value)}
            placeholder="Enter Address"
          />
          {errors.addressName && errors.addressName.message}
          {["Machine_work", "Vehicle_work", "Daily_work", "Purchase_party"].map(
            (option, i) => {
              return (
                <label key={option}>
                  <input
                    type="radio"
                    name="radio1"
                    checked={party === option ? true : false}
                    key={i + 100}
                    onChange={() => setParty(option)}
                    value={option}
                    required
                  />
                  {option}
                </label>
              );
            }
          )}

          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
