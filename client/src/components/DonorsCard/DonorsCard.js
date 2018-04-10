import React from "react";
//import "./donorsCard.css";

const DonorsCard = (props) => {
  return (
    <div className="card text-black border-primary my-3">
        <div className="card-header bg-primary"><h5>{props.donorName}</h5></div>
        <div className="card-body">
            <h5 className="card-title">Address: {props.donorAddress}</h5>
            <div className ="row">
                <div className ="col-md-6">
                <strong>phone:</strong> {props.donorPhone}
                </div>
                <div className ="col-md-6">
                <strong>email:</strong> {props.donorEmail}
                </div>
            </div>
        </div>
    </div>
  );
}
export default DonorsCard;