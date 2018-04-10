import React, { Component } from 'react';
import API from "../../components/utils/API";
import NonProfitsCard from '../../components/nonProfitsCard/nonProfitsCard';

class AllNonProfits extends Component {
    state = {
        nonProfits:[]
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
    render() {
        return (
            <div className="container text-black">
                <div className="jumbotron jumbotron-fluid mt-4 my-3 text-center rounded">
                    <h1 className="display-3">LettuceEAT</h1>
                    <h3 className="lead">Reducing food waste one bite at a time!</h3>
                </div>
                {this.state.nonProfits && this.state.nonProfits.length  ? (this.state.nonProfits.map(nonProfit => (
                <NonProfitsCard
                key={nonProfit.id}
                nonProfitName={nonProfit.name}
                nonProfitAddress={nonProfit.location}
                nonProfitPhone={nonProfit.phonenumber}
                nonProfitEmail={nonProfit.email}/>
                ))
                ) : (
                    <h3>No NonProfits to show</h3>
                )}
                <div className="container" id="logoutbtn">
                    <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
                </div>
            </div>
        );
    }

}  

export default AllNonProfits;