import React from "react";
import "./Card.css";
// import ModalEdit from "../ModalEdit";
import DeleteBtn from "../DeleteBtn";
import InterestBtn from "../InterestBtn";

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

const Card = (props) => {

  return (
    <div className="card text-black border-primary my-3">
        <h5 className="card-header bg-primary">{props.title}</h5>
        <div className="card-body">
          <h5 className="card-title">Food Post by <a href={"/donorprofile/"+props.donorId}>{props.donor}</a></h5>
          <p className="card-text">{props.children}</p>
          
          {/*<ModalEdit/>*/}
          {(parseInt(localStorage.getItem("donorId")) === props.donorId) ? (
            <DeleteBtn 
            foodId= {props.foodId}
            />
            ) : ("")}
          {(localStorage.getItem("isDonor") === "false") ? (
          <InterestBtn 
          foodId= {props.foodId}
          nonProfitId = {localStorage.getItem("nonProfitId")}
          />
          ) : ("")}
          <a href="" className="btn btn-primary">View Organizations Interested</a>
        </div>
    </div>

  );
}
export default Card;
