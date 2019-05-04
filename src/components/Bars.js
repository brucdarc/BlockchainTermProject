import React from 'react';

const Output = (props) => {

    let values = props && props.length && props.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="value" style={{color: item.color, width: item.value + '%'}}  key={i}>
                    <span>{item.value}%</span>
                </div>
            )
        }
    }, this);

    let calibrations = props && props.length && props.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="graduation" style={{color: item.color, width: item.value + '%'}}  key={i}>
                    <span>|</span>
                </div>
            )
        }
    }, this);

    let bars = props && props.length && props.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="bar" style={{backgroundColor: item.color, width: item.value + '%'}}  key={i}>

                </div>
            )
        }
    }, this);

    let legends = props && props.length && props.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="legend" key={i}>
                    <span className="dot" style={{color: item.color}}>●</span>
                    <span className="label">{item.label}</span>
                </div>
            )
        }
    }, this);

    return(
        <div className="multicolor-bar">
            <div className="values">
                {values == ''?'':values}
            </div>
            <div className="scale">
                {calibrations == ''?'':calibrations}
            </div>
            <div className="bars">
                {bars == ''?'':bars}
            </div>
            <div className="legends">
                {legends == ''?'':legends}
            </div>
        </div>
    );
};

export default Output;