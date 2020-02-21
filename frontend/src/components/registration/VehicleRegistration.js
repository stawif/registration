import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function VehicleRegistration() {
  const [data, setData] = useState({});
  const [vehiclename, userInput] = useState("");

  const { register, errors, handleSubmit } = useForm();

  async function fetchProduct() {
    const response = await fetch("http://127.0.0.1:8000/list-of-vehicle/");

    const res = await response.json();
    setData(res);
  }

  useEffect(() => {
    fetchProduct();
    checkVehicle();
  }, [vehiclename]);

  // below function is used to check typed vehicle name is already in database or not
  function checkVehicle() {
    try {
      const showList = (item, index) => {
        if (vehiclename === item.name) {
          alert("already exists, please enter different vehicle name");
        }
      };
      data.forEach(showList);
    } catch (err) {}
  }

  const onSubmit = data => {
    alert("vehicle registered successfully " + vehiclename);
    axios
      .post(`http://127.0.0.1:8000/vehicle-registration/`, {
        name: vehiclename
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setData(res);
      });
    window.location.reload(false);
  };

  return (
    <div>
      <center>
        <h2>Vehicle Registration</h2>
      </center>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="vehicleName"
              ref={register({
                required: true,
                maxLength: 30,
                minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => userInput(e.target.value)}
              placeholder="Enter Vehicle Name"
            />

            <div style={{ color: "red" }}>
              {Object.keys(errors).length > 0 && errors.vehicleName.message}
            </div>
          </div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
