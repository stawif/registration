import React from "react";
import axios from "axios";

export default class VehicleRegistration extends React.Component{
  constructor(props){
    super(props);

    this.state={
      vehicleName: "",
      vehicleExistStatus: "",
      vehicleList: {},
      buttonStatus: {
        visibility: 'visible'
      }
    }

    // Fetch vehicle list from server
    this.state.fetchProduct = async () =>{
      const responsevehicleList = await fetch("http://127.0.0.1:8000/list-of-vehicles/");
      const jsonvehicleList = await responsevehicleList.json();
      this.state.vehicleList = jsonvehicleList;
    }
    
    this.state.fetchProduct(); 

    // Check existence of vehicle name 
    this.state.checkvehicle = () => {
      try {
        this.setState({
             vehicleExistStatus :"",
             buttonStatus: {
              visibility: 'visible'           
             }
            });
        const showList = (item, index) => {
            if (this.state.vehicleName.localeCompare(item.name) == 0){
              this.setState({
                 vehicleExistStatus :"* This vehicle name is already exist!!!",
                 buttonStatus: {
                  visibility: 'hidden'                 
                 }
              });
            }
            else{}
        };
        this.state.vehicleList.forEach(showList);
      } 
      catch (err) {}
    }

    this.state.onSubmit =(e) => {
        axios.post('http://127.0.0.1:8000/vehicle-registration/', 
        {
          name: this.state.vehicleName
        }
        ).then(res => {
          this.state.fetchProduct();
        }
        ).catch(error => {
          //alert( error.response.request._response )
        });
      e.target.reset();
      e.preventDefault();
    };
  
  }
 
  render(){
    return (
		<form className="form-container form-group" onSubmit={ e => this.state.onSubmit(e) }>
    <p className="headingViewPart">vehicle Registration</p>
		<div className="pt-5">
        <input 
        type="text" 
        className="mb-2" 
        name="vehicleName" 
        placeholder="vehicle Name" 
        autocomplete="off"
        maxlength = "30"
        minLength = "5"
        onChange={
          e => {
          this.state.vehicleName = e.target.value;
          this.state.checkvehicle();
        }
        } 
        required
        />
    </div>    
    <p>{this.state.vehicleExistStatus}</p>     
    <button type="submit" className="btn btn-outline-dark" style={this.state.buttonStatus} >Save</button>
    </form>  
    );
  }
}
