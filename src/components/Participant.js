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
            thisCycle: 0,
            lastCycle: 0,
            holdings: 0,
            registeredCycle: 0,
            sensors:[{address:"addr1",type:"1"},{address:"addr2",type:"2"}],
            show:false
        };

        this.setHolderInformation=this.setHolderInformation.bind(this);
        this.generateHolderInformation=this.generateHolderInformation.bind(this);
        this.updateHolderAddress=this.updateHolderAddress.bind(this);
        this.generateRows=this.generateRows.bind(this);
    }

    async setHolderInformation(){
        this.setState({show:true});

        let location = await EcoCapCoin.methods.getUserLocation(this.state.holderAddress).call();
        let lCycle = await EcoCapCoin.methods.getUserPreviousCyclePollution(this.state.holderAddress).call();


        this.setState({show:true,holderLocation:location,lastCycle:lCycle});

    }

    componentDidMount() {
        this.interval = setInterval(() => this.generateHolderInformation(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateHolderAddress(address){
            this.setState({holderAddress: address});
            this.setHolderInformation();
    }


    generateRows(){
       return this.state.sensors.map(function(sensor,i){
            return(
            <tr key={i}>
                <td>
                    {sensor.address}
                </td>
                <td>
                    {sensor.type}
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
                                        <th>
                                            Type
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
                            <button onClick={()=>{this.updateHolderAddress(document.getElementById("holderInput").value)}}/>
                        </Form.Field>
                    </Card.Content>
                </Card>
                {this.generateHolderInformation()}
            </div>
        )
    }
};
export default Participant;