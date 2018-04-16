import React, { Component } from 'react';
import API from "./../../utils/API";


class ModalAddPost extends Component {
    state = {
        postTitle: "",
        postDesc: "",
        postPickUpDate: "",
        postEndDate: "",
        postPickUpWindow: "",
    };
    addNewPost = (event) => {
        event.preventDefault();
        const newPost = {
            DonorId: this.props.donorId,
            title: this.state.postTitle,
            desc: this.state.postDesc,
            pickupdate: this.state.postPickUpDate,
            enddate: this.state.postEndDate,
            pickupwindow: this.state.postPickUpWindow
        }
        API.createNewPost(newPost)
            .then(res => { window.location.reload(); })
            .catch(err => console.log(err))
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    render() {
        return (
            <div className="modal fade" id="modal-addpost" tabIndex={-1} role="dialog" aria-labelledby="addPostModal" aria-hidden="true">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="addPostModal">Add New Food Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="postTitle"><strong>Title:</strong></label>
                                <input className="form-control col-sm-12 mb-2" type="text" id="new_title" name="postTitle" maxLength={30} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="postDesc"><strong>Description:</strong></label>
                                <input className="form-control col-sm-12 mb-2" type="text" id="new_desc" name="postDesc" maxLength={500} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="postPickUpDate"><strong>Pick-Up Date:</strong></label>
                                <input className="form-control col-sm-12 mb-2" type="date" id="new_pickupdate" name="postPickUpDate" defaultValue="" onChange={this.handleChange} />
                                <br />
                                <label htmlFor="postPickUpWindow"><strong>Pick-Up Time Window:</strong></label>
                                <input className="form-control col-sm-12 mb-2" type="text" id="new_pickupwindow" name="postPickUpWindow" maxLength={15} onChange={this.handleChange} />
                                <br />
                                <button className="btn btn-outline-primary" type="submit" id="create-new-user" onClick={this.addNewPost}>Create <i className="far fa-check-circle" /></button>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
};

export default ModalAddPost;