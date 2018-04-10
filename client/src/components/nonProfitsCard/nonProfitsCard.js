import React from "react";


const NonProfitsCard = (props) => {
  return (
    <div className="card text-black border-primary my-3" >
        <div className="card-header bg-primary"><h5>{props.nonProfitName}</h5></div>
        <div className="card-body">
            <h5 className="card-title">Address: {props.nonProfitAddress}</h5>
            <div className ="row">
                <div className ="col-md-6">
                <strong>phone:</strong> {props.nonProfitPhone}
                </div>
                <div className ="col-md-6">
                <strong>email:</strong> {props.nonProfitEmail}
                </div>
            </div>
        </div>
    </div>
  );
}
export default NonProfitsCard;