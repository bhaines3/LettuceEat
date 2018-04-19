import React, { Component } from 'react';
import API from "./../../utils/API";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import MaskedInput from 'react-text-mask';


class ModalEditJumbo extends Component {
    state = {
        name: "",
        email: "",
        phonenumber: "",
        location: "",
        hoursforpickup: "",
        summary: "",
        website: "",
        message: ""
    };
    componentDidMount() {
        this.setState({
            name: this.props.currentName,
            email: this.props.currentEmail,
            phonenumber: this.props.currentPhonenumber,
            location: this.props.currentAddress,
            hoursforpickup: this.props.currentPickUpHours,
            summary: this.props.currentSummary,
            website: this.props.currentWebsite
        })
    }
    editDonor = (event) => {
        event.preventDefault();
        const updatedInfo = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            location: this.state.location,
            summary: this.state.summary,
            website: this.state.website
        }
        API.editDonor(this.props.paramsId, updatedInfo)
            .then(res => { window.location.reload(); })
            .catch(err => this.setState({ message: "Please make sure these fields are filled out" }))
    }
    editNonProfit = (event) => {
        event.preventDefault();
        const updatedInfo = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            location: this.state.location,
            hoursforpickup: this.state.hoursforpickup,
            summary: this.state.summary,
            website: this.state.website
        }
        API.editNonProfit(this.props.paramsId, updatedInfo)
            .then(res => { window.location.reload(); })
            .catch(err => this.setState({ message: "Please make sure these fields are filled out" }))
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onChange = (location) => this.setState({ location })
    render() {
        const inputProps = {
            value: this.state.location,
            onChange: this.onChange,
        }
        if (this.props.currentName === undefined) {
            return ("");
        }
        else {
            return (
                <div className="modal fade" id="modal-editjumbo" tabIndex={-1} role="dialog" aria-labelledby="editJumbo" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="editJumbo">Edit Your Information</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name"><strong>Name: <strong><span className="text-primary">*</span></strong></strong></label>
                                    <input className="form-control col-sm-12 mb-2" type="text" id="edit_name" name="name"
                                        maxLength={30} onChange={this.handleChange} defaultValue={this.props.currentName} />
                                    <br />
                                    <label htmlFor="email"><strong>Email: <strong><span className="text-primary">*</span></strong></strong></label>
                                    <input className="form-control col-sm-12 mb-2" type="text" id="edit_email" name="email"
                                        maxLength={50} onChange={this.handleChange} defaultValue={this.props.currentEmail} />
                                    <br />
                                    <label htmlFor="phonenumber"><strong>Phone Number: <strong><span className="text-primary">*</span></strong></strong></label>

                                    <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        type="tel:"
                                        id="edit_phone"
                                        defaultValue={this.props.currentPhonenumber}
                                        name="phonenumber"
                                        showMask={false}
                                        placeholder="enter phone number"
                                        className="form-control col-sm-12"
                                        onChange={this.handleChange}
                                    />
                                    <br />
                                    {(localStorage.getItem("isDonor") === "true") ? ("") : (
                                        <div>
                                            <label htmlFor="hoursforpickup"><strong>Hours For Pick Up:</strong></label>
                                            <input className="col-sm-12 mb-2" type="text" id="edit_hours" name="hoursforpickup"
                                                maxLength={30} onChange={this.handleChange} defaultValue={this.props.currentPickUpHours} />
                                            <br />
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label htmlFor="summary">Description: </label>
                                        <textarea className="form-control" id="edit_location" name="summary" rows="3" onChange={this.handleChange}
                                            defaultValue={this.props.currentSummary}></textarea>
                                    </div>


                                    <label htmlFor="website"><strong>Website:</strong></label>
                                    <input className="form-control col-sm-12 mb-2" type="text" placeholder="http://yourwebsite.com" id="edit_website" name="website"
                                        maxLength={500} onChange={this.handleChange} defaultValue={this.props.currentWebsite} />
                                    <br />
                                    <label htmlFor="location"><strong>Location: <strong><span className="text-primary">*</span></strong></strong></label>
                                    <PlacesAutocomplete inputProps={inputProps} />
                                    <br />
                                    {(this.state.message) ? (
                                        <span className="alert-message"><strong><span className="text-primary">*</span></strong> - {this.state.message}</span>
                                    ) : ("")}
                                    <br />
                                    {(localStorage.getItem("isDonor") === "true") ? (
                                        <button className="btn btn-outline-primary" type="submit" id="create-new-user" onClick={this.editDonor}>Save Changes<i className="far fa-check-circle" /></button>
                                    ) : (
                                            <button className="btn btn-outline-primary" type="submit" id="create-new-user" onClick={this.editNonProfit}>Save Changes<i className="far fa-check-circle" /></button>
                                        )}
                                    <br />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default ModalEditJumbo;