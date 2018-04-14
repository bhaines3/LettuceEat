import React, { Component } from 'react';
import "./FoodCard.css";
import DeleteBtn from "../DeleteBtn";
import InterestBtn from "../InterestBtn";
import API from "./../utils/API";
import ModalEditPost from '../../components/ModalEditPost';
import ModalViewInterested from '../../components/ModalViewInterested';


class FoodCard extends Component {
    state = {
        donorName: "",
        donorId: "",
        foodId: "",
        title: "",
    };

    componentDidMount() {
        API.findOneDonor(this.props.donorId)
            .then(res => { this.setState({ donorName: res.data.name, donorId: res.data.id, foodId: this.props.foodId }) })
            .catch(err => console.log(err));
        this.setState({ title: this.props.title })
    }
    render() {
        return (
            <div className="card text-black border-primary my-3">
                <h4 className="card-header bg-primary">Food Post by <a className="text-white text-capitalize" href={"/donorprofile/" + this.props.donorId}>{this.state.donorName}</a></h4>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    {(parseInt(localStorage.getItem("donorId")) === this.props.donorId) ? (
                        <a href="" className="btn btn-primary text-white float-right" data-toggle="modal" data-target={"#modal-editpost" + this.props.foodId}>Edit</a>
                    ) : ("")}
                    <br />
                    <br />
                    <strong>Description:</strong><p className="foodDescription">{this.props.desc}</p>
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                            <strong>Pick-Up Date:</strong> {this.props.pickupdate}
                        </div>
                        <div className="col-md-8">
                            <strong>Pick-Up Window:</strong> {this.props.pickupwindow}
                        </div>
                    </div>
                    <a href="" className="btn btn-primary text-white float-left" data-toggle="modal" data-target={"#modal-allinterested" + this.props.foodId}>View Organizations Interested</a>
                    {(parseInt(localStorage.getItem("donorId")) === this.props.donorId) ? (
                        <DeleteBtn
                            foodId={this.props.foodId}
                            donorId={this.props.donorId}
                        />
                    ) : ("")}
                    {(localStorage.getItem("isDonor") === "false") ? (
                        <InterestBtn
                            foodId={this.props.foodId}
                            nonProfitId={localStorage.getItem("nonProfitId")}
                        />
                    ) : ("")}
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
export default FoodCard;
