import React from 'react';
import PinButton from './PinButton';

class PartyPins extends React.Component{
  // Fetch machine list from server
  fetchProduct = async () => {
    try {
      const responseMachineList = await fetch(
        "http://127.0.0.1:8000/list-of-machineparty/"
      );
      const jsonMachineList = await responseMachineList.json();
      this.setState({
        machinePartyList: jsonMachineList
      });

      const responseVehicleList = await fetch(
        "http://127.0.0.1:8000/list-of-vehicleparty/"
      );
      const jsonVehicleList = await responseVehicleList.json();
      this.setState({
        vehiclePartyList: jsonVehicleList
      });

      const responsePurchaseList = await fetch(
        "http://127.0.0.1:8000/list-of-purchaseparty/"
      );
      const jsonPurchaseList = await responsePurchaseList.json();
      this.setState({
        purchasePartyList: jsonPurchaseList
      });

    } catch(err) {
    }
  };

    constructor(props){
        super(props);
        console.log("PartyPins debugging start...");
        this.state = {
            machinePartyList: [],
            vehiclePartyList: [],
            purchasePartyList: [],
            loadingStatus: {
              visibility: "visible"
            },
            loadedStatus: {
              visibility: "hidden"
            }
        }

        this.fetchProduct = this.fetchProduct.bind(this);
        this.fetchProduct();
      }

    render(){
      return(
        <div>
          { this.state.machinePartyList.map( (party) => (
            <PinButton 
              partyName={party.name}
              class="btn btn-primary pin"/>
          )) }

          { this.state.vehiclePartyList.map( (party) => (
            <PinButton 
              partyName={party.name}
              class="btn btn-success pin"/>
          )) }

          { this.state.purchasePartyList.map( (party) => (
            <PinButton 
              partyName={party.name}
              class="btn btn-warning pin"/>
          )) }

        </div>  
      );
    };
}

export default PartyPins;