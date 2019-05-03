import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";

class NewCycle extends Component{

    constructor(props){
        super(props);
        this.state={};

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