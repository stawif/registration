import React, { Component } from 'react';
//import './App.css';
import MachineRegistration from './components/registration/MachineRegistration';
import BasicValidation from './components/registration/BasicValidation';
import PartyReg from './components/registration/PartyReg';
import PartyDisplay from './components/displaydata/PartyDisplay';
import VehicleReg from './components/registration/VehicleReg';

class App extends Component{
  render(){
  return (
    <div className="App">
      <h3>Machine registration</h3>
      <MachineRegistration/>
      <h3>PartyReg</h3>
      <PartyReg/>
    </div>
  );
  }
}

export default App;
