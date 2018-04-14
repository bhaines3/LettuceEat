import React, { Component } from 'react';
import "./Card.css";
import DeleteBtn from "../DeleteBtn";
import InterestBtn from "../InterestBtn";
import API from "./../utils/API";
import ModalEditPost from '../../components/ModalEditPost';
import ModalViewInterested from '../../components/ModalViewInterested';


  class Card extends Component {
    state = {
      donorName: ""
    };
  
    componentDidMount() {
      API.findOneDonor(this.props.donorId)
          .then(res => {this.setState({ donorName: res.data.name })})
          .catch(err => console.log(err));
    }
    render() { return (
    <div className="card text-black border-primary my-3">
        <h5 className="card-header bg-primary">Food Post by <a className="text-white text-capitalize" href={"/donorprofile/"+this.props.donorId}>{this.state.donorName}</a></h5>
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          {(parseInt(localStorage.getItem("donorId")) === this.props.donorId) ? (
            <a href="" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-editpost">Edit</a>
            ) : ("")}
          <br />
            <strong>Description:</strong><p className="foodDescription">{this.props.desc}</p>
          <br />
          <br />
          <div className ="row">
              <div className ="col-md-4">
                  <strong>Pick-Up Date:</strong> {this.props.pickupdate}
              </div>
              <div className ="col-md-8">
                <strong>Pick-Up Window:</strong> {this.props.pickupwindow}
              </div>
          </div>
          {(parseInt(localStorage.getItem("donorId")) === this.props.donorId) ? (
            <DeleteBtn 
            foodId= {this.props.foodId}
            donorId = {this.props.donorId}
            />
            ) : ("")}
          {(localStorage.getItem("isDonor") === "false") ? (
          <InterestBtn 
          foodId= {this.props.foodId}
          nonProfitId = {localStorage.getItem("nonProfitId")}
          />
          ) : ("")}
          <a href="" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-allinterested">View Organizations Interested</a>
        </div>
        <ModalEditPost
        donorId={this.props.donorId}
        foodId={this.props.foodId}
        foodTitle={this.props.title}
        foodDesc={this.props.desc}
        foodPickUpDay={this.props.pickupdate}
        foodPickUpWindow={this.props.pickupwindow}
        />
        <ModalViewInterested
        foodId={this.props.foodId}
        />
    </div>

    );
  }
}
export default Card;
