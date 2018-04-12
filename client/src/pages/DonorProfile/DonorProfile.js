import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../components/utils/API";
import Card from '../../components/Card';
import Nav from '../../components/Nav';
import EditJumbo from '../../components/EditJumbo';
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
        //What is the purpose of this? -Michelle
        const donorId=localStorage.getItem("donorId");
        const idAllDonorsPg=this.props.match.params.id;
        if(donorId!=idAllDonorsPg){
            
            this.getDonorInfo(idAllDonorsPg);
        }
        else{
            this.getDonorInfo(donorId);
        }
        
    }
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");
        localStorage.removeItem("donorId");
        localStorage.removeItem("nonProfitId");
        
       
    }
    getDonorInfo=(donorId)=>{
        API.findOneDonor(donorId)
        .then(res => {this.setState({ donor: res.data })})
        .catch(err => console.log(err));
       
        API.filterFoodPostsByDonor(donorId)
        .then(res=> {console.log(res.data);this.setState({ foodposts: res.data })})
        .catch(err => console.log(err));
    }
    render() {
        // console.log("redirect "+this.state.redirect)
        // if(this.state.redirect){ 
        //    return (<Redirect to={"/"}/>)
        // }
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
                summary={this.state.donor.summary || null}
                isDonor={true}
                paramsId={this.props.match.params.id}
                 />
                 
                {(localStorage.getItem("isDonor") === "true") ? (
                <a href="" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-addpost">Add New Post</a>
            ) : ("")}
                 {this.state.foodposts && this.state.foodposts.length  ? (
                    this.state.foodposts.map(FoodPost => (
                        <div>
                            <br />
                            <Card
                        key={FoodPost.id}
                        foodId={FoodPost.id}
                        title={FoodPost.title}
                        desc={FoodPost.desc}
                        pickupdate={FoodPost.pickupdate}
                        pickupwindow={FoodPost.pickupwindow}
                        donorId={FoodPost.DonorId}
                        >
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
                {/* <EditJumbo 
                currentName={this.state.donor.name}
                currentAddress={this.state.donor.location || "No set location"}
                currentPhonenumber={this.state.donor.phonenumber}
                currentEmail={this.state.donor.email}
                currentSummary={this.state.donor.summary || null}
                isDonor={true}
                paramsId={this.props.match.params.id}
                /> */}
            </div>
        )
    }
}

export default DonorProfile;