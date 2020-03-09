import React from "react";
import './PinButtonCss.css';

class PinButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <button 
                type="button" 
                className={this.props.class}>
                    {this.props.partyName}
            </button>
        );
    }
}

export default PinButton;