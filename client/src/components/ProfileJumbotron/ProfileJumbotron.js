import React from "react";
import EditJumbo from '../EditJumbo';

const ProfileJumbotron = (props) => {
  const renderEditButton = () => {
      if(props.isDonor)
      {
        if(localStorage.getItem("donorId") === props.paramsId)
        {
          return (
            <a href="" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-editjumbo">Edit</a>
          )
        }
      }
      else
      {
        if(localStorage.getItem("nonProfitId") === props.paramsId)
        {
          return (
            <a href="" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-editjumbo">Edit</a>
          )
        }
      }
  }
  return (
    <div className="jumbotron jumbotron-fluid text-center mt-4 px-4 text-primary">
      <h1 className="display-4">{props.name}</h1>
      {/* Make address a link to view location */}
      {props.address}
      <br />
      {props.phonenumber}
      <br />
      {/* Make email a link to send an email */}
      {props.email}
      <br />
      {(props.summary) ? (
        <div>
          <strong>Summary:</strong> {props.summary}
        </div>
      ): ("")}
      <br />
      {(props.isDonor === false) ? (
        <div>
        <u><strong>Hours for Public Pick Up:</strong></u>
        <br />
        {props.hoursForPickUp || "No set time"}
        </div>
      ) : ("")}
      <br />
      {renderEditButton()}
    </div>  
    <EditJumbo 
      isDonor={props.isDonor}
      paramsId={props.paramsId}
      currentName={props.name}
      currentAddress={props.address}
      currentPhonenumber={props.phonenumber}
      currentEmail={props.email}
      currentSummary={props.summary}
      currentPickUpHours={props.hoursforpickup || null}
      />
    </div>
  );
}


export default ProfileJumbotron;