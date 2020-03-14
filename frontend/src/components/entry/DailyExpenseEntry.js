import React from 'react';
import InputCommonName from '../modular/InputCommonName';
import InputDateField from '../modular/InputDateField';
import InputRateField from '../modular/InputRateField';

class DailyExpenseEntry extends React.Component{
    constructor(props){
        super(props);
    }    

    render(){
        return(
            <form
            className="form-container form-group"
            onSubmit={e => this.onSubmit(e)} >
                <p className="headingViewPart">Daily Expense Entry</p>

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
                <select >
                    <option value="volvo">Staff</option>
                    <option value="saab">Petrol</option>
                    <option value="opel">Food</option>
                    <option value="audi">Office Accesories</option>
                    <option value="audi">Others</option>
                </select>                
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

export default DailyExpenseEntry;