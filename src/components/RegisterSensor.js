import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";
import EcoCapCoin from "../EcoCapCoin";

class RegisterSensor extends Component{

    constructor(props){
        super(props);
        this.state={
            polluter: "",
            sensor: ""
        };

    }

    registerSensor = async event =>{
        console.log("EYYYYYY");
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await EcoCapCoin.methods
                .registerSensor(this.state.polluter, this.state.sensor) // contains the user account name
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
                <h4>Register a Sensor</h4>
                <Form.Field>
                    <input
                        placeholder="Sensor's Address"
                        onChange={event =>
                            this.setState({
                                sensor: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Polluter's Address"
                        onChange={event =>
                            this.setState({
                                polluter: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <button id={'registerSensor'} className={'btn btn-md btn-success'} style={{color:'white'}} onClick={this.registerSensor} >
                    <span>Register Sensor</span>
                </button>
            </div>
        )
    }
};
export default RegisterSensor;