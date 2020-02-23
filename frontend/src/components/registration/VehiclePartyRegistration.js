import React from "react";
import axios from "axios";

export default class VehiclePartyRegistration extends React.Component{
  constructor(props){
    super(props);

    this.state={
      partyName: "",
      partyContact: "",
      partyVillage: "",
      partyList: {},
      partyExistMessage: "",
      buttonStatus: {
          visibility: 'visible'
      },
      radioButtonStyle: {
          float: 'left'
      }
    }

    // Fetch party list from server
    this.state.fetchProduct = async () =>{
      const responsepartyList = await fetch("http://127.0.0.1:8000/list-of-vehicleparty/");
      const jsonpartyList = await responsepartyList.json();
      this.state.partyList = jsonpartyList;
    }
    
    this.state.fetchProduct(); 

    // Check existence of party name 
    this.state.checkparty = () => {
      try {
        this.setState({
             partyExistMessage :"",
             buttonStatus: {
                 visibility: 'visible'           
             }
            });
        const showList = (item, index) => {
            if (this.state.partyName.toLowerCase() === item.name.toLowerCase()){
              this.setState({
                 partyExistMessage :"* This party name is already exist!!!",
                    buttonStatus: {
                  visibility: 'hidden'                 
                 }
              });
            }
            else{}
        };
        this.state.partyList.forEach(showList);
      } 
      catch (err) {}
    }

    this.state.onSubmit =(e) => {
        axios.post('http://127.0.0.1:8000/vehicle-party-registration/', 
        {
          name: this.state.partyName,
          contact: this.state.partyContact,
          village: this.state.partyVillage
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
         <p className="headingViewPart">Vehicle Party Registration</p>
		<div className="pt-5">

        <input 
            type="text" 
            className="mb-2" 
            name="partyName" 
            placeholder="Party Name" 
            autoComplete="off"
            maxLength = "30"
            minLength = "5"
            onChange={
                e => {
                    this.state.partyName = e.target.value;
                    this.state.checkparty();
                }
            } 
            required
        />
        
        <p>{this.state.partyExistMessage}</p>
        <br/>  

        <input 
            type="number" 
            className="mb-2" 
            name="partyContact" 
            placeholder="Party Contact" 
            autoComplete="off"
            maxLength = "10"
            minLength = "10"
            onChange={
                e => {
                    this.state.partyContact = e.target.value;
                }
            } 
            required
        />

        <br/>
        <br/>

        <input 
            type="text" 
            className="mb-2" 
            name="partyVillage" 
            placeholder="Party Village" 
            autoComplete="off"
            maxLength = "30"
            minLength = "5"
            onChange={
                e => {
                    this.state.partyVillage = e.target.value;
                }
            } 
            required
        />

    </div>    
    <button type="submit" className="btn btn-outline-dark" style={this.state.buttonStatus} >Save</button>
    </form>  
    );
  }
}
