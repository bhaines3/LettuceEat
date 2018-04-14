import React, { Component } from 'react';
import API from "../../components/utils/API";
import Map from "../../components/Map/map";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import UserCard from '../../components/UserCard/UserCard';

class AllDonors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donors: [],
            coordinates: {
                lat: 32.2226, lng: -110.9747
            },
            msg: "Tucson,AZ"
        };
        this.cardClicked = this.cardClicked.bind(this);
    }

    componentDidMount() {
        API.findAllDonors()
            .then(res => { this.setState({ donors: res.data }) })
            .catch(err => console.log(err));
    }
    Logout = event => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");
        localStorage.removeItem("donorId");
        localStorage.removeItem("nonProfitId");
        window.location.reload();
    }
    cardClicked(address) {
        console.log("show me " + address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                ;
                this.setState({ coordinates: latLng, msg: address })
            })
    }
    render() {
        return (
            <div className="container text-black">
                <div className="jumbotron jumbotron-fluid mt-4 my-3 text-center rounded text-primary">
                    <h1 className="display-3">LettuceEAT</h1>
                    <h3 className="lead">Reducing food waste one bite at a time!</h3>
                </div>
                <div className="row">
                    <div className="col-lg-7">
                        <h1 className="text-center">All Donors</h1>
                        {this.state.donors && this.state.donors.length ? (this.state.donors.map(donor => (
                            <UserCard
                                key={donor.id}
                                id={donor.id}
                                link={"/DonorProfile/" + donor.id}
                                name={donor.name}
                                address={donor.location}
                                phone={donor.phonenumber}
                                email={donor.email}
                                cardClicked={this.cardClicked} />
                        ))
                        ) : (
                                <h3 className="text-center">No Donors to Show</h3>
                            )}
                    </div>
                    <div className="col-lg-5 mt-3">
                        <Map msg={this.state.msg} lat={this.state.coordinates.lat} lng={this.state.coordinates.lng} />
                    </div>
                </div>
            </div>
        );
    }

}

export default AllDonors;