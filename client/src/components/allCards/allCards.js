import React from "react";

const AllCards = (props) => {
  return (
    <div className="card text-black border-primary my-3" >
        <div className="card-header bg-primary"><a style={{color:"white"}} href={props.link}><h5>{props.name}</h5></a></div>
        <div className="card-body">
            <h5 onClick={()=>props.cardClicked(props.address)} className="card-title">Address: {props.address}</h5>
            <div className ="row">
                <div className ="col-md-6">
                <strong>phone:</strong> {props.phone}
                </div>
                <div className ="col-md-6">
                <a href={"mailto:"+props.email}><strong>email:</strong> {props.email}</a>
                </div>
            </div>
        </div>
    </div>
  );
}
export default AllCards;