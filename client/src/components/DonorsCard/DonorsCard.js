import React from "react";
const DonorsCard = (props) => {
  return (
    <div className="card text-black border-primary my-3">
        <div className="card-header bg-primary"><a className="text-white" href={"/DonorProfile/"+props.donorId}><h5>{props.donorName}</h5></a></div>
        <div  className="card-body">
            <h5 onClick={()=>props.cardClicked(props.donorAddress)} className="card-title">Address: {props.donorAddress}</h5>
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