import React from 'react';
import InputCommonName from '../modular/InputCommonName';
import InputDateField from '../modular/InputDateField';
import InputRateField from '../modular/InputRateField';

class PartEntry extends React.Component{
    constructor(props){
        super(props);
    }    

    render(){
        return(
            <form
            className="form-container form-group"
            onSubmit={e => this.onSubmit(e)} >
                <p className="headingViewPart">Parts Entry</p>

                <input 
                    type="text"
                    placeholder="Part Names" />
                <br/>
                <br/>
                <input 
                    type="date" />
                <br/>
                <br/>
                <input
                    type="number"
                    placeholder="Part Rate" />  
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

export default PartEntry;