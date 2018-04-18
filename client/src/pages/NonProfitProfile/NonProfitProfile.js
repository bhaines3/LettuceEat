import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../components/utils/API";
import FoodCard from '../../components/FoodCard';
import Nav from '../../components/Nav';
import ProfileJumbotron from '../../components/ProfileJumbotron';
import { Redirect } from "react-router-dom";

class NonProfitProfile extends Component {
    state = {
        nonprofit: {},
        foodpost: [],
        donors: [],
        redirect: false,
    };
    componentWillMount() {
        // const donor=localStorage.getItem("isDonor");
        // console.log("donor non profit "+donor)
        // if(donor==="true" || donor===null ){
        //     console.log("donor after check " + donor);
        //    return this.setState({
        //         redirect:true
        //     })
        // }
    }
    componentDidMount() {
        //Why does it matter which nonProfit is viewing the nonProfit page? -Michelle
        //Checks to see if user vieweing the page is the user that is logged in
        const nonProfitId = localStorage.getItem("nonProfitId");
        const idAllNonProfitsPg = this.props.match.params.id;
        console.log(nonProfitId);
        
        API.findAllDonors()
            .then(res => { this.setState({ donors: res.data }) })
            .catch(err => console.log(err));

        //if user that is not looged in then find the information for the user using 
        if (nonProfitId != idAllNonProfitsPg) {
            API.findOneNonProfit(idAllNonProfitsPg)
                .then(res => { this.setState({ nonprofit: res.data }) })
                .catch(err => console.log(err));
        }
        else {
            API.findOneNonProfit(nonProfitId)
                .then(res => { this.setState({ nonprofit: res.data }) })
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    {/* Id: {this.state.nonprofit.id}
                <br />
                Name: {this.state.nonprofit.name}
                <br />
                Email: {this.state.nonprofit.email}
                <br />
                Location: {this.state.nonprofit.location || "No location set"}
                <br />
                Phone Number: {this.state.nonprofit.phonenumber}
                <br />
                Food Posts Interested In: 
                {/* I am doing this odd statement down here because if you do FoodPosts.length alone,
                render() happens before the componentDidMount(), and therefore will throw a fat error
                as FoodPosts will be undefined. This makes sure that FoodPosts is defined before
                finding length. Here's where I found it:
                https://hashnode.com/post/reactjs-how-to-render-components-only-after-successful-asynchronous-call-ciwvnkjr400sq7t533lvrpdtw 
                 { this.state.nonprofit.FoodPosts && this.state.nonprofit.FoodPosts.length }
                <br />*/}
                    {/* {JSON.stringify(this.state.nonprofit)} */}
                    <ProfileJumbotron
                        name={this.state.nonprofit.name}
                        address={this.state.nonprofit.location}
                        phonenumber={this.state.nonprofit.phonenumber}
                        email={this.state.nonprofit.email}
                        summary={this.state.nonprofit.summary}
                        isDonor={false}
                        hoursForPickUp={this.state.nonprofit.hoursforpickup}
                        paramsId={this.props.match.params.id}
                    >
                        <br />
                    </ProfileJumbotron>
                    <h3 className="text-primary">Food Posts Interested In</h3>
                    {this.state.nonprofit.FoodPosts && this.state.nonprofit.FoodPosts.length ? (
                        this.state.nonprofit.FoodPosts.map(FoodPost => (
                            <div>
                                <FoodCard
                                    key={FoodPost.id}
                                    foodId={FoodPost.id}
                                    title={FoodPost.title}
                                    desc={FoodPost.desc}
                                    pickupdate={FoodPost.pickupdate}
                                    pickupwindow={FoodPost.pickupwindow}
                                    donorId={FoodPost.DonorId}
                                />
                                <br />
                            </div>
                        ))
                    ) : (
                            <h3 className="text-warning">No Food Posts</h3>
                        )}
                </div>

            </div>
        )
    }
}

export default NonProfitProfile;