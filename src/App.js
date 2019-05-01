import React, { Component } from "react";
import web3 from "./web3";
import { Container, Card } from "semantic-ui-react";
import EcoCapCoin from './EcoCapCoin';
import Navigation from './components/Navigation';
import OwnerPortal from './components/OwnerPortal';
import PublicPortal from './components/PublicPortal';



class App extends Component {



    render(){
        return (
            <Container>
                <Navigation/>


                <OwnerPortal/>


                <PublicPortal/>
            </Container>
        );
}
};

export default App;