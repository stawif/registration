import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function MachineRegistration() {
  const [data, setData] = useState({});
  const [machinename, userInput] = useState("");

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
      //errors.firstName.message();
      const showList = (item, index) => {
        if (machinename === item.name) {
          alert("please enter different machine name");
        }
      };
      data.forEach(showList);
    } catch (err) {}
  }

  const { register, errors, handleSubmit, reset } = useForm();
  const onSubmit = (data, e) => {
    alert("machine registered successfully"+machinename);
    axios
      .post(`http://127.0.0.1:8000/machine-registration/`, {
        name: machinename
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setData(res);
      });
    e.target.reset();
  };
  console.log(errors);

  return (
    <div>
      <center>
        <h2>Machine Registration</h2>
      </center>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="machineName"
              ref={register({
                required: true,
                maxLength: 30,
                minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => userInput(e.target.value)}
              placeholder="Enter Machine Name"
            />

            <div style={{ color: "red" }}>
              {Object.keys(errors).length > 0 && errors.machineName.message}
            </div>
          </div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
