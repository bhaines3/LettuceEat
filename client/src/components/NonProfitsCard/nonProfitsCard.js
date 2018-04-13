import React from "react";

const NonProfitsCard = (props) => {
  return (
    <div className="card text-black border-primary my-3" >
        <div className="card-header bg-primary text-capitalize"><a style={{color:"white"}} href={"/NonProfitProfile/"+props.nonProfitId}><h5>{props.nonProfitName}</h5></a></div>
        <div className="card-body">
            <h5 onClick={()=>props.cardClicked(props.nonProfitAddress)} className="card-title">Address: {props.nonProfitAddress}</h5>
            <div className ="row">
                <div className ="col-md-6">
                <strong>phone:</strong> {props.nonProfitPhone}
                </div>
                <div className ="col-md-6">
                <a href={"mailto:"+props.nonProfitEmail}><strong>email:</strong> {props.nonProfitEmail}</a>
                </div>
            </div>
        </div>
    </div>
  );
}
export default NonProfitsCard;
