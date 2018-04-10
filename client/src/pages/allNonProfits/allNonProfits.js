import React, { Component } from 'react';
import API from "../../components/utils/API";
import NonProfitsCard from '../../components/nonProfitsCard/nonProfitsCard';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MyMapComponent from "../../components/Map/map";

class AllNonProfits extends Component {
    state = {
        nonProfits:[],
        Address:{}
    };
    componentDidMount() {
        API.findAllNonProfits()
            .then(res => {this.setState({ nonProfits: res.data })})
            .catch(err => console.log(err));
    }
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");
        localStorage.removeItem("donorId");
        localStorage.removeItem("nonProfitId");
        window.location.reload();
    }
    cardClicked(address){
        console.log("show me "+address);
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng =>{console.log('Success', latLng);
        this.setState({Address:latLng})
        })
    }
    render() {
        return (
            <div className="container text-black">
                <div className="jumbotron jumbotron-fluid mt-4 my-3 text-center rounded">
                    <h1 className="display-3">LettuceEAT</h1>
                    <h3 className="lead">Reducing food waste one bite at a time!</h3>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        {this.state.nonProfits && this.state.nonProfits.length  ? (this.state.nonProfits.map(nonProfit => (
                        <NonProfitsCard
                        key={nonProfit.id}
                        nonProfitNameId={nonProfit.id}
                        nonProfitName={nonProfit.name}
                        nonProfitAddress={nonProfit.location}
                        nonProfitPhone={nonProfit.phonenumber}
                        nonProfitEmail={nonProfit.email}
                        cardClicked={this.cardClicked}/>
                        ))
                        ) : (
                            <h3>No NonProfits to show</h3>
                        )}
                    </div>
                    <div className="col-lg-4">
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/jskey=AIzaSyABpdOVb3I9kBHUBo-8YP3VpPmBH8DSPz4?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            latLng={this.state.address}/>
                    </div>
                </div>
                <div className="container" id="logoutbtn">
                    <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
                </div>
            </div>
        );
    }

}  

export default AllNonProfits;