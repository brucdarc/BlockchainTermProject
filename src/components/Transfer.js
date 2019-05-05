import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";
import EcoCapCoin from "../EcoCapCoin";

class Transfer extends Component{

    constructor(props){
        super(props);
        this.state={
            location : "",
            capacity: 0
        };

    }

    setLocCap = async event =>{
        console.log("EYYYYYY");
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await EcoCapCoin.methods
                .registerLocation(this.state.location, this.state.capacity) // contains the user account name
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
                <h4>Transfer Tokens</h4>
                <Form.Field>
                    <input
                        placeholder="Recipient Address"
                        onChange={event =>
                            this.setState({
                                location: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Number of Permits"
                        onChange={event =>
                            this.setState({
                                capacity: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <button id={'setLocation'} className={'btn btn-md btn-success'} style={{color:'white'}} onClick={this.setLocCap}>
                    <span>Transfer Permits</span>
                </button>
            </div>
        )
    }
};
export default Transfer;