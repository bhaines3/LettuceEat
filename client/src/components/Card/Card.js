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
    <div className="card border-primary mb-3" style={{maxWidth: '20rem'}}>
        <div className="card-header">Header</div>
            <div className="card-body">
                <h4 className="card-title">Primary card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
    </div>

  );
}


export default Card;
