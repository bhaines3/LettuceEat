import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../components/utils/API";
import Card from '../../components/Card';
import ProfileJumbotron from '../../components/ProfileJumbotron';
import ModalAddPost from '../../components/ModalAddPost';
import {Redirect} from "react-router-dom";

class DonorProfile extends Component {
    state = {
        donor: [],
        foodposts: [],
        redirect:false
    };
    componentWillMount(){
        //ANYBODY CAN SEE DONOR PROFILE NO NEED FOR BELOW
        // const donor=localStorage.getItem("isDonor");
        // console.log("donor b4 donrspg " +donor);
        // if(donor==="false" || donor==null ){
        //     console.log("donor in check donrspg " +donor)
        //    return this.setState({
        //         redirect:true
        //     })
        // }
    }
    componentDidMount() {
        const donorId=localStorage.getItem("donorId");
        API.findOneDonor({id: donorId})
        .then(res => {this.setState({ donor: res.data })})
        .catch(err => console.log(err));
       
        API.filterFoodPostsByDonor(donorId)
        .then(res=> {console.log(res.data);this.setState({ foodposts: res.data })})
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
        console.log("redirect "+this.state.redirect)
        if(this.state.redirect){ 
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
                <ProfileJumbotron
                name={this.state.donor.name}
                address={this.state.donor.location || "No set location"}
                phonenumber={this.state.donor.phonenumber}
                email={this.state.donor.email}
                 />
                 <div className="container" id="logoutbtn">
                    <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
                </div>
                 <a href="." className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-addpost">Add New Post</a>
                 {this.state.foodposts && this.state.foodposts.length  ? (
                    this.state.foodposts.map(FoodPost => (
                        <div>
                            <br />
                            <Card
                            key={FoodPost.id}
                            title={FoodPost.title}
                            donor={this.state.donor.name}
                            donorId={this.state.donor.id}
                            >
                            <strong>Description:</strong> {FoodPost.desc}
                            <br />
                            <br />
                            <div className ="row">
                            <div className ="col-md-4">
                            <strong>Pick-Up Date:</strong> {FoodPost.pickupdate}
                            </div>
                            <div className ="col-md-4">
                            <strong>End Date:</strong> {FoodPost.enddate}
                            </div>
                            <div className ="col-md-4">
                            <strong>Pick-Up Window:</strong> {FoodPost.pickupwindow}
                            </div>
                            </div>
                            </Card>
                            <br />
                        </div>
                    ))
                 ) : (
                     <h3>No Food Posts</h3>
                 )}
                 <br />
                 <br />
                 <ModalAddPost donorId={this.state.donor.id} />
            </div>
        )
    }
}

export default DonorProfile;