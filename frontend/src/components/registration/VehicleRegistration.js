import React from "react";
import axios from "axios";
import InputCommonName from "../modular/InputCommonName"

export default class VehicleRegistration extends React.Component{
  constructor(props){
    super(props);

    this.state={
      vehicleName: "",
      vehicleExistStatus: "",
      vehicleList: {},
      responseMessage: "",
      buttonStatus: {
        visibility: 'visible'
      }
    }

    // Fetch vehicle list from server
    this.state.fetchProduct = async () =>{
      const responseVehicleList = await fetch("http://127.0.0.1:8000/list-of-vehicles/");
      const jsonVehicleList = await responseVehicleList.json();
      this.state.vehicleList = jsonVehicleList;
    }
    
    this.state.fetchProduct(); 

    // Check existence of vehicle name 
    this.state.checkVehicle = () => {
      try {
        this.setState({
             vehicleExistStatus :"",
             responseMessage: "",
             buttonStatus: {
              visibility: 'visible'           
             }
            });
        const showList = (item, index) => {
            if (this.state.vehicleName.toLowerCase() === item.name.toLowerCase()){
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
          this.setState({
            responseMessage: res.data
          });
        }
        ).catch(error => {});
      e.target.reset();
      e.preventDefault();
    };
  
  }
 
  render(){
    return (
		<form className="form-container form-group" onSubmit={ e => this.state.onSubmit(e) }>
    <p className="headingViewPart">vehicle Registration</p>
		<div className="pt-5">

    <InputCommonName
            minLength={"5"}
            placeholderParent={"Vehicle Name"}
            callbackFromParent={dataFromChild => {
              this.state.vehicleName = dataFromChild;
            }}
            checkFromParent={this.state.checkVehicle}
          />
        
    </div>    
    <p>{this.state.vehicleExistStatus}</p>     
    <p>{this.state.responseMessage}</p>
    <button type="submit" className="btn btn-outline-dark" style={this.state.buttonStatus} >Save</button>
    </form>  
    );
  }
}
