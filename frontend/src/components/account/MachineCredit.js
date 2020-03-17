import React from 'react';
import Autocomplete from "../entry/AutoComplete";

class MachineCredit extends React.Component{
    // Fetch machine list from server
    fetchProduct = async () => {
        try {
        const responsePartyList = await fetch(
            "http://127.0.0.1:8000/list-of-machineparty/" 
        );
        const jsonPartyList = await responsePartyList.json();
        jsonPartyList.map(item => this.state.partyNamesFromApi.push(item.name));
        this.state.partyList = jsonPartyList;
        } catch {
        }
    };

  //form Handler Submitting
  onSubmit = async e => {
    const responsCreditDetail = await fetch('http://127.0.0.1:8000/machine-party-credit/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "party": this.state.selectedParty
        })
    });        
    const jsonCreditDetail = await responsCreditDetail.json();

    this.state.creditDetail= jsonCreditDetail;
    /*this.setState({
        creditDetail: jsonCreditDetail
    });*/    

    this.setState({
        input: {
            visibility: "hidden"
        },
        table: {
            visibility: "visible"
        }
    });

    //e.target.reset();
    e.preventDefault();
  };

    constructor(props){
        super(props);
        this.state= {
            creditDetail: {
                party: "",
                contact: "",
                village: "",
                crasher: "",
                credits: []
            },
            partyList: {},
            selectedParty: "",
            input: {
                visibility: "visible"
            },
            table: {
                visibility: "hidden"
            },
            partyNamesFromApi: []
        }
        
        this.fetchProduct= this.fetchProduct.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.fetchProduct();
    }
    render(){
        return(
            <form
            className="form-container form-group"
            onSubmit={e => this.onSubmit(e)}
            >
                <div style={this.state.table}>
                <table className=" table table-borderd">
                        <thead className="thead-dark">
                            <tr>
                                <th>Date</th>
                                <th>Credit Amount</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.creditDetail.credits.map((credit) => (
                                <tr>
                                    <td>{credit.date}</td>
                                    <td>{credit.credit_amount}</td>
                                    <td>{credit.remark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={this.state.input}>
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
                        type="submit"
                        className="btn btn-outline-dark"
                        style={this.state.buttonStatus}>
                    Save
                    </button>
                </div>
            </form>
        );
    }
}

export default MachineCredit;