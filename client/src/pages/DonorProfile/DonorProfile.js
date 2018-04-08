import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../components/utils/API";
import Card from '../../components/Card';
import ProfileJumbotron from '../../components/ProfileJumbotron';
import ModalAddPost from '../../components/ModalAddPost';
import {Redirect} from "react-router-dom";

class DonorProfile extends Component {
    state = {
        donor: {},
        foodposts: []
    };
    componentDidMount() {
        const userId=localStorage.getItem("userId");
        API.findOneDonor(userId)
            .then(res => {this.setState({ donor: res.data })})
            .catch(err => console.log(err));

        API.filterFoodPostsByDonor(userId)
            .then(res=> {console.log(res.data);this.setState({ foodposts: res.data })})
            .catch(err => console.log(err));
    }
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");

        console.log("token after login" +localStorage.getItem('jwtToken'))
        this.props.history.push("/login");
        <div className="container" id="logoutbtn">
            {this.state.users.map(user=>(
                <div>{user.email}</div>
            ))}
                <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
            </div>
    }
    render() {
        const tokenPresent=localStorage.getItem("jwtToken");
        const isDonor=localStorage.getItem("isDonor");
        
        if(!tokenPresent) {
            return (<Redirect to={"/"}/>)
        }
            
        return(
            <div className = "container">
                {/* Id: {this.state.donor.id}
                <br />
                Name: {this.state.donor.name}
                <br />
                Email: {this.state.donor.email}
                <br />
                Location: {this.state.donor.location || "No location set"}
                <br />
                Phone Number: {this.state.donor.phonenumber}
                <br />
                Food Posts:  */}
                {/* I am doing this odd statement down here because if you do FoodPosts.length alone,
                render() happens before the componentDidMount(), and therefore will throw a fat error
                as FoodPosts will be undefined. This makes sure that FoodPosts is defined before
                finding length. Here's where I found it:
                https://hashnode.com/post/reactjs-how-to-render-components-only-after-successful-asynchronous-call-ciwvnkjr400sq7t533lvrpdtw */}
                {/* {this.state.foodposts && this.state.foodposts.length}
                <br />
                {JSON.stringify(this.state.donor)} */}
                {/* <ProfileJumbotron
                name={this.state.donor.name}
                address={this.state.donor.location || "No set location"}
                phonenumber={this.state.donor.phonenumber}
                email={this.state.donor.email}
                 />
                 <a href="#" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-addpost">Add New Post</a>
                 {this.state.foodposts && this.state.foodposts.length  ? (
                    this.state.foodposts.map(FoodPost => (
                        <div>
                            <br />
                            <Card
                            key={FoodPost.id}
                            title={FoodPost.title}
                            donor={this.state.donor.name}
                            >
                            Description: {FoodPost.desc}
                            <br />
                            Pick-Up Date: {FoodPost.pickupdate}
                            <br />
                            End Date: {FoodPost.enddate}
                            <br />
                            Pick-Up Window: {FoodPost.pickupwindow}
                            </Card>
                            <br />
                        </div>
                    ))
                 ) : (
                     <h3>No Food Posts</h3>
                 )} */}
                 {/* <br />
                 <br />
                 <ModalAddPost /> */}
            </div>
        )
    }
}

export default DonorProfile;