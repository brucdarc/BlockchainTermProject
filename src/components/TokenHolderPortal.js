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
            showRegister: false,
            balance: 0
        };


        this.getBalance= this.getBalance.bind(this);
        this.getBalance()
    }





    getBalance = async () =>{
        console.log("EYYYYYY");
        try {
            const accounts = await web3.eth.getAccounts();
            let bal = await EcoCapCoin.methods.balanceOf(String(accounts[0])).call();
            this.setState({
                balance: bal
            });
        } catch (err) {
            console.log("ERROR IN SENDING TO CHAIN " + err);
            this.setState({
            });
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getBalance(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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

                <h2>Your Balance : {this.state.balance} </h2>



            </div>
        )
    }
};
export default TokenHolderPortal;