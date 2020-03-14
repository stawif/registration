import React from 'react';
import '../../mobileTableDisplay.css';

class MobileMachineWorkTable extends React.Component {
	render() {
		return (
			<div id="mobileComponent">
				<div className="row topTable">
					<button className="col bg-primary">Party</button>
					<button className="col bg-primary">Payment</button>
				</div>
			</div>
		);
	}
}

export default MobileMachineWorkTable;