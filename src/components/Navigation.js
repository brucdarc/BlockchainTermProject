import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3"
import Manage from "./Manage";

class Navigation extends Component{

    constructor(props){
        super(props);
        this.state={
            showAbout: false,
            showManage: false,
            showPolluter: false
        };

        this.handleCloseAbout=this.handleCloseAbout.bind(this);
        this.handleShowAbout=this.handleShowAbout.bind(this);
        this.handleCloseManage=this.handleCloseManage.bind(this);
        this.handleShowManage=this.handleShowManage.bind(this);
        this.handleClosePollute=this.handleClosePollute.bind(this);
        this.handleShowPollute=this.handleShowPollute.bind(this);
        this.generateModal=this.generateModal.bind(this);
    }

    handleCloseManage(){
        this.setState({showManage:false});
    }

    handleShowManage(){
        this.setState({showManage:true});
    }

    handleClosePollute(){
        this.setState({showPolluter:false});
    }

    handleShowPollute(){
        this.setState({showPolluter:true});
    }

    handleShowAbout(){
        this.setState({showAbout:true});
    }

    handleCloseAbout(){
        this.setState({showAbout:false});
    }

    generateModal(stateOpen, functionClose, slogan, subslogan){
        return(
            <Modal open={stateOpen} onClose={functionClose} style={{left:'20%'}}>
                <Modal.Header>
                    <div className={'float-right'}>
                        <Button color="red" onClick={functionClose}>
                            <Icon name="cancel" /> Close
                        </Button>
                    </div>
                    <b><h1>{slogan}</h1></b>
                    <small>{subslogan}</small>
                </Modal.Header>
                <Modal.Content>
                    <Manage>
                    </Manage>
                </Modal.Content>
            </Modal>
        );
    }

    render() {
        return(
            <div id="navigation" className="card border-0">
                <div className="pos-f-t" style={{background:'black'}}>
                    <nav className="navbar rounded navbar-dark" style={{background:'black'}}>
                        <div className={'float-right float-bottom'}>
                            <button id="navbar"className="navbar-toggler bg-dark" type="button" data-toggle="collapse"
                                    data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"style={{backgroundImage:"url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(32,221,246, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\")"}}></span>
                            </button>
                        </div>
                    </nav>
                    <div className="collapse" id="navbarToggleExternalContent">
                        <div className={'row'}>
                            <div className="card-body">
                                <button id={'aboutNav'} className={'btn btn-info btn-lg'} style={{color:'black'}} onClick={this.handleShowAbout}>
                                    <span>About</span>
                                </button>
                                {this.generateModal(this.state.showAbout,this.handleCloseAbout,"All About Eco-Cap Coin!","The future of the environment")}
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className="card-body">
                                <button id={'ownerNav'} className={'btn btn-info btn-lg'} style={{color:'black'}} onClick={this.handleShowManage}>
                                    <span>Manage</span>
                                </button>
                                {this.generateModal(this.state.showManage,this.handleCloseManage,"Management Portal","Take a look at the Inner Workings")}
                            </div>
                            <div className={'float-right'}>
                                <div className="card-body">
                                    <button id={'ownerNav'} className={'btn btn-info btn-lg'} style={{color:'black'}} onClick={this.handleShowPollute}>
                                        <span>Participants</span>
                                    </button>
                                    {this.generateModal(this.state.showPolluter,this.handleClosePollute,"Check Out Participant Details","")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Navigation;