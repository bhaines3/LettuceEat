import React, { Component } from 'react';
import "./Card.css";
// import ModalEdit from "../ModalEdit";
import DeleteBtn from "../DeleteBtn";
import InterestBtn from "../InterestBtn";
import API from "./../utils/API";


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
        <h5 className="card-header bg-primary">{this.props.title}</h5>
        <div className="card-body">
          <h5 className="card-title">Food Post by <a href={"/donorprofile/"+this.props.donorId}>{this.state.donorName}</a></h5>
          {this.props.children}
          
          {/*<ModalEdit/>*/}
          {(parseInt(localStorage.getItem("donorId")) === this.props.donorId) ? (
            <DeleteBtn 
            foodId= {this.props.foodId}
            />
            ) : ("")}
          {(localStorage.getItem("isDonor") === "false") ? (
          <InterestBtn 
          foodId= {this.props.foodId}
          nonProfitId = {localStorage.getItem("nonProfitId")}
          />
          ) : ("")}
          <a href="" className="btn btn-primary">View Organizations Interested</a>
        </div>
    </div>

    );
  }
}
export default Card;
