import React, { Component } from 'react';
import "./ModalAddPost.css";
import API from "./../utils/API";



class ModalAddPost extends Component {

  state = {
    donorId: "",
    postTitle: "", 
    postDesc: "", 
    postPickUpDate: "", 
    postEndDate: "",
    postPickUpWindow: ""
  };

  componentDidMount() {
    var parent = this._reactInternalFiber._debugOwner.stateNode;
    API.findAllFoodPosts()
        .then(res => {this.setState({ foodposts: res.data })})
        .catch(err => console.log(err));
    API.findOneDonor(parent.props.match.params.id)
        .then(res => {this.setState({ donorId: res.data.id })})
        .catch(err => console.log(err));
    API.findAllDonors()
        .then(res => {this.setState({ donors: res.data })})
        .catch(err => console.log(err));
    API.findAllNonProfits()
        .then(res => {this.setState({ nonprofits: res.data})})
        .catch(err => console.log(err));
  }
  addNewPost = (event) => {
    event.preventDefault();
    const newPost={
        DonorId: this.state.donorId,
        title: this.state.postTitle,
        desc: this.state.postDesc,
        pickupdate: this.state.postPickUpDate,
        enddate: this.state.postEndDate,
        pickupwindow: this.state.postPickUpWindow
    }
    console.log(newPost);
    API.createNewPost(newPost)
        .then(res => {console.log("new post added")})
        .catch(err => console.log(err))
  }

  handleChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const  {name, value}  = event.target;
    this.setState({
      [name]: value
    });
  };
    render() { return (
      
      <div className="modal fade" id="modal-addpost" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">Add New Food Post</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                    <label htmlFor="postTitle">Title:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_title" name="postTitle" maxLength={30} onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="postDesc">Description:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_desc" name="postDesc" maxLength={500} onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="postPickUpDate">Pick-Up Date:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_pickupdate" name="postPickUpDate" maxLength={15} onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="postEndDate">End Pick-Up Date:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_enddate" name="postEndDate" maxLength={15} onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="postPickUpWindow">Pick-Up Time Window:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_pickupwindow" name="postPickUpWindow" maxLength={15} onChange={this.handleChange}/>
                    <br />
                    <div id="alert-message" />
                    {/* <button className="btn btn-outline-success" type="submit" id="create-new-user" onClick={this.addNewPost}>Create<i className="far fa-check-circle" /></button> */}
                    <br />
                    <span id="cannot-create-error" />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalAddPost;