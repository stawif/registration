import React from 'react';
import InputCommonName from '../modular/InputCommonName';
import InputDateField from '../modular/InputDateField';
import InputRateField from '../modular/InputRateField';

class OwnerDebitEntry extends React.Component{
    constructor(props){
        super(props);
    }    

    render(){
        return(
            <form
            className="form-container form-group"
            onSubmit={e => this.onSubmit(e)} >
                <p className="headingViewPart">Owner Debit Entry</p>

                <input 
                    type="date" />
                <br/>
                <br/>
                <input 
                    type="number"
                    placeholder="Money" />
                <br/>
                <br/>
                <input
                    type="text"
                    placeholder="Remark" />  
                <br/>
                <br/>          
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

export default OwnerDebitEntry;