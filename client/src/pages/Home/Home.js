import React, { Component } from 'react';
import "./Home.css";
import API from "../../components/utils/API";
import Nav from '../../components/Nav';
import Card from '../../components/Card';

class Home extends Component {
    state = {
      foodposts: [],
      donors: [],
      nonprofits: []
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
            {this.state.foodposts && this.state.foodposts.length  ? (
                this.state.foodposts.map(FoodPost => (
                    <div>
                        <br />
                        <Card
                        key={FoodPost.id}
                        title={FoodPost.title}
                        donor="Not working for now"
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
            )}
        </div>
    );
  }

}  

export default Home;