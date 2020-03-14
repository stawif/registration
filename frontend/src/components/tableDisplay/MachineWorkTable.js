import React from 'react';
import '../../tableDisplayCss.css';

class MachineWorkTable extends React.Component{
    //setDateRestriction 
    setDateRestriction = (item, index) =>{
        if(item.paid == false){
            this.state.paymentData.minToDate = item.date;
            return false;
        }
        else{
            return true;
        }
    }
    // Fetch data of machine work from party name came with props
    fetchProduct = async (partyName) =>{
        const responsWorkDetail = await fetch('http://127.0.0.1:8000/machine-work-detail/', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                "party": partyName
                })
            });        
        const jsonWorkDetail = await responsWorkDetail.json();
        this.setState({
            workDetail: jsonWorkDetail
        });    
        this.setState({
            minFilterDate: jsonWorkDetail.work[0].date
        });
        this.setState({
            maxFilterDate: jsonWorkDetail.work.slice(-1)[0].date    
        });

        //Set paymentData minToDate
        jsonWorkDetail.work.every(this.setDateRestriction);

        //Set paymentData maxToDate
        this.state.paymentData.maxToDate = jsonWorkDetail.work.slice(-1)[0].date;
    }

    //Push paid and unpaid work objects in different arrays 
    paidFilter = (item, index) =>{
        if(item.paid == true){
            this.state.paidWork.push(item);
        }
        else{
            this.state.unPaidWork.push(item);
        }
    }

    // Set final showing rows of table currentWork
    setDateFilter = (item, index) => {
        if(this.state.minFilterDate <= item.date && item.date <= this.state.maxFilterDate){
            this.state.currentWork.push(item);
        }
    }

    //Handle selection of radio buttons and set paidStatus
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

    //Set paidStatus to null so that tables show both paid and unpaid
    setPaidStatusNull = () =>{
        this.setState({
            paidStatus: null
        }); 
    }

    //Prepare data for payment
    preparePaymentData = (item, index) =>{
        this.state.drillingFeet= this.state.drillingFeet + item.drilling_feet;
        this.state.dieselAmount= this.state.dieselAmount + item.diesel_amount;
        this.state.payment= this.state.payment + item.payment;
    }
    constructor(props){
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
            paidStatus: null,
            minDate: null,
            maxDate: null,
            minFilterDate: null,
            maxFilterDate: null,
            currentWork: [],
            drillingFeet: 0,
            dieselAmount: 0,
            payment: 0,
            paymentData:{
                fromDate: null,
                minToDate: null,
                maxToDate: null,
                drillingFeet: 0,
                dieselAmount: 0,
                payment: 0
            }
        }
        this.state.currentWork= null;
        this.fetchProduct = this.fetchProduct.bind(this);
        this.paidFilter = this.paidFilter.bind(this);
        this.setPaidStatus = this.setPaidStatus.bind(this);
        this.setDateFilter = this.setDateFilter.bind(this);
        this.setPaidStatusNull = this.setPaidStatusNull.bind(this);
        this.preparePaymentData = this.preparePaymentData.bind(this);
        this.setDateRestriction = this.setDateRestriction.bind(this);
        this.fetchProduct(this.props.partyName);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.partyName != nextProps.partyName){
            this.fetchProduct(nextProps.partyName);
        }
    }

    render(){
        // Reset all list so that next time it don't carry same values
        this.state.paidWork=[];
        this.state.unPaidWork=[];
        this.state.currentWork=[];

        //Reset total values of lower strip
        this.state.drillingFeet= 0;
        this.state.dieselAmount= 0;
        this.state.payment= 0;

        //Fill different lists
        this.state.workDetail.work.forEach(this.paidFilter);

        //Set current work according to radio button choices
        if(this.state.paidStatus==="paid"){
            this.currentWorkFromRadio= this.state.paidWork;
            this.state.minDate = Object(this.state.paidWork[0]).date;
            this.state.maxDate = Object(this.state.paidWork.slice(-1)[0]).date;
        }
        else if(this.state.paidStatus==="unpaid"){
            this.currentWorkFromRadio= this.state.unPaidWork;
            this.state.minDate = Object(this.state.unPaidWork[0]).date;
            this.state.maxDate = Object(this.state.unPaidWork.slice(-1)[0]).date;
        }
        else{
            this.currentWorkFromRadio= this.state.workDetail.work;
            this.state.minDate = Object(this.state.workDetail.work[0]).date;
            this.state.maxDate = Object(this.state.workDetail.work.slice(-1)[0]).date;
        }

        //Fill final list for show(Applying date filter)
        this.currentWorkFromRadio.forEach(this.setDateFilter);

        //Prepare payment data
        this.state.currentWork.forEach(this.preparePaymentData);

        return(
            <div id="tableComponent">
			
                <div className="row upperTable bg-primary">
                  
						<div className="col-sm-2">
							<blockquote className="commonFont blockquote text-center">
								<p className="mb-0" onClick={e => this.setPaidStatusNull()}><b>{this.props.partyName}</b></p>
							</blockquote>                        
						</div>

						<div className="col-sm-2">
							<blockquote className="commonFont blockquote text-center">
								<p className="mb-0">{this.state.workDetail.contact}</p>
								{/*<footer className="blockquote-footer"> 7742879818</footer>*/}
							</blockquote>                        
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
							<input type="date" min={this.state.minDate} max={this.state.maxDate} onChange={e => {
								this.setState({
									minFilterDate: e.target.value
								});
							}}/>
						</div>

						<div className="col-sm-2">
							<input type="date" min={this.state.minDate} max={this.state.maxDate} onChange={e => {
								this.setState({
									maxFilterDate: e.target.value
								});
							}}/>
						</div>
					
				</div>
				
				<div className="row topTable">
						<button className="col-6 bg-primary">Party</button>
						<button className="col-6 bg-primary">Payment</button>
				</div>
				
				<div className="midTable">
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
                            {this.state.currentWork.map((work) => (
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
						<p>{this.state.drillingFeet}</p>
					</div>

					<div className="col-sm-2">
						<p>Diesel =</p>
					</div>
							
					<div className="col-sm-1">
                        <p>{this.state.dieselAmount}</p>
					</div>

					<div className="col-sm-2">
						<p>Payment =</p>
					</div>
					
					<div className="col-sm-1">
						<p>{this.state.payment}</p>
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