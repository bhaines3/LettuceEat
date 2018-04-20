import React, { Component } from 'react';
import API from "./../../utils/API";


class ModalEditPost extends Component {
    state = {
        postTitle: "",
        postDesc: "",
        postPickUpDate: "",
        postPickUpWindow: "",
        message: ""
    };

    componentDidMount() {
        this.setState({
            postTitle: this.props.foodTitle,
            postDesc: this.props.foodDesc,
            postPickUpDate: this.props.foodPickUpDay,
            postPickUpWindow: this.props.foodPickUpWindow
        })
    }
    editPost = (event) => {
        event.preventDefault();
        const updatedPost = {
            DonorId: this.props.donorId,
            title: this.state.postTitle,
            desc: this.state.postDesc,
            pickupdate: this.state.postPickUpDate,
            pickupwindow: this.state.postPickUpWindow
        }
        API.editPost(this.props.foodId, updatedPost)
            .then(res => { window.location.reload(); })
            .catch(err => this.setState({ message: "Please make sure these fields are filled out" }))
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    render() {
        return (
            <div className="modal fade" id={"modal-editpost" + this.props.foodId} tabIndex={-1} role="dialog" aria-labelledby={"editFoodPost" + this.props.foodId} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id={"editFoodPost" + this.props.foodId}>Edit Food Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="postTitle"><strong>Title: <span className="text-primary">*</span></strong></label>
                                <input className="form-control col-sm-12 mb-2" type="text" id={"edit_title" + this.props.foodId} name="postTitle"
                                    maxLength={30} onChange={this.handleChange} defaultValue={this.props.foodTitle} />
                                <br />
                                <div className="form-group">
                                    <label htmlFor="postDesc"><strong>Description: <span className="text-primary">*</span></strong></label>
                                    <textarea className="form-control" id={"edit_desc" + this.props.foodId} name="postDesc" rows="3" onChange={this.handleChange}
                                        defaultValue={this.props.foodDesc} maxlength={500} placeholder="max 500 characters"></textarea>
                                </div>



                                <label htmlFor="postPickUpDate"><strong>Pick-Up Date: <span className="text-primary">*</span></strong></label>
                                <input className="form-control col-sm-12 mb-2" type="date" id={"edit_pickupdate" + this.props.foodId}
                                    name="postPickUpDate" defaultValue={this.props.foodPickUpDay} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="postPickUpWindow"><strong>Pick-Up Time Window: </strong></label>
                                <input className="form-control col-sm-12 mb-2" type="text" id={"edit_pickupwindow" + this.props.foodId} name="postPickUpWindow"
                                    maxLength={15} onChange={this.handleChange} defaultValue={this.props.foodPickUpWindow} />
                                <br />
                                {(this.state.message) ? (
                                    <span className="alert-message"><strong><span className="text-primary">*</span></strong> - {this.state.message}</span>
                                ) : ("")}
                                <br />
                                <button onClick={this.editPost} type="submit" className="btn btn-primary"><i className="fa fa-plus-circle"></i>Save Changes</button>
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

export default ModalEditPost;