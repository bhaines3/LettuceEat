import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../components/utils/API";
import Card from '../../components/Card';
import ProfileJumbotron from '../../components/ProfileJumbotron';
import {Redirect} from "react-router-dom";

class NonProfitProfile extends Component {
    state = {
        nonprofit: {},
        foodpost: [],
        redirect:false,
    };
    componentWillMount(){
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
        const nonProfitId=localStorage.getItem("nonProfitId");
        console.log(nonProfitId);
        API.findOneNonProfit(nonProfitId)
            .then(res => {this.setState({ nonprofit: res.data })})
            .catch(err => console.log(err));
    }
    render() {
        // console.log("redirect " +this.state.redirect)
        // if(this.state.redirect){ 
        //     return (<Redirect to={"/"}/>)
        //  }
        return(
            <div className ="container text-center">
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
                address={this.state.nonprofit.location || "No set location"}
                phonenumber={this.state.nonprofit.phonenumber}
                email={this.state.nonprofit.email}>
                <br />
                Hours for Food Pick-Up:
                </ProfileJumbotron>
                Food Posts Interested In
                 {this.state.nonprofit.FoodPosts && this.state.nonprofit.FoodPosts.length  ? (
                    this.state.nonprofit.FoodPosts.map(FoodPost => (
                        <Card
                        key={FoodPost.id}
                        title={FoodPost.title}
                        donor={FoodPost.Donor.name}>
                            Description: {FoodPost.desc}
                            <br />
                            Pick-Up Date: {FoodPost.pickupdate}
                            <br />
                            End Date: {FoodPost.enddate}
                            <br />
                            Pick-Up Window: {FoodPost.pickupwindow}
                        </Card>
                    ))
                 ) : (
                     <h3>No Food Posts</h3>
                 )} 
            </div>
        )
    }
}

export default NonProfitProfile;