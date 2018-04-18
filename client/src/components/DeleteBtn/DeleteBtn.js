import React, { Component } from 'react';
import API from "./../utils/API";
class DeleteBtn extends Component {

    deleteThePost = (id, donorId) => {
        API.deletePost(id, donorId)
            .then(res => {
                console.log("Deleting Food Post with ID: " + id)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <button className="delete-btn btn btn-danger float-right" onClick={() => this.deleteThePost(this.props.foodId, this.props.donorId)}>
                Delete Post
            </button>
        )
    }
};

export default DeleteBtn;