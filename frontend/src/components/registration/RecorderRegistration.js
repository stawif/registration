import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function RecorderRegistration() {
  const [recordername, userInput] = useState("");
  const [password, userPassword] = useState("");

  const { register, errors, handleSubmit, getValues } = useForm();

  const onSubmit = data => {
    alert("recorder registered successfully " + recordername);
    axios
      .post(`http://127.0.0.1:8000/recorder-registration/`, {
        username: recordername,
        password: password
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
        <h2>Recorder Registration</h2>
      </center>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="recorderName"
              ref={register({
                required: true,
                maxLength: 30,
                minLength: { value: 5, message: "Min length is 5" }
              })}
              onChange={e => userInput(e.target.value)}
              placeholder="Enter Recorder Name"
            />
            {/* <input
              type="password"
              name="password"
              ref={register({
                required: true,
                maxLength: 30,
                minLength: {
                  value: 8,
                  message: "Min length is 8",
                  pattern: /^[A-Za-z]\w{7,14}$/
                }
              })}
              onChange={e => userPassword(e.target.value)}
              placeholder="Enter Password"
            /> */}

            <input
              type="password"
              name="password"
              ref={register({ required: "Password is required!" })}
              onChange={e => userPassword(e.target.value)}
            />
            {/* {errors.password && (
              <p style={{ color: "white" }}>{errors.password.message}</p>
            )} */}

            <input
              name="passwordConfirmation"
              ref={register({
                required: "Please confirm password!",
                validate: {
                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  }
                }
              })}
            />
            {/* {errors.passwordConfirmation && (
              <p style={{ color: "white" }}>
                {errors.passwordConfirmation.message}
              </p>
            )} */}
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
