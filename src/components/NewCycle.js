import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";
import EcoCapCoin from "../EcoCapCoin";

class NewCycle extends Component{

    constructor(props){
        super(props);
        this.state={};

    }

    progressCycle = async event =>{
        console.log("EYYYYYY");
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await EcoCapCoin.methods
                .nextCycle() // contains the user account name
                .send({
                    from: accounts[0]
                });
            this.setState({
            });
        } catch (err) {
            console.log("ERROR IN SENDING TO CHAIN " + err);
            this.setState({
            });
        }
    }

    render() {
        return(
            <div>
                <h4 style={{ color: 'black', margin: 0 }}>Reset Pollution and Progress to Next Time Cycle </h4>
                <br/>
                <h4 style={{ color: 'red', margin: 0  }}>   Use With Caution</h4>
                <button id={'nextCycle'} className={'btn btn-lg btn-warning'} style={{color:'green'}} onClick={this.progressCycle}>
                    <span>Next Cycle</span>
                </button>
            </div>
        )
    }
};
export default NewCycle;