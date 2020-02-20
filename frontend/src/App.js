import React, { Component } from 'react';
import './machine.css';
//import './App.css';
//import MachineRegistration from './components/registration/MachineRegistration';
//import BasicValidation from './components/registration/BasicValidation';
//import PartyReg from './components/registration/PartyReg';
//import PartyDisplay from './components/displaydata/PartyDisplay';
//import VehicleReg from './components/registration/VehicleReg';

class App extends React.Component {
	render() {
		return (
			<div>
				<div id="container" className="row">
					<div id="controller" className="col-sm-3">
						<center> <p className="headingDashboard">DASHBOARD</p> </center>
					</div>
					<div className="col-sm-9">
						<div id="viewPart" className="d-flex justify-content-center align-items-center">
							<form className="form-container form-group">
							<p className="headingViewPart">Machine Registration</p>
							<div className="pt-5">
								<input type="text" className="mb-2" name="machine" placeholder="Machine Name" required/>
							</div>
							<br/>
							<button type="submit" className="btn btn-outline-dark">Save</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App;
