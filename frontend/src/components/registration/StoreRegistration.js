import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function StoreRegistration() {
  const [name, setName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [quantity, setQuantity] = useState(0);

  const { register, errors, handleSubmit, getValues } = useForm();

  const [data, setData] = useState({});

  async function fetchProduct() {
    const response = await fetch("http://127.0.0.1:8000/list-of-item/");

    const res = await response.json();
    setData(res);
  }

  useEffect(() => {
    fetchProduct();
    checkVehicle();
  }, [name]);

  // below function is used to check typed vehicle name is already in database or not
  function checkVehicle() {
    try {
      const showList = (item, index) => {
        if (name === item.name) {
          alert("already exists, please enter different vehicle name");
        }
      };
      data.forEach(showList);
    } catch (err) {}
  }
  const onSubmit = data => {
    alert("store registered successfully " + name);
    axios
      .post(`http://127.0.0.1:8000/store-registration/`, {
        name: name,
        measurement: measurement,
        quantity: quantity
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    window.location.reload(false);
  };

  return (
    <div>
      <center>
        <h2>Store Registration</h2>
      </center>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="name"
              ref={register({
                required: true,
                maxLength: 30,
                minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Store Name"
            />
            <input
              type="text"
              name="measurement"
              ref={register({
                required: true,
                maxLength: 30
                // minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => setMeasurement(e.target.value)}
              placeholder="Enter Measurement"
            />
            <input
              type="text"
              pattern="[0-9]*"
              name="quantity"
              ref={register({
                required: true,
                maxLength: 30
                // minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Enter Quantity"
            />
            {/* <div style={{ color: "red" }}>
              {Object.keys(errors).length > 0 && errors.password.message}
            </div> */}
          </div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
