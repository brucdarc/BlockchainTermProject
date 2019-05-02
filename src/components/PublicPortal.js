import React, { Component } from "react";
import web3 from "../web3"
import '../style.css';
import Output from './Bars';

class PublicPortal extends Component{

    constructor(props){
        super(props);
        this.state={};

    }


    render() {
        return(
            <div className={'container-fluid'}>
                <div className={'card border-0'}>
                    <div className={'card-body'}>
                    </div>
                </div>
                <div className={'card-columns rounded'} style={{columnCount:'2'}}>
                    <div className={'card'}>
                        <div className={'card-header'}>
                            Region 1
                        </div>
                        {Output([{
                                label: 'Burned',
                                value: 20,
                                color: '#a70006'
                            },
                            {
                                label: 'Held',
                                value: 60,
                                color: '#589b3a'
                            },
                            {
                                label: 'Available',
                                value: 20,
                                color: '#0a6cb8'
                            }])}

                            Percent polution
                    </div>

                    <div className={'card'}>
                        <div className={'card-header'}>
                            Region 2
                        </div>
                        {Output([{
                            label: 'Burned',
                            value: 80,
                            color: '#a70006'
                            },
                            {
                                label: 'Held',
                                value: 10,
                                color: '#00b30c'
                            },
                            {
                                label: 'Available',
                                value: 5,
                                color: '#0a6cb8'
                            }])}
                    </div>
                    <div className={'card'}>
                        <div className={'card-header'}>
                            Region 3
                        </div>
                        {Output([{
                            label: 'Burned',
                            value: 45,
                            color: '#a70006'
                        },
                            {
                                label: 'Held',
                                value: 45,
                                color: '#00b30c'
                            },
                            {
                                label: 'Available',
                                value: 10,
                                color: '#0a6cb8'
                            }])}
                    </div>
                    <div className={'card'}>
                        <div className={'card-header'}>
                            Region 4
                        </div>
                        {Output([{
                            label: 'Burned',
                            value: 15,
                            color: '#a70006'
                            },
                            {
                                label: 'Held',
                                value: 32,
                                color: '#00b30c'
                            },
                            {
                                label: 'Available',
                                value: 53,
                                color: '#0a6cb8'
                            }])}
                    </div>
                </div>
            </div>
        )
    }
};
export default PublicPortal;