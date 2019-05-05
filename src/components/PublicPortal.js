import React, { Component, Fragment, Suspense} from "react";
import web3 from "../web3"
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import '../style.css';
import update from 'react-addons-update';
import Region from './RegionCard';
import EcoCapCoin from "../EcoCapCoin";

class PublicPortal extends Component{

    constructor(props){
        super(props);
        this.state={
            regions:[],
        };

        this.genRegionCards=this.genRegionCards.bind(this);
        this.updateRegions=this.updateRegions.bind(this);
        this.regionsIndex=this.regionsIndex.bind(this);
        this.updateRegions()
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateRegions(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    regionsIndex(loc,list){
        for(let i = 0; i < list.length; i++){
            if(list[i].location == loc){
                return i;
            }
        }
                return -1;
    }

    async updateRegions(){
        let tmp =[];
        let regionCount = await EcoCapCoin.methods.getHolderCount().call();
        for(let i = 0; i < regionCount;i++) {
            let user = await EcoCapCoin.methods.getHolderAddress(i).call();
            let location = await EcoCapCoin.methods.getUserLocation(user).call();
            if(this.regionsIndex(location,tmp)<0){
                let govHold = await EcoCapCoin.methods.getLocationHoldings(location).call();
                let govCap = await EcoCapCoin.methods.getLocationCapacity(location).call();
                let govOrCap = await EcoCapCoin.methods.getLocationOriginalCapacity(location).call();
                let notOwned = (govCap - govHold) * 100 / govOrCap;
                let owned = govHold * 100 / govOrCap;
                let burned = (govOrCap - govCap) * 100 / govOrCap;
                tmp.push({location:location,burned:burned.toFixed(4),owned:owned.toFixed(4),available:notOwned.toFixed(4)});
            }
        }
        this.setState({regions:tmp});
    }

    genRegionCards(){

        return this.state.regions.map(function(region,i){
                return (
                    <div className={'card fluid'} key={i}>
                        <div className={'card-body'}>
                            {Region(region)}
                        </div>
                    </div>
                );
        });
    }

    render() {
        return(
            <div className={'container-fluid'}>
                <h1>Pollution Permit Data By Location</h1>
                {this.genRegionCards()}
            </div>
        )
    }
};
export default PublicPortal;