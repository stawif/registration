import React, { Component } from 'react';
import VehicleRegistration from './components/registration/VehicleRegistration';
import RecorderRegistration from './components/registration/RecorderRegistration';
import PartyDisplay from './components/displaydata/PartyDisplay';
import PartyRegistration from './components/registration/PartyRegistration';
import StoreRegistration from './components/registration/StoreRegistration';
import MachineDisplay from './components/displaydata/MachineDisplay';
import VehicleDisplay from './components/displaydata/VehicleDisplay';
import StoreDisplay from './components/displaydata/StoreDisplay';



class App extends Component{
  render(){
  return (
    <div className="App">
      <h3>Registration begins</h3>
      <StoreRegistration/>
    </div>
  );
  }
}

export default App;
