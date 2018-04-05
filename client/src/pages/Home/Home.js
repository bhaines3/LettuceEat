import React, { Component } from 'react';
import "./Home.css";
import Card from '../../components/Card';
import API from '../../utils/API';

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
        <Card title="Food Posts">
          {/* <div>
          {this.state.saved.map(article => (
            <div key={article._id}>
              <a href={article.url}>{article.title}</a>
              <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
            </div>
          ))}
          </div> */}
        </Card>
      </div>
    );
  }

}  

export default Home;