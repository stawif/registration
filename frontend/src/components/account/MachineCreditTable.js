import React from 'react';
import MachineCredit from './MachineCredit';

class MachineCreditTable extends React.Component{
    constructor(props){
    }

    render(){
        return(
            <div className="tableDisplay">
                <div className="upperHeader">
                </div>
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
        );
    }
}

export default MachineCreditTable;