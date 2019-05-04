import React from "react";
import web3 from "../web3"
import Output from "./Bars";

const Region = (props) => {

    return(
        <div className={'card'}>
            <div className={'card-header'}>
                {props.location}
            </div>
            {Output([{
                label: 'Destroyed',
                value: props.burned,
                color: '#313335'
            },
                {
                    label: 'Held',
                    value: props.owned,
                    color: '#589b3a'
                },
                {
                    label: 'Available',
                    value: props.available,
                    color: '#0a6cb8'
                }])}
        </div>
    );

};

export default Region;