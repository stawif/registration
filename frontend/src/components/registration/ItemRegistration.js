import React from "react";
import axios from "axios";

export default class ItemRegistration extends React.Component{
  constructor(props){
    super(props);

    this.state={
      itemName: "",
      itemMeasurement: "",
      itemQuantity: 0,
      itemList: {},
      itemExistMessage: "",
      buttonStatus: {
          visibility: 'visible'
      }
    }

    // Fetch item list from server
    this.state.fetchProduct = async () =>{
      const responseitemList = await fetch("http://127.0.0.1:8000/list-of-item/");
      const jsonitemList = await responseitemList.json();
      this.state.itemList = jsonitemList;
    }
    
    this.state.fetchProduct(); 

    // Check existence of item name 
    this.state.checkitem = () => {
      try {
        this.setState({
             itemExistMessage :"",
             buttonStatus: {
                 visibility: 'visible'           
             }
            });
        const showList = (item, index) => {
            if (this.state.itemName.toLowerCase() === item.name.toLowerCase()){
              this.setState({
                 itemExistMessage :"* This item name is already exist!!!",
                    buttonStatus: {
                  visibility: 'hidden'                 
                 }
              });
            }
            else{}
        };
        this.state.itemList.forEach(showList);
      } 
      catch (err) {}
    }

    this.state.onSubmit =(e) => {
        axios.post('http://127.0.0.1:8000/item-registration/', 
        {
          name: this.state.itemName,
          measurement: this.state.itemMeasurement,
          quantity: this.state.itemQuantity
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
         <p className="headingViewPart">Item Registration</p>
		<div className="pt-5">

        <input 
            type="text" 
            className="mb-2" 
            name="itemName" 
            placeholder="Item Name" 
            autocomplete="off"
            maxlength = "30"
            minLength = "2"
            onChange={
                e => {
                    this.state.itemName = e.target.value;
                    this.state.checkitem();
                }
            } 
            required
        />
        
        <p>{this.state.itemExistMessage}</p>
        <br/>  

        <input 
            type="text" 
            className="mb-2" 
            name="itemMeasurement" 
            placeholder="Item Measurement" 
            autocomplete="off"
            maxlength = "30"
            minLength = "1"
            onChange={
                e => {
                    this.state.itemMeasurement = e.target.value;
                }
            } 
            required
        />

        <br/>
        <br/>

        <input 
            type="number" 
            className="mb-2" 
            name="itemQuantity" 
            placeholder="Item Quantity" 
            autocomplete="off"
            minLength = "1"
            onChange={
                e => {
                    this.state.itemQuantity = e.target.value;
                }
            } 
            required
        />

        <hr/>

    </div>    
    <button type="submit" className="btn btn-outline-dark" style={this.state.buttonStatus} >Save</button>
    </form>  
    );
  }
}
