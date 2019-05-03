import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";

class RegisterPolluter extends Component{

    constructor(props){
        super(props);
        this.state={};

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
                                polluter: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <button id={'registerPolluter'} className={'btn btn-md btn-success'} style={{color:'white'}} >
                    <span>Register Polluter</span>
                </button>
            </div>
        )
    }
};
export default RegisterPolluter;