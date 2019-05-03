import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";

class RegisterSensor extends Component{

    constructor(props){
        super(props);
        this.state={};

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
                                polluter: event.target.value
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
                <button id={'registerSensor'} className={'btn btn-md btn-success'} style={{color:'white'}} >
                    <span>Register Sensor</span>
                </button>
            </div>
        )
    }
};
export default RegisterSensor;