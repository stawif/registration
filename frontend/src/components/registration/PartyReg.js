import React, { useState, useEffect } from "react";
import axios from "axios";
import useInput from "./InputField";

export default function PartyReg() {
  const [data, setData] = useState({});

  const [party, setParty] = useState("");

  const [name, userName] = useInput({ type: "text", placeholder: "name" });
  const [contact, userContact] = useInput({type: "text", placeholder: "phone no"});
  const [address, userAddress] = useInput({type: "text", placeholder: "Address"});

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("http://127.0.0.1:8000/list-of-party/");

      const res = await response.json();
      setData(res);
    }

    fetchProduct();
    checkName();
  }, [name]);

  console.log(data);
  // below function is used to check typed machine name is already in database or not
  function checkName() {
    try {
      const showList = (item, index) => {
        console.log("Name is = " + item.name);
        if (name === item.name) {
          alert("Chng machine name");
        }
      };
      data.forEach(showList);
    } catch (err) {
      console.log("Still loading...");
    }
  }

  // below function is used to submit the machine registration request
  function handleClick() {
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
  }

  

  return (
    <div>
      <center>
        <h2>Party Registration</h2>
      </center>
      <hr />
      <br />
      <div className="">
        <form onSubmit={handleClick}>
          {userName}
          {userContact}
          {userAddress}

          {["Machine_work", "Vehicle_work", "Daily_work", "Purchase_party"].map(
            (option, i) => {
              return (
                <label key={option}>
                  <input
                    type="radio"
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
