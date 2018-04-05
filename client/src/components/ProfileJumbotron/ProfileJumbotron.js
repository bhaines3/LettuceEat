import React from "react";
import "./ProfileJumbotron.css";

const ProfileJumbotron = (props) => {

  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid text-center">
        <h1 className="display-4">{props.children}</h1>
        {/* Make address a link to view location */}
        {props.address}
        <br />
        {props.phonenumber}
        <br />
        {/* Make email a link to send an email */}
        {props.email}
      </div>  
    </div>
  );
}


export default ProfileJumbotron;