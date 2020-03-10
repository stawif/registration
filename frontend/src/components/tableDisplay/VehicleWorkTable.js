import React from 'react';

class VehicleWorkTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <p>{this.props.partyName}</p>
        );
    }
}

export default VehicleWorkTable;