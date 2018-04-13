import React, { Component } from 'react';
import API from "../../components/utils/API";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Map from "../../components/Map/map";
import AllCards from '../../components/allCards/allCards';

class AllNonProfits extends Component {
    constructor(props){
        super(props);
        this.state = {
            nonProfits:[],
            coordinates:{
                lat: 32.2226, lng: -110.9747
            },
            msg:"Tucson,AZ"
        };
        this.cardClicked = this.cardClicked.bind(this);
    }
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
        .then(latLng =>{;
        this.setState({coordinates:latLng,msg:address})
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
                        {this.state.nonProfits && this.state.nonProfits.length  ? (this.state.nonProfits.map(nonProfit => (
                        <AllCards
                        key={nonProfit.id}
                        id={nonProfit.id}
                        link={"/NonProfitProfile/"+nonProfit.id}
                        name={nonProfit.name}
                        address={nonProfit.location}
                        phone={nonProfit.phonenumber}
                        email={nonProfit.email}
                        cardClicked={this.cardClicked}/>
                        ))
                        ) : (
                            <h3>No NonProfits to show</h3>
                        )}
                    </div>
                    <div className="col-lg-5 mt-3">
                        <Map  msg={this.state.msg} lat={this.state.coordinates.lat} lng={this.state.coordinates.lng}/>
                    </div>
                </div>
            </div>
        );
    }

}  

export default AllNonProfits;