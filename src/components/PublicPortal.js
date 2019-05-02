import React, { Component } from "react";
import web3 from "../web3"
import MultiColorBar from './MultiColorBar';
import '../style.css';

class PublicPortal extends Component{

    constructor(props){
        super(props);
        this.state={};

        this.makeBar=this.makeBar.bind(this);
    }


    makeBar(params){
        return(
            <MultiColorBar params={params}/>
        );
    }

    render() {
        return(
            <div className={'container-fluid'}>
                <div className={'card border-0'}>
                    <div className={'card-body'}>
                    </div>
                </div>
                <div className={'card-columns'} style={{columnCount:'2'}}>
                    <div className={'card border-0'}>
                        <div className={'card-header'}>
                            Region 1
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 1
                            </div>
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 2
                                {this.makeBar({
                                        label: 'As',
                                        value: 50,
                                        color: '#a2eb53'
                                    },
                                    {
                                        label: 'Blues',
                                        value: 13,
                                        color: '#22a6b3'
                                    },
                                    {
                                        label: 'Gu',
                                        value: 28,
                                        color: '#3d3cb0'
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className={'card border-0'}>
                        <div className={'card-header'}>
                            Region 2
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 1
                                {this.makeBar([{
                                    label: 'CO2',
                                    value: 40,
                                    color: '#eb4d4b'
                                },
                                    {
                                        label: 'Monoxide',
                                        value: 37,
                                        color: '#22a6b3'
                                    },
                                    {
                                        label: 'Guavas',
                                        value: 23,
                                        color: '#6ab04c'
                                    }])}
                            </div>
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 2
                            </div>
                        </div>

                    </div>
                    <div className={'card border-0'}>
                        <div className={'card-header'}>
                            Region 3
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 1
                            </div>
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 2
                            </div>
                        </div>
                    </div>
                    <div className={'card border-0'}>
                        <div className={'card-header'}>
                            Region 4
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 1
                            </div>
                        </div>
                        <div className={'card rounded-0'}>
                            <div className={'card-body'}>
                                Account 2
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default PublicPortal;