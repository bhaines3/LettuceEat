import React from "react";
import "./ProfileJumbotron.css";

const ProfileJumbotron = (props) => {

  return (
    <div className="jumbotron jumbotron-fluid">
      <h1 className="display-4">{props.name}</h1>
      {/* Make address a link to view location */}
      {props.address}
      <br />
      {props.phonenumber}
      <br />
      {/* Make email a link to send an email */}
      {props.email}
      {props.children}
    </div>  
  );
}


export default ProfileJumbotron;