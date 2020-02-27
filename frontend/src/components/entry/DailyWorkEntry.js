import React from "react";
import axios from "axios";

export default class DailyWorkEntry extends React.Component{
  constructor(props){
    super(props);

    this.state={
      partyName: "",
      partyContact: "",
      partyVillage: "",
      date: null,
      fiveFeet: 0,
      fiveFeetRate: 0,
      twoHalfFeet: 0,
      twoHalfFeetRate: 0,
      dieselSpend: 0,
      responseMessage: "",
      buttonStatus: {
          visibility: 'visible'
      }
    }

    this.state.onSubmit =(e) => {
        axios.post('http://127.0.0.1:8000/enter-daily-work/', 
        {
          name: this.state.partyName,
          contact: this.state.partyContact,
          village: this.state.partyVillage,
          date: this.state.date,
          five_feet: this.state.fiveFeet,
          five_feet_rate: this.state.fiveFeetRate,
          two_half_feet: this.state.twoHalfFeet,
          two_half_feet_rate: this.state.twoHalfFeetRate,
          diesel_spend: this.state.dieselSpend
        }
        ).then(res => {
          this.setState({
            responseMessage: res.data
          });         
        }
        ).catch(error => {
           console.log( error.response.request._response )
        });
      console.log(this.state.partyName);  
      console.log(this.state.partyContact);  
      console.log(this.state.partyVillage);  
      console.log(this.state.fiveFeet);  
      console.log(this.state.fiveFeetRate);  
      console.log(this.state.twoHalfFeet);  
      console.log(this.state.twoHalfFeetRate);  
      console.log(this.state.dieselSpend);  
      console.log(this.state.date);  
      e.target.reset();
      e.preventDefault();
    };
  
  }
 
  render(){
    return (
		<form className="form-container form-group" onSubmit={ e => this.state.onSubmit(e) }>
         <p className="headingViewPart">Daily Work Entry</p>
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
                }
            } 
            required
        />
        
        <p>{this.state.workerExistMessage}</p>
        <br/>  

        <input 
            type="number" 
            className="mb-2" 
            name="partyContact" 
            placeholder="Contact" 
            autoComplete="off"
            maxLength = "10"
            minLength = "10"
            onChange={
                e => {
                    this.state.partyContact = parseInt(e.target.value);
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
            placeholder="Village" 
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
        
          <br/>
          <br/>

          <input
            type="date"
            data-date-format="YYYY-MM-DD"
            defaultValue={this.state.date}
            name="date"
            onChange={e => {
              this.state.date = e.target.value;
            }}
            required
          />
        
        <br/>  
        <br/>        

        <input 
            type="number" 
            className="mb-2" 
            name="fiveFeet" 
            placeholder="5 Feet" 
            autoComplete="off"
            onChange={
                e => {
                    this.state.fiveFeet = parseInt(e.target.value);
                }
            } 
            required
        />

        <br/>
        <br/>

        <input 
            type="number" 
            className="mb-2" 
            name="fiveFeetRate" 
            placeholder="5 Feet Rate" 
            autoComplete="off"
            onChange={
                e => {
                    this.state.advance = parseInt(e.target.value);
                }
            } 
            required
        />
        
        <br/>  
        <br/>        

        <input 
            type="number" 
            className="mb-2" 
            name="twoHalfFeet" 
            placeholder="2.5 Feet" 
            autoComplete="off"
            onChange={
                e => {
                    this.state.twoHalfFeet = parseInt(e.target.value);
                }
            } 
            required
        />

        <br/>
        <br/>
            
        <input 
            type="number" 
            className="mb-2" 
            name="twoHalfFeetRate" 
            placeholder="2.5 Feet Rate" 
            autoComplete="off"
            onChange={
                e => {
                    this.state.twoHalfFeetRate = parseInt(e.target.value);
                }
            } 
            required
        />

<br/>
        <br/>
            
        <input 
            type="number" 
            className="mb-2" 
            name="dieselSpend" 
            placeholder="Diesel Spend" 
            autoComplete="off"
            onChange={
                e => {
                    this.state.dieselSpend = parseInt(e.target.value);
                }
            } 
            required
        />

    </div>    
    <p>{this.state.responseMessage}</p>
    <button type="submit" className="btn btn-outline-dark" style={this.state.buttonStatus} >Save</button>
    </form>  
    );
  }
}
