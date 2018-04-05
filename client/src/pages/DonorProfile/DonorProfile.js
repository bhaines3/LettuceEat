import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../components/utils/API";
import Card from '../../components/Card';
import ProfileJumbotron from '../../components/ProfileJumbotron';

class DonorProfile extends Component {
    state = {
        donor: {}
    };
    componentDidMount() {
        API.findOneDonor(this.props.match.params.id)
            .then(res => {this.setState({ donor: res.data })})
            .catch(err => console.log(err));
    }
    render() {
        return(
            <div className = "container text-center">
                Id: {this.state.donor.id}
                <br />
                Name: {this.state.donor.name}
                <br />
                Email: {this.state.donor.email}
                <br />
                Location: {this.state.donor.location || "No location set"}
                <br />
                Phone Number: {this.state.donor.phonenumber}
                <br />
                Food Posts: 
                {/* I am doing this odd statement down here because if you do FoodPosts.length alone,
                render() happens before the componentDidMount(), and therefore will throw a fat error
                as FoodPosts will be undefined. This makes sure that FoodPosts is defined before
                finding length. Here's where I found it:
                https://hashnode.com/post/reactjs-how-to-render-components-only-after-successful-asynchronous-call-ciwvnkjr400sq7t533lvrpdtw */}
                { this.state.donor.FoodPosts && this.state.donor.FoodPosts.length }
                <br />
                {JSON.stringify(this.state.donor)}
                <ProfileJumbotron
                name={this.state.donor.name}
                address={this.state.donor.location || "No set location"}
                phonenumber={this.state.donor.phonenumber}
                email={this.state.donor.email}
                 />
                 <a href="#" className="btn btn-primary">Add New Post</a>
                 {this.state.donor.FoodPosts && this.state.donor.FoodPosts.length  ? (
                    this.state.donor.FoodPosts.map(FoodPost => (
                        <Card>
                            Test
                            Here, we will need Food Post name, 
                        </Card>
                    ))
                 ) : (
                     <h3>No Food Posts</h3>
                 )}
            </div>
        )
    }
}

export default DonorProfile;