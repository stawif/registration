import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function MachineRegistration() {
  const [machineList, setMachineList] = useState({});
  const [machineName, userInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProduct = async () =>{
    const responseMachineList = await fetch("http://127.0.0.1:8000/list-of-machines/"); 
    const jsonMachineList = await responseMachineList.json();
    setMachineList(jsonMachineList);
  }

  fetchProduct(); 

  useEffect(
    () => {
      checkMachine();
    },
    [machineList]
  );
  
  // below function is used to check typed machine name is already in database or not
  function checkMachine() {
    try {
      //errors.firstName.message();
      setErrorMessage("");
      const showList = (item, index) => {
        if (machineName === item.name) {
          setErrorMessage("* This machine name is already exist!!!");
        }
        else{}
      };
      machineList.forEach(showList);
    } 
    catch (err) {}
  }

  const { register, errors, handleSubmit, reset } = useForm();
  const onSubmit = (data, e) => {
    alert("machine registered successfully"+machineName);
    axios
      .post(`http://127.0.0.1:8000/machine-registration/`, {
        name: machineName
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setMachineList(res);
      });
    e.target.reset();
  };
  console.log(errors);

  return (
    <div>
      <center>
        <h2>Machine Registration</h2>
      </center>
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
              type="text"
              name="machineName"
              ref={register({
                required: true,
                maxLength: 30,
                minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => userInput(e.target.value)}
              placeholder="Enter Machine Name"/>

            <br/>
            <p>{errorMessage}</p>

          <input type="submit" />
        </form>
    
    </div>
  );
}
