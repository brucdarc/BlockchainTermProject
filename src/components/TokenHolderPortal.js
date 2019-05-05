import React, { Component } from "react";
import web3 from "../web3"
import { Button, Header, Icon, Modal, Form, Message, Card, CardGroup} from "semantic-ui-react";
import '../style.css';
import Output from './Bars';
import EcoCapCoin from "../EcoCapCoin";
import Burn from "./Burn";
import RegisterLocation from "./RegisterLocation";
import Transfer from "./Transfer";
import NewCycle from "./NewCycle";

class TokenHolderPortal extends Component{

    constructor(props){
        super(props);
        this.state={
            showRegister: false
        };
        this.handleCloseRegister=this.handleCloseRegister.bind(this);
        this.handleOpenRegister=this.handleOpenRegister.bind(this);
        this.progressCycle=this.progressCycle.bind(this);
    }

    handleCloseRegister(){
        this.setState({showRegister:false});
    }

    handleOpenRegister(){
        this.setState({showRegister:true});
    }

    progressCycle(){

    }




    render() {
        return(
            <div>
                <Card.Group>
                    <Card color="blue">
                        <Card.Content>
                            <Transfer></Transfer>
                        </Card.Content>
                    </Card>

                    <Card color="blue">

                        <Card.Content>
                            <Burn></Burn>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        )
    }
};
export default TokenHolderPortal;