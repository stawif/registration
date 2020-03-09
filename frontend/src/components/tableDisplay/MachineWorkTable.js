import React from 'react';
import '../../tableDisplayCss.css';

class MachineWorkTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            floatDisplay: {
                display: "float"
            }
        }
    }
    render(){
        return(
            <div id="tableComponent">
                <div className="row upperTable">
                    
                    <div className="col-sm-2">
                        <blockquote className="commonFont blockquote text-center">
                            <p className="mb-0"><b>Mahesh Party</b></p>
                            {/*<footer className="blockquote-footer"> 7742879818</footer>
                        */}</blockquote>                        
                    </div>

                    <div className="col-sm-2">
                        <blockquote className="commonFont blockquote text-center">
                            <p className="mb-0">7742879818</p>
                            {/*<footer className="blockquote-footer"> 7742879818</footer>
                        */}</blockquote>                        
                    </div>
                    
                    <div className="col-sm-2">
                    <blockquote className="commonFont blockquote text-center">
                            <input type="radio" name="optradio"/>paid
                    </blockquote>                        
                    </div>
                    
                    <div className="col-sm-2">
                    <blockquote className="commonFont blockquote text-center">
                            <input type="radio" name="optradio"/>Unpaid
                    </blockquote>                        
                    </div>
                    
                    <div className="col-sm-2">
                        <input type="date" />
                    </div>

                    <div className="col-sm-2">
                        <input type="date" />
                    </div>
                </div>
                <div id="midTable">
                </div>
                <div id="lowerTable">
                    <div className="row text-center commonFont">

                        <div className="col-sm-2">
                            <p>Drilling Feet =</p>
                        </div>
                        <div className="col-sm-1">
                            <p>1000</p>
                        </div>

                        <div className="col-sm-2">
                            <p>Diesel =</p>
                        </div>
                        <div className="col-sm-1">
                            <p>500</p>
                        </div>

                        <div className="col-sm-2">
                            <p>Payment =</p>
                        </div>
                        <div className="col-sm-1">
                            <p>30000</p>
                        </div>

                        <div className="col-sm-3">
                            <button
                                type="submit"
                                className="btn btn-outline-dark"
                                style={this.state.buttonStatus}
                            >
                                Payment
                            </button>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default MachineWorkTable;