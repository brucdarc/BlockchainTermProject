import React, { Component } from "react";
import web3 from "../web3"

class Navigation extends Component{

    constructor(props){
        super(props);
        this.state={};

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
                                <button id={'aboutNav'} className={'btn btn-info btn-lg'} style={{color:'black'}}>
                                    <span>About</span>
                                </button>
                                <div className={'card-footer text-white'}>
                                    Find out more about Eco-Cap coin here!
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className="card-body">
                                <button id={'ownerNav'} className={'btn btn-info btn-lg'} style={{color:'black'}}>
                                    <span>Manage</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Navigation;