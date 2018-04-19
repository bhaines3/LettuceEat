import React from "react";
import ModalEditJumbo from '../Modals/ModalEditJumbo';

const ProfileJumbotron = (props) => {
    const renderEditButton = () => {
        if (props.isDonor) {
            if (localStorage.getItem("donorId") === props.paramsId) {
                return (
                    <button id="donorInfoBtnedit" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-editjumbo">Edit</button>
                )
            }
        }
        else {
            if (localStorage.getItem("nonProfitId") === props.paramsId) {
                return (
                    <button id="nonProfitInfoBtnedit" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-editjumbo">Edit</button>
                )
            }
        }
    }
    return (
        <div>
            <div className="jumbotron jumbotron-fluid text-center mt-4 px-4 text-primary">
                <h1 className="display-4 text-capitalize">{props.name}</h1>
                <div className="leading-text">
                    {props.address}
                    <br />
                    <a href={"tel:" + props.phonenumber}> {props.phonenumber}</a>
                    <br />
                    {(props.summary) ? (
                        <div>
                            <br />
                            {props.summary}
                        </div>
                    ) : ("")}
                    <br />
                    {(props.website) ? (
                        <div>
                            <a href={props.website}>View Website</a>
                        </div>
                    ) : ("")}
                    <a href={"mailto:" + props.email}>Send Email</a>
                    <br />
                    {(props.isDonor === false) ? (
                        <div>
                            <u><strong>Available Hours for Food Pick-Up:</strong></u>
                            <br />
                            {props.hoursForPickUp || "No set time"}
                        </div>
                    ) : ("")}
                    {renderEditButton()}
                </div>
            </div>
            <ModalEditJumbo
                isDonor={props.isDonor}
                paramsId={props.paramsId}
                currentName={props.name}
                currentAddress={props.address}
                currentPhonenumber={props.phonenumber}
                currentEmail={props.email}
                currentSummary={props.summary}
                currentWebsite={props.website}
                currentPickUpHours={props.hoursForPickUp || null}
            />
        </div>
    );
}


export default ProfileJumbotron;