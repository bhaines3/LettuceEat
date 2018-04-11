import React, { Component } from 'react';
import "./DeleteBtn.css";
import API from "./../utils/API";
class DeleteBtn extends Component {
  state = {
    foodId: ""
  };

  componentDidMount() {
    console.log(this.props.foodId);
    API.findOneFoodPost(this.props.foodId)
        .then(res => {this.setState({ foodId: res.data.id })})
        .catch(err => console.log(err));
  }


  deleteThePost = () => {
    API.deletePost(this.state.foodId)
        .then(res => {console.log("new post added"); window.location.reload();})
        .catch(err => console.log(err))
  }

  render()
  {
    return (
    <button className="delete-btn btn btn-danger float-right" onClick={this.deleteThePost}>
      Delete Post
    </button>
    )
  }
};

export default DeleteBtn;