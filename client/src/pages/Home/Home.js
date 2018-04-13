import React, { Component } from 'react';
import "./Home.css";
import API from "../../components/utils/API";
//import Nav from '../../components/Nav';
import Card from '../../components/Card';
import ModalAddPost from '../../components/ModalAddPost';
//import {Redirect} from "react-router-dom";

class Home extends Component {
    state = {
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
    }
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");
        localStorage.removeItem("donorId");
        localStorage.removeItem("nonProfitId");
        window.location.reload();
    }

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
        <div className="container">
            <div className="jumbotron text-primary jumbotron-fluid mt-4 my-3 text-center rounded">
                <h1 className="display-3">LettuceEAT</h1>
                <h3 className="lead">Reducing food waste one bite at a time!</h3>
            </div>
            {(localStorage.getItem("isDonor") === "true") ? (
                <a href="" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-addpost">Add New Post</a>
            ) : ("")}
            {this.state.foodposts && this.state.foodposts.length  ? (
                this.state.foodposts.map(FoodPost => (
                    <div>
                        <Card
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
                        <h3>No food posts! Check back later. </h3>
                )}
                <ModalAddPost donorId={localStorage.getItem("donorId")} />
                
            </div>
        );
    }

}  

export default Home;