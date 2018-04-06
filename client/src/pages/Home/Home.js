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
            <div className="jumbotron my-3 text-center rounded">
                <h1 className="display-3">LettuceEAT</h1>
                <h3 className="lead">Reducing food waste one bite at a time!</h3>
            </div>
            <Card title="Food Posts" />
        </div>
    
    );
  }

}  

export default Home;