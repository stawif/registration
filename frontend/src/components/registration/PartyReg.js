import React, { useState, useEffect } from "react";
import axios from "axios";
import useInput from './InputField'
import RadioButtons from "./RadioButtons";

export default function PartyReg() {
  const [data, setData] = useState({});
  const [name, userName] = useInput({ type: "text", placeholder: "name" });
  const [contact, userContact] = useInput({ type: "text", placeholder: "phone no" });
  const [address, userAddress] = useInput({ type: "text", placeholder: "Address" });

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        "http://127.0.0.1:8000/list-of-party/"
      );

      const res = await response.json();
      setData(res);
    }

    fetchProduct();
    checkName();
  }, [name]);

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
      .post(`https://jsonplaceholder.typicode.com/users`, { name })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setData(res);
      });
    console.log(name);
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
          
          <RadioButtons/>
          
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

