import React from "react";
import "./Card.css";

const Card = () => {

  return (
    // <div className="panel panel-primary">
    //   <div className="panel-heading">
    //     <h3 className="panel-title text-center">{props.title}</h3>
    //   </div>
    //   <div className="panel-body">
    //     {props.children}
    //   </div>
    // </div>
    <div className="card">
    <h5 className="card-header"></h5>
    <div className="card-body">
      <h5 className="card-title"></h5>
      <p className="card-text"></p>
      <a href="#" className="btn btn-primary">View Organizations Interested</a>
    </div>
  </div>

  );
}


export default Card;
