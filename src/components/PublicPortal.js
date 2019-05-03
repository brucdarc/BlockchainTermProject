import React, { Component } from "react";
import web3 from "../web3"
import MultiColorBar from './MultiColorBar';
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import '../style.css';
import Output from './Bars';
import EcoCapCoin from "../EcoCapCoin";

class PublicPortal extends Component{

    constructor(props){
        super(props);
        this.state={
            location:"Canada",
            notOwned:0,
            burned:0,
            owned:0,
            customLocation:"Colorado",
            custom_notOwned:0,
            custom_burned:0,
            custom_owned:0,
        };

    }

    grabTotal = async () => {
        this.setState({ modalOpen: true });
        let govHold = await EcoCapCoin.methods.getLocationHoldings(this.state.location).call();
        let govCap = await EcoCapCoin.methods.getLocationCapacity(this.state.location).call();
        let govOrCap = await EcoCapCoin.methods.getLocationOriginalCapacity(this.state.location).call();


        this.setState({
            notOwned: (govCap - govHold)*100 / govOrCap,
            owned: govHold*100 / govOrCap,
            burned: (govOrCap - govCap) * 100 /govOrCap

        });
        console.log( "goc" + govOrCap + " gc " + govCap + " gh " + govHold);
    }

    grabLocation = async (location) => {
        this.setState({ modalOpen: true });
        let govHold = await EcoCapCoin.methods.getLocationHoldings(location).call();
        let govCap = await EcoCapCoin.methods.getLocationCapacity(location).call();
        let govOrCap = await EcoCapCoin.methods.getLocationOriginalCapacity(location).call();


        this.setState({
            custom_notOwned: (govCap - govHold)*100 / govOrCap,
            custom_owned: govHold*100 / govOrCap,
            custom_burned: (govOrCap - govCap) * 100 /govOrCap

        });
        console.log( "goc" + govOrCap + " gc " + govCap + " gh " + govHold);
    }

    updateCustomLoc(event) {
        this.setState({customLocation: event.target.value})
    }
    updateLoc(event) {
        this.setState({customLocation: event.target.value})
    }


    render() {
        return(
            <div className={'container-fluid'}>
                <div className={'card border-0'}>
                    <div className={'card-body'}>
                    </div>
                </div>
                <div className={'card-columns rounded'} style={{columnCount:'1'}}>
                    <h1>Pollution Permit Data By Location</h1>
                    <div className={'card'}>
                        <div className={'card-header'}>
                            <Form.Field>
                                <input value={this.state.location} onChange={this.updateLoc.bind(this)}/>
                            </Form.Field>
                        </div>
                        {Output([{
                                label: 'Burned',
                                value: this.state.burned,
                                color: '#a70006'
                            },
                            {
                                label: 'Held',
                                value: this.state.owned,
                                color: '#589b3a'
                            },
                            {
                                label: 'Available',
                                value: this.state.notOwned,
                                color: '#0a6cb8'
                            }])}



                        <Button color="green" onClick={this.grabTotal} inverted>
                            Get Location Data
                        </Button>
                    </div>

                    <div className={'card'}>
                        <div className={'card-header'}>
                            <Form.Field>
                                <input value={this.state.customLocation} onChange={this.updateCustomLoc.bind(this)}/>
                            </Form.Field>
                        </div>
                        {Output([{
                            label: 'Burned',
                            value: this.state.custom_burned,
                            color: '#a70006'
                        },
                            {
                                label: 'Held',
                                value: this.state.custom_owned,
                                color: '#589b3a'
                            },
                            {
                                label: 'Available',
                                value: this.state.custom_notOwned,
                                color: '#0a6cb8'
                            }])}

                        <Button color="green" onClick={() => this.grabLocation(this.state.customLocation)} inverted>
                            Get Location Data
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
};
export default PublicPortal;