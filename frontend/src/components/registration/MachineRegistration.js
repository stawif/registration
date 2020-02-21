import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import InputField from '../modular/InputField';

export default function MachineRegistration() {
  const [machineName, setMachineName] = useState("");

  const { register, errors, handleSubmit, reset } = useForm();
  
  const onSubmit = (data, e) => {
    alert("machine registered successfully"+machineName);
    axios.post(`http://127.0.0.1:8000/machine-registration/`, {
        name: machineName
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        //setMachineList(res);
      });
    e.target.reset();
  };
  console.log(errors);

  return (
							<form className="form-container form-group" onSubmit={handleSubmit(onSubmit)}>
							<p className="headingViewPart">Machine Registration</p>
							<div className="pt-5">
                <InputField
                  type={"text"}
                  name={"machineName"} 
                  placeholder={"Machine name"}
                  machineName = {machineName}
                  onChange = { e => setMachineName(e.target.value) } 
                />
							</div>
              <br/>
							<button type="submit" className="btn btn-outline-dark">Save</button>
							</form>      
  );
}

/*
                <input 
                    type="text" 
                    className="mb-2" 
                    name="machineName" 
                    ref={register({
                      required: true,
                      maxLength: 30,
                      minLength: { value: 5, message: "Min length is 5" }
                    })}
                    placeholder="Machine Name" 
                    onChange={e => userInput(e.target.value)} 
                />
*/