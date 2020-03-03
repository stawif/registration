import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class CheckParty extends Component {

    constructor(props) {
        super(props);
    
        this.state = {};

    }
        // Check existence of party name
    checkparty = () => {
        try {
          this.setState({
            partyExistMessage: "",
            responseMessage: "",
            buttonStatus: {
              visibility: "visible"
            }
          });
          const showList = (item, index) => {
            if (this.state.partyName.toLowerCase() === item.name.toLowerCase()) {
              this.setState({
                partyExistMessage: "* This party name is already exist!!!",
                buttonStatus: {
                  visibility: "hidden"
                }
              });
            } else {
            }
          };
          this.state.partyList.forEach(showList);
        } catch (err) {}
      };
      
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
