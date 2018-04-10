import React, { Component } from 'react';
import API from "../../components/utils/API";
import DonorsCard from '../../components/DonorsCard/DonorsCard';
import SimpleMap from "../../components/Map/map"
import SimpleForm from "../../components/GeolocateForm/geolocate"

class AllDonors extends Component {
    state = {
        donors:[],
        longitude:"",
        lat:""
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
    LatLong(){
       
    }
    render() {
        return (
            <div className="container text-black">
            <SimpleForm/>
                <div className="jumbotron jumbotron-fluid mt-4 my-3 text-center rounded">
                    <h1 className="display-3">LettuceEAT</h1>
                    <h3 className="lead">Reducing food waste one bite at a time!</h3>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        {this.state.donors && this.state.donors.length  ? (this.state.donors.map(donor => (
                        <DonorsCard
                        key={donor.id}
                        donorName={donor.name}
                        donorAddress={donor.location}
                        donorPhone={donor.phonenumber}
                        donorEmail={donor.email}
                        cardClicked={this.cardClicked}/>
                        ))
                        ) : (
                            <h3>No Donors to Show</h3>
                        )}
                        <div className="container" id="logoutbtn">
                            <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
                        </div>
                    </div>
                    <div id="map" className="col-lg-4">
                        <SimpleMap/>
                    </div>
                </div>
            </div>
        );
    }

}  

export default AllDonors;