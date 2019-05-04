import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";
import EcoCapCoin from "../EcoCapCoin";

class RegisterPolluter extends Component{

    constructor(props){
        super(props);
        this.state={
            polluter: "",
            polLocation: ""
        };


    }

    registerPolluter = async event =>{
        console.log("EYYYYYY");
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await EcoCapCoin.methods
                .register(this.state.polluter, this.state.polLocation) // contains the user account name
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
                <h4>Register A Polluter</h4>
                <Form.Field>
                    <input
                        placeholder="Polluter Address"
                        onChange={event =>
                            this.setState({
                                polluter: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Polluter Location"
                        onChange={event =>
                            this.setState({
                                polLocation: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <button id={'registerPolluter'} className={'btn btn-md btn-success'} style={{color:'white'}} onClick={this.registerPolluter} >
                    <span>Register Polluter</span>
                </button>
            </div>
        )
    }
};
export default RegisterPolluter;