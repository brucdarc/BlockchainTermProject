import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";

class SetLocationCapacity extends Component{

    constructor(props){
        super(props);
        this.state={};

    }

    render() {
        return(
            <div>
                <h4>Set a Location's Permit Capacity</h4>
                <Form.Field>
                    <input
                        placeholder="Location"
                        onChange={event =>
                            this.setState({
                                polluter: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Number of Permits"
                        onChange={event =>
                            this.setState({
                                polluter: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <button id={'setLocation'} className={'btn btn-md btn-success'} style={{color:'white'}} >
                    <span>Set Location</span>
                </button>
            </div>
        )
    }
};
export default SetLocationCapacity;