import React, { Component } from 'react';
import "./Home.css";
import API from "../../components/utils/API";
//import Nav from '../../components/Nav';
import Card from '../../components/Card';
import ModalAddPost from '../../components/ModalAddPost';
import {Redirect} from "react-router-dom";

class Home extends Component {
    state = {
      userDonorId: "",
      foodposts: [],
      donors: [],
      nonprofits: [],
      donorId: "",
      postTitle: "", 
      postDesc: "", 
      postPickUpDate: "", 
      postEndDate: "",
      postPickUpWindow: "",
    };
    componentWillMount(){
        const donorLoggedIn=localStorage.getItem("isDonor");
        if(donorLoggedIn){
            this.setState({donor:true});
        }
    }
    componentDidMount() {
        API.findAllFoodPosts()
            .then(res => {this.setState({ foodposts: res.data })})
            .catch(err => console.log(err));
        API.findAllDonors()
            .then(res => {this.setState({ donors: res.data })})
            .catch(err => console.log(err));
        API.findAllNonProfits()
            .then(res => {this.setState({ nonprofits: res.data})})
            .catch(err => console.log(err));
        this.checkIfDonorExists();
    }

    checkIfDonorExists() {
        API.findOneDonor({name: this.props.match.params.name})
        .then(res => {
            if(res.data)
            {
                this.setState({userDonorId: res.data.id})
            }
        })
        .catch(err => console.log(err));
    }
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");
        localStorage.removeItem("donorId");
        localStorage.removeItem("nonProfitId");
        return (<Redirect to={"/"}/>)
    }
    //May add addNewPost to ModalAddPost instead
    // addNewPost(event) {
    //     event.preventDefault();
    //     const newPost={
    //         DonorId: this.state.donorId,
    //         title: this.state.postTitle,
    //         desc: this.state.postDesc,
    //         pickupdate: this.state.postPickUpDate,
    //         enddate: this.state.postEndDate,
    //         pickupwindow: this.state.postPickUpWindow
    //     }
    //     API.createNewPost(newPost)
    //         .then(res => {console.log("new post added")})
    //         .catch(err => console.log(err))
    // }

    // getArticles = () => {
    //   API.getSavedArticles()
    //     .then(res => this.setState({ saved: res.data }))
    //     .catch(err => console.log(err));
    // }
  
    // deleteArticle = id => {
    //   API.deleteArticle(id)
    //     .then(res => {
    //       this.setState({
    //         saved: res.data
    //       });
    //     })
    //     .catch(err => console.log(err));
    // };
    render() {
        return (
            <div className="container text-black">
                <div className="jumbotron my-3 text-center rounded">
                    <h1 className="display-3">LettuceEAT</h1>
                    <h3 className="lead">Reducing food waste one bite at a time!</h3>
                </div>
                {/* {this.state.userDonorId && (this.state.userDonorId.length > 0) ? (
                    <a href="" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-addpost">Add New Post</a>
                ) : ("")} */}
                {this.state.foodposts && this.state.foodposts.length  ? (
                    this.state.foodposts.map(FoodPost => (
                        <div>
                            <br />
                            <Card
                            key={FoodPost.id}
                            title={FoodPost.title}
                            donor={FoodPost && FoodPost.Donor.name}
                            donorId={FoodPost.DonorId}
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
                            {}
                            </Card>
                        </div>
                    ))
                    ) : (
                        <h3>No food posts! Check back later. </h3>
                )}
                <ModalAddPost donorId={this.state.userDonorId} />
                <div className="container" id="logoutbtn">
                    <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
                </div>
        
            </div>
        );
    }

}  

export default Home;