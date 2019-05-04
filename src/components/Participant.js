import React, { Component } from "react";
import web3 from "../web3"
import { Button, Header, Icon, Modal, Form, Message, Card, CardGroup, Table} from "semantic-ui-react";
import EcoCapCoin from "../EcoCapCoin";

class Participant extends Component{

    constructor(props){
        super(props);
        this.state={
            holderAddress:"",
            holderLocation:"",
            thisCycle: 5600,
            lastCycle: 1200,
            holdings: 65000,
            registeredCycle: 1,
            sensors:["0xc14f6c868bb09d71409dd37bd775b3d95839fa93","0xb2f1229e80e2392013e25c7452bab7171dcbe4c3","0x21b7ba728a806f3405fc850b053e80ec033476e3"],
            show:false
        };

        this.setHolderInformation=this.setHolderInformation.bind(this);
        this.generateHolderInformation=this.generateHolderInformation.bind(this);
        this.generateRows=this.generateRows.bind(this);
    }

    async setHolderInformation(address){

        let location = await EcoCapCoin.methods.getUserLocation(address).call();
        let lCycle = await EcoCapCoin.methods.getUserPreviousCyclePollution(address).call();
        let tCycle = await EcoCapCoin.methods.checkPolluterLimit(address).call();


        this.setState({holderAddress:address,holderLocation:location,show:true});

    }

    componentDidMount() {
        this.interval = setInterval(() => this.generateHolderInformation(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    generateRows(){
       return this.state.sensors.map(function(sensor,i){
            return(
            <tr key={i}>
                <td>
                    {sensor}
                </td>
            </tr>
            );
        });
    }

    generateHolderInformation(){
        if(this.state.show){
            return (
                <div className={'row'}>
                    <Card className={'fluid'} color="green">
                        <Card.Header><b> General Information</b></Card.Header>
                        <Card.Content>
                            <h5>Address: {this.state.holderAddress}
                            <br/>Location: {this.state.holderLocation}
                            <br/>Registered Cycle: {this.state.registeredCycle}</h5>
                        </Card.Content>
                    </Card>
                    <Card className={'fluid'} color="green">
                        <Card.Header><b> Pollution Statistics</b></Card.Header>
                        <Card.Content>
                            <h5>Current Cycle Pollution: {this.state.thisCycle}
                            <br/>Last Cycle Pollution: {this.state.lastCycle}
                            <br/>Predicted Cycle End Pollution: </h5>
                        </Card.Content>
                    </Card>
                    <Card className={'fluid'} color="green">
                        <Card.Header><b> Connected Sensors</b></Card.Header>
                        <Card.Content>
                            <Table>
                                <tbody>
                                    <tr>
                                        <th>
                                            Address
                                        </th>
                                    </tr>
                                    {this.generateRows()}
                                </tbody>
                            </Table>
                        </Card.Content>
                    </Card>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                <Card className={'fluid'} color="blue">
                    <Card.Header>
                        <b>Search Token Holders</b>
                    </Card.Header>
                    <Card.Content>
                        <Form.Field>
                            <input id="holderInput" placeholder="Enter Address"/>
                            <button className={'btn'} onClick={()=>{this.setHolderInformation(document.getElementById("holderInput").value)}}/>
                        </Form.Field>
                    </Card.Content>
                </Card>
                {this.generateHolderInformation()}
            </div>
        )
    }
};
export default Participant;