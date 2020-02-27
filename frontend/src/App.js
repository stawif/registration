import React from 'react'; //
import './homePage.css';
import MachineRegistration from './components/registration/MachineRegistration';
import VehicleRegistration from './components/registration/VehicleRegistration';
import ItemRegistration from './components/registration/ItemRegistration';
import WorkerRegistration from './components/registration/WorkerRegistration';
import MachinePartyRegistration from './components/registration/MachinePartyRegistration';
import VehiclePartyRegistration from './components/registration/VehiclePartyRegistration';
import PurchasePartyRegistration from './components/registration/PurchasePartyRegistration';
import MachineWorkEntry from './components/entry/MachineWorkEntry';
import VehicleWorkEntry from './components/entry/VehicleWorkEntry';
import PurchaseEntry from './components/entry/PurchaseEntry';
import MachineSupplyEntry from './components/entry/MachineSupplyEntry';
import VehicleSupplyEntry from './components/entry/VehicleSupplyEntry';
import DailyWorkEntry from './components/entry/DailyWorkEntry';


class App extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			allPages: {
				machineReg: "machineRegisration",
				vehicleReg: "vehicleRegistration",
				itemReg: "itemRegistration",
				machinePartyReg: "machinePartyRegistration",
				vehiclePartyReg: "vehiclePartyRegistration",
				purchasePartyReg: "purchasePartyRegistration",
				workerReg: "workerRegistration",
				addMachineWork: "addMachineWork",
				addVehicleWork: "addVehicleWork",
				addPurchaseDetail: "addPurchaseDetail",
				addMachineSupply: "addMachineSupply",
				addVehicleSupply: "addVehicleSupply",
				addDailyWork: "addDailyWork"
			},
			currentPage: "machineRegistration"
		}

		this.updateCurrentPage = this.updateCurrentPage.bind(this);
	}
	
	// Change pages when user choose from navbar 
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
		else if(this.state.currentPage === this.state.allPages.itemReg){
			currentComponent = <ItemRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.machinePartyReg){
			currentComponent = <MachinePartyRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.vehiclePartyReg){
			currentComponent = <VehiclePartyRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.purchasePartyReg){
			currentComponent = <PurchasePartyRegistration />
		}
		else if(this.state.currentPage === this.state.allPages.addMachineWork){
			currentComponent = <MachineWorkEntry />
		}
		else if(this.state.currentPage === this.state.allPages.addVehicleWork){
			currentComponent = <VehicleWorkEntry />
		}
		else if(this.state.currentPage === this.state.allPages.addPurchaseDetail){
			currentComponent = <PurchaseEntry/>
		}
		else if(this.state.currentPage === this.state.allPages.workerReg){
			currentComponent = <WorkerRegistration/>
		}
		else if(this.state.currentPage === this.state.allPages.addMachineSupply){
			currentComponent = <MachineSupplyEntry/>
		}
		else if(this.state.currentPage === this.state.allPages.addVehicleSupply){
			currentComponent = <VehicleSupplyEntry/>
		}
		else if(this.state.currentPage === this.state.allPages.addDailyWork){
			currentComponent = <DailyWorkEntry/>
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
										<a className="nav-link" href="#!">Logout<span className="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Registration
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.machineReg) }>Machine</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.vehicleReg) } >Vehicle</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.itemReg) } >Item</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.workerReg) } >Worker</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.machinePartyReg) } >Machine Party</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.vehiclePartyReg) } >Vehicle Party</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.purchasePartyReg) } >Purchase Party</a>
										</div>
									</li>
									<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Entry
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.addMachineWork) }>Machine Work</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.addVehicleWork) } >Vehicle Work</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.addDailyWork) } >Daily Work</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.addPurchaseDetail) } >Purchase Entry</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.addMachineSupply) } >Machine Supply</a>
											<a className="dropdown-item" href="#!" onClick={ () => this.updateCurrentPage(this.state.allPages.addVehicleSupply) } >Vehicle Supply</a>
										</div>
									</li>
									<li className="nav-item">
										<a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Display
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											<a className="dropdown-item" href="#!">Account</a>
											<a className="dropdown-item" href="#!">Party status</a>
											<a className="dropdown-item" href="#!">Store status</a>
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

