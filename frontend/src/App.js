import React, {useState,useEffect} from 'react';
import './homePage.css';
import MachineRegistration from './components/registration/MachineRegistration';
import VehicleRegistration from './components/registration/VehicleRegistration';
import PartyRegistration from './components/registration/PartyRegistration';
import ItemRegistration from './components/registration/ItemRegistration';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			allPages: {
				machineReg: "machineRegisration",
				vehicleReg: "vehicleRegistration",
				partyReg: "partyRegistration",
				itemReg: "itemRegistration"
			},
			currentPage: "machineRegistration"
		}

		this.updateCurrentPage = this.updateCurrentPage.bind(this);
	}
	
	updateCurrentPage = async (choosePage) => {
		console.log("choosePage : "+choosePage);
		await this.setState({
			currentPage: choosePage
		});
		console.log(this.state.currentPage);
	}

	render()
	{
		let currentComponent;
		if(this.state.currentPage === this.state.allPages.machineReg){
			currentComponent = <MachineRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.vehicleReg){
			currentComponent = <VehicleRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.partyReg){
			currentComponent = <PartyRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.itemReg){
			currentComponent = <ItemRegistration />
		}
		else{
			currentComponent = <MachineRegistration />
		} 
		return (
			<div>
				<div id="container" className="row">
					<div id="controller" className="col-sm-3">
						<center> <p className="headingDashboard">DASHBOARD</p> </center>
					</div>
					<div className="col-sm-9">
						<nav className="navbar navbar-expand-lg navbar-light bg-light">
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
              
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<a className="nav-link" href="">Logout<span className="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Registration
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											<a className="dropdown-item" onClick={ () => this.updateCurrentPage(this.state.allPages.machineReg) }>Machine</a>
											<a className="dropdown-item" onClick={ () => this.updateCurrentPage(this.state.allPages.vehicleReg) } >Vehicle</a>
											<a className="dropdown-item" onClick={ () => this.updateCurrentPage(this.state.allPages.partyReg) } >Party</a>
											<a className="dropdown-item" onClick={ () => this.updateCurrentPage(this.state.allPages.itemReg) } >Item</a>
										</div>
									</li>
									<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Entry
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											<a className="dropdown-item" href="">Machine Work</a>
											<a className="dropdown-item" href="">Vehicle Work</a>
											<a className="dropdown-item" href="">Daily Work</a>
										</div>
									</li>
									<li className="nav-item">
										<a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Display
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											<a className="dropdown-item" href="">Account</a>
											<a className="dropdown-item" href="">Party status</a>
											<a className="dropdown-item" href="">Store status</a>
										</div>
									</li>
								</ul>
								<form className="form-inline my-2 my-lg-0">
									<input className="form-control mr-sm-2" type="search" placeholder="Party" aria-label="Search"/>
									<button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Status</button>
								</form>
							</div>
						</nav> 
						<div id="viewPart" className="d-flex justify-content-center align-items-center">
							{ currentComponent }
						</div>
					</div>
				</div>
			</div>
		);
	}	
}


export default App;

