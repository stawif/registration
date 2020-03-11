import React from 'react';
import '../../tableDisplayCss.css';

class MachineWorkTable extends React.Component{
    fetchProduct = async (partyName) =>{
        console.log("Party name : ",this.props.partyName);
        const responsWorkDetail = await fetch('http://127.0.0.1:8000/machine-work-detail/', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                "party": partyName
                })
            });        
        console.log("Json response : ",responsWorkDetail);    
        const jsonWorkDetail = await responsWorkDetail.json();
        this.setState({
            workDetail: jsonWorkDetail
        });    
        console.log("Work Detail : ",this.state.jsonWorkDetail);
    }

    constructor(props){
        console.log("Machine work table debugging start...");
        super(props);
        this.state = {
            workDetail: {
                name: "",
                contact: "",
                village: "",
                crasher: "",
                work: []
            }
        }
        this.fetchProduct = this.fetchProduct.bind(this);
        this.fetchProduct(this.props.partyName);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.partyName != nextProps.partyName){
            this.fetchProduct(nextProps.partyName);
        }
    }

    render(){
        return(
            <div id="tableComponent">
                <div className="row upperTable bg-primary">
                    
                    <div className="col-sm-2">
                        <blockquote className="commonFont blockquote text-center">
                            <p className="mb-0"><b>{this.props.partyName}</b></p>
                            </blockquote>                        
                    </div>

                    <div className="col-sm-2">
                        <blockquote className="commonFont blockquote text-center">
                            <p className="mb-0">{this.state.workDetail.contact}</p>
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
                        <table className=" table table-borderd">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Drilling Feet</th>
                                    <th>Holes</th>
                                    <th>Diesel Amount</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.workDetail.work.map((work) => (
                                    <tr>
                                        <td>{work.date}</td>
                                        <td>{work.drilling_feet}</td>
                                        <td>{work.holes}</td>
                                        <td>{work.diesel_amount}</td>
                                        <td>{work.payment}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>

                <div className="row lowerTable text-center bg-primary">
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
        );
    }
}

export default MachineWorkTable;