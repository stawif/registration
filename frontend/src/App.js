import React, { Component } from 'react';
//import './App.css';
import MachineRegistration from './components/registration/MachineRegistration';
import BasicValidation from './components/registration/BasicValidation';
import PartyReg from './components/registration/PartyReg';
import PartyDisplay from './components/displaydata/PartyDisplay';


class App extends Component{
  render(){
  return (
    <div className="App">
      <h3>Registration begins</h3>
      <PartyDisplay/>
    </div>
  );
  }
}

export default App;
