import React from "react";

const UserCard = (props) => {
    return (
        <div className="card text-black border-primary my-3" >
            <div className="card-header bg-primary text-capitalize"><a style={{ color: "white" }} href={props.link}><h5>{props.name}</h5></a></div>
            <div className="card-body">

                <h5 onClick={() => props.cardClicked(props.address)} className="card-title">Address: <a id="AddressLink">{props.address}</a></h5>

                <div className="row">
                    <div className="col-md-6">
                        <strong>Phone: </strong><a href={"tel:" + props.phone}> {props.phone}</a>
                    </div>
                    <div className="col-md-6">
                        <strong>Email: </strong><a href={"mailto:" + props.email}>{props.email}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserCard;