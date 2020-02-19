import React, { useState, useEffect } from "react";
import axios from "axios";
import useInput from "./InputField";

export default function MachineReg() {
  const [data, setData] = useState({});
  const [machinename, userInput] = useInput({type: "text", placeholder: "type Machine name"});

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("http://127.0.0.1:8000/list-of-machines/");

      const res = await response.json();
      setData(res);
    }

    fetchProduct();
    checkMachine();
  }, [machinename]);

  // below function is used to check typed machine name is already in database or not
  function checkMachine() {
    try {
      const showList = (item, index) => {
    
        if (machinename === item.name) {
          alert("Chng machine name");
        }
      };
      data.forEach(showList);
    } catch (err) {
      
    }
  }

  // below function is used to submit the machine registration request
  function handleClick() {
    axios
      .post(`http://127.0.0.1:8000/machine-registration/`, {name: machinename})
      .then(res => {
        console.log(res);
        console.log(res.data);
        setData(res);
      });
   
  }

  return (
    <div>
      <center>
        <h2>Machine Registration</h2>
      </center>
      <hr />
      <br />
      <div className="">
        <form onSubmit={handleClick}>
          {userInput}
          <br />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

