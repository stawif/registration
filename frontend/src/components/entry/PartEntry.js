import React from 'react';
import axios from "axios";
import InputCommonName from '../modular/InputCommonName';
import InputDateField from '../modular/InputDateField';
import InputRateField from '../modular/InputRateField';
import InputRemarkField from "../modular/InputRemarkField";

class PartEntry extends React.Component{
  //form Handler Submitting
  onSubmit = e => {
    axios
      .post("http://127.0.0.1:8000/enter-part/", {
          name: this.state.name,
          debit_amount: this.state.debitAmount,
          date: this.state.date,
          remark: this.state.remark
      })
      .then(res => {
        this.setState({
          responseMessage: res.data
        });
      })
      .catch(error => {
        console.log(error.response.request._response);
      });

    e.target.reset();
    e.preventDefault();
  };

  constructor(props){
        super(props);
        this.state={
            name: "",
            debitAmount: 0,
            date: null,
            remark: "",
            responseMessage: ""
        }

        this.onSubmit= this.onSubmit.bind(this);
    }    

    render(){
        return(
            <form
            className="form-container form-group"
            onSubmit={e => this.onSubmit(e)} >
                <p className="headingViewPart">Parts Entry</p>
                
                <br />
                <InputCommonName 
                        placeholderParent="Item Name"
                        callbackFromParent= {
                        dataFromPrent =>{
                            this.state.name= dataFromPrent
                        } 
                    }
                />

                <br/>
                <br/>

                <InputRateField 
                        placeholderParent="Item Rate"
                        callbackFromParent= {
                        dataFromPrent =>{
                            this.state.debitAmount= dataFromPrent
                        } 
                    }
                />

                <br/>
                <br/>

                <InputDateField
                    callbackFromParent= {
                        dataFromPrent =>{
                            this.state.date= dataFromPrent
                        } 
                    }
                />

                <br/>
                <br/>          

                <InputRemarkField 
                    callbackFromParent= {
                        dataFromPrent =>{
                            this.state.remark= dataFromPrent
                        } 
                    }
                />
                <p>{this.state.responseMessage}</p>
                <button
                type="submit"
                className="btn btn-outline-dark"
                >
                Save
                </button>
            </form>
        );
    };
}

export default PartEntry;