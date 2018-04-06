import React, { Component } from 'react';
import "./Home.css";
import Nav from '../../components/Nav';
import Card from '../../components/Card';
// import API from '../../utils/API';

class Home extends Component {
    state = {
      home: []
    };
  
    // componentDidMount() {
    //   this.getArticles();
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
      <Nav />
        <Card title="Food Posts">

        </Card>
      </div>
    );
  }

}  

export default Home;