import React, { Component } from 'react';
import "./Home.css";
import API from "../../components/utils/API";
import Nav from '../../components/Nav';
import Card from '../../components/Card';


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
      postPickUpWindow: ""
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

        <div className="container">
            <div className="jumbotron my-3 text-center rounded">
                <h1 className="display-3">LettuceEAT</h1>
                <h3 className="lead">Reducing food waste one bite at a time!</h3>
            </div>
            {/* <a href="#" className="btn btn-primary">Add New Post</a> */}
            {this.state.foodposts && this.state.foodposts.length  ? (
                this.state.foodposts.map(FoodPost => (
                    <div>
                        <br />
                        <Card
                        key={FoodPost.id}
                        title={FoodPost.title}
                        donor={FoodPost && FoodPost.Donor.name}
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
                    <h3>No food posts! Check back later. </h3>
            )}
        </div>
    );
  }

}  

export default Home;