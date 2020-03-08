import React from 'react';

class MachineWorkTable extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="mainComponent">
                <div className="row upperTable">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6"></div>
                </div>
                <div id="midTable"></div>
                <div id="lowerTable"></div>
            </div>
        );
    }
}

export default MachineWorkTable;