import React from 'react';
import Autocomplete from "../entry/AutoComplete";
import './account.css';
import Popup from "reactjs-popup";


class PurchaseDebit extends React.Component{
    // Fetch machine list from server
    fetchProduct = async () => {
        try {
            const responsePartyList = await fetch(
                "http://127.0.0.1:8000/list-of-purchaseparty/" 
            );
            const jsonPartyList = await responsePartyList.json();
            jsonPartyList.map(item => this.state.partyNamesFromApi.push(item.name));
            this.state.partyList = jsonPartyList;
        }
        catch {
        }
    };

  //form Handler Submitting
  onSubmit = async () => {
    const responsDebitDetail = await fetch('http://127.0.0.1:8000/purchase-party-debit/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "party": this.state.selectedParty
        })
    });        
    const jsonDebitDetail = await responsDebitDetail.json();

    if(jsonDebitDetail.debits.length!=0)
    {
        this.setState({
            minDate: jsonDebitDetail.debits[0].date
        });
        this.setState({
            maxDate: jsonDebitDetail.debits.slice(-1)[0].date    
        });
    } 
    this.setState({
        debitDetail: jsonDebitDetail,
        input:{
            display: "none"
        },
        table:{
            display: "block"
        }
    });
  };

  
    // Set final showing rows of table currentWork
    setDateFilter = (item, index) => {
        if(!this.state.minFilterDate){
            this.state.minFilterDate= this.state.minDate;
        }
        if(!this.state.maxFilterDate){
            this.state.maxFilterDate= this.state.maxDate;
        }
        if(this.state.minFilterDate <= item.date && item.date <= this.state.maxFilterDate){
            this.state.currentDebit.push(item);
        }
    }


    constructor(props){
        super(props);
        this.state= {
            debitDetail: {
                party: "",
                contact: "",
                village: "",
                crasher: "",
                debits: []
            },
            minDate: null,
            maxDate: null,
            minFilterDate: null,
            maxFilterDate: null,
            startDate: null,
            endDate: null,
            currentDebit: [],
            partyList: {},
            selectedParty: "",
            partyNamesFromApi: [],
            input:{
                display: "block"
            },
            table:{
                display: "none"
            }
        }
        
        this.fetchProduct= this.fetchProduct.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.setDateFilter= this.setDateFilter.bind(this);
        this.fetchProduct();
    }
    render(){
        //Clean old data
        this.state.currentDebit=[];
        
        //  fill current debit
        this.state.debitDetail.debits.forEach(this.setDateFilter);

        return(
            <div id="mainDiv" className="d-flex justify-content-center align-items-center scrollingSection">
                <div className="tableShow" style={this.state.table}>
                    <div className="upperHeader row">
                        <div className="col-sm-2">
                            <blockquote className="commonFont blockquote text-center">
								<p className="mb-0"><b>{this.state.debitDetail.party}</b></p>
							</blockquote>                        
                        </div>
                        <div className="col-sm-2">
                            <blockquote className="commonFont blockquote text-center">
								<p className="mb-0">{this.state.debitDetail.contact}</p>
							</blockquote>                        
                        </div>
                        <div className="col-sm-2">
                            <blockquote className="commonFont blockquote text-center">
								<p className="mb-0">{this.state.debitDetail.village}</p>
							</blockquote>                        
                        </div>
                        <div className="col-sm-3">
                            <input type="date" min={this.state.minDate} max={this.state.maxDate} onChange={e => {
                                this.setState({
                                    minFilterDate: e.target.value
                                });
                            }}/>
                        </div>
                        <div className="col-sm-3">
                            <input type="date" min={this.state.minDate} max={this.state.maxDate} onChange={e => {
                                this.setState({
                                    maxFilterDate: e.target.value
                                });
                            }}/>
                        </div>
                    </div>
					<div className="highTable">

						<div>
							{/*Party and filter popup*/}
							<Popup modal trigger={
								<button className="bg-primary">Party</button>
	                        } 
							>
							
								<h4>{this.state.debitDetail.party}</h4>
								<h4>{this.state.debitDetail.contact}</h4>
								<h4>{this.state.debitDetail.village}</h4>
								<input type="date" min={this.state.minDate} max={this.state.maxDate} onChange={e => {
									this.setState({
										minFilterDate: e.target.value
									});
								}}/>

								<input type="date" min={this.state.minDate} max={this.state.maxDate} onChange={e => {
									this.setState({
										maxFilterDate: e.target.value
									});
								}}/>
						
							</Popup>
						</div>
					</div>
					<div className="lowerHeader">
						<table className="table table-borderd tablePart">
							<thead className="thead-dark">
								<tr>
									<th>Date</th>
									<th>Debit Amount</th>
									<th>Remark</th>
								</tr>
							</thead>
							<tbody>
								{this.state.currentDebit.map((debit) => (
									<tr>
										<td>{debit.date}</td>
										<td>{debit.debit_amount}</td>
										<td>{debit.remark}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
                <form
                    className="form-container form-group"
                    style={this.state.input}
                >
                        <p className="headingViewPart">Purchase Party Debit</p>
                        <br />

                        <Autocomplete
                            suggestions={this.state.partyNamesFromApi}
                            callbackFromParent={dataFromChild => {
                            this.state.selectedParty = dataFromChild;
                            }}
                            placeholderfrom={"Party name"}
                        />
                        <br />
                        <br />
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            style={this.state.buttonStatus}
                            onClick={e => this.onSubmit()}>
                        Show
                        </button>
                </form>
            </div>    
        );
    }
}

export default PurchaseDebit;