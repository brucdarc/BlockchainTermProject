import React, { Component } from "react";
import web3 from "./web3";
import { Container, Card } from "semantic-ui-react";
import EcoCapCoin from './EcoCapCoin';
import Navigation from './components/Navigation';
import OwnerPortal from './components/OwnerPortal';
import PublicPortal from './components/PublicPortal';
import Header from "./components/Header";



class App extends Component {

    constructor(props){
        super(props)

        this.state={
          view:<PublicPortal/>
        };
    }



    render(){
        return (
            <div>
                <Header/>
                <Navigation/>
                {this.state.view}
            </div>
        );
}
};

export default App;