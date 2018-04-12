import React, { Component } from 'react';
import API from "../../components/utils/API";
//import DonorsCard from '../../components/DonorsCard/DonorsCard';
//maps
//import SimpleMap from "../../components/Map/map";
import MyMapComponent from "../../components/Map/map";
//import StyledMapWithAnInfoBox from "../../components/Map/map"
//import Map from  "../../components/Map/map";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import GoogleApiWrapper from "../../components/"
import AllCards from '../../components/allCards/allCards';

class AllDonors extends Component {
    state = {
        donors:[],
        Address:{}
    };
    componentDidMount() {
        
        API.findAllDonors()
            .then(res => {this.setState({ donors: res.data })})
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
      .catch(error => console.error('Error', error)) 
    }
    render() {
        return (
            <div className="container text-black">
                <div className="jumbotron jumbotron-fluid mt-4 my-3 text-center rounded text-primary">
                    <h1 className="display-3">LettuceEAT</h1>
                    <h3 className="lead">Reducing food waste one bite at a time!</h3>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        {this.state.donors && this.state.donors.length  ? (this.state.donors.map(donor => (
                        <AllCards
                        key={donor.id}
                        id={donor.id}
                        link={"/DonorProfile/"+donor.id}
                        name={donor.name}
                        address={donor.location}
                        phone={donor.phonenumber}
                        email={donor.email}
                        cardClicked={this.cardClicked}/>
                        ))
                        ) : (
                            <h3>No Donors to Show</h3>
                        )}
                        
                    </div>
                    <div id="map" className="col-lg-4 mt-3">
                        <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/jskey=AIzaSyABpdOVb3I9kBHUBo-8YP3VpPmBH8DSPz4?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        latLng={this.state.address}
                        />
                    </div>
                </div>
            </div>
        );
    }

}  

export default AllDonors;