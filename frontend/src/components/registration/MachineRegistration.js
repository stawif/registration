import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from 'qs';
//import { useForm } from "react-hook-form";
//import InputField from '../modular/InputField';


export default class MachineRegistration extends React.Component{
  constructor(props){
    super(props);

    this.state={
      machienName: "",
      errorMessage: "",
      machineList: {},
      buttonStatus: {
        visibility: 'visible'
      }
    }

    this.state.fetchProduct = async () =>{
      console.log("Fetch calls");
      const responseMachineList = await fetch("http://127.0.0.1:8000/list-of-machines/");
      const jsonMachineList = await responseMachineList.json();
      this.state.machineList = jsonMachineList;
    }
    this.state.fetchProduct(); 

    this.state.checkMachine = () => {
      console.log("Come in check");
      try {
        this.setState({
             errorMessage :"",
             buttonStatus: {
              visibility: 'visible'           
             }
            });
        const showList = (item, index) => {
            if (this.state.machienName.localeCompare(item.name) == 0){
              this.setState({
                 errorMessage :"* This machine name is already exist!!!",
                 buttonStatus: {
                  visibility: 'hidden'                 
                 }
              });
            }
            else{}
        };
        this.state.machineList.forEach(showList);
      } 
      catch (err) {}
    }

    this.state.onSubmit =(e) => {
        axios.post('http://127.0.0.1:8000/machine-registration/', 
        {
          name: this.state.machienName
        }
        ).then(res => {
          this.state.fetchProduct();
        }
        ).catch(error => {
          alert( error.response.request._response )
        });
      e.target.reset();
      e.preventDefault();
    };
  
  }
 
  render(){
    return (
		<form className="form-container form-group" onSubmit={ e => this.state.onSubmit(e) }>
    <p className="headingViewPart">Machine Registration</p>
		<div className="pt-5">
        <input 
        type="text" 
        className="mb-2" 
        name="machineName" 
        placeholder="Machine Name" 
        autocomplete="off"
        maxlength = "30"
        minLength = "5"
        onChange={
          e => {
          this.state.machienName = e.target.value;
          this.state.checkMachine();
        }
        } 
        />
    </div>    
    <p>{this.state.errorMessage}</p>     
    <button type="submit" className="btn btn-outline-dark" style={this.state.buttonStatus} >Save</button>
    </form>  
    );
  }
}
