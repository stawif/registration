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
    }

    paidFilter = (item, index) =>{
        if(item.paid == true){
            this.state.paidWork.push(item);
        }
        else{
            this.state.unPaidWork.push(item);
        }
    }

    setPaidStatus = (status) =>{
        if(status==="paid"){
            this.setState({
                paidStatus: "paid"
            });
        }
        else if(status==="unpaid"){
            this.setState({
                paidStatus: "unpaid"
            });
        }
        else{
            this.setState({
                paidStatus: null
            });
        }
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
            },
            paidWork: [],
            unPaidWork: [],
            paidStatus: null
        }
        this.currentWork= null;
        this.fetchProduct = this.fetchProduct.bind(this);
        this.paidFilter = this.paidFilter.bind(this);
        this.setPaidStatus = this.setPaidStatus.bind(this);
        this.fetchProduct(this.props.partyName);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.partyName != nextProps.partyName){
            this.fetchProduct(nextProps.partyName);
        }
    }

    render(){
        this.state.paidWork=[];
        this.state.unPaidWork=[];
        this.state.workDetail.work.forEach(this.paidFilter);
        if(this.state.paidStatus==="paid"){
            this.currentWork= this.state.paidWork;
        }
        else if(this.state.paidStatus==="unpaid"){
            this.currentWork= this.state.unPaidWork;
        }
        else{
            this.currentWork= this.state.workDetail.work;
        }
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
                            <input type="radio" name="paidStatus" value="paid" onChange={ e => {this.setPaidStatus(e.target.value)}}/>paid
                    </blockquote>                        
                    </div>
                    
                    <div className="col-sm-2">
                    <blockquote className="commonFont blockquote text-center">
                            <input type="radio" name="paidStatus" value="unpaid" onChange={ e => {this.setPaidStatus(e.target.value)}} />Unpaid
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
                                    <th>Paid</th>
                                    <th>Date</th>
                                    <th>Drilling Feet</th>
                                    <th>Holes</th>
                                    <th>Diesel Amount</th>
                                    <th>Machine</th>
                                    <th>Payment</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.currentWork.map((work) => (
                                    <tr>
                                        <td>{<input type="checkbox" checked={work.paid}></input>}</td>
                                        <td>{work.date}</td>
                                        <td>{work.drilling_feet}</td>
                                        <td>{work.holes}</td>
                                        <td>{work.diesel_amount}</td>
                                        <td>{work.machine}</td>
                                        <td>{work.payment}</td>
                                        <td>{work.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>

                <div className="row lowerTable text-center bg-primary commonFont">
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