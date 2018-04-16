import React, { Component } from 'react';
import API from "./../utils/API";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import MaskedInput from 'react-text-mask';


class ModalEditJumbo extends Component {
    state = {
        name: "",
        email: "",
        phonenumber: "",
        location: "",
        hoursforpickup: "",
        summary: ""
    };

    componentDidMount() {
        this.setState({
            name: this.props.currentName,
            email: this.props.currentEmail,
            phonenumber: this.props.currentPhonenumber,
            location: this.props.currentAddress,
            hoursforpickup: this.props.currentPickUpHours,
            summary: this.props.currentSummary
        })
    }
    editDonor = (event) => {
        event.preventDefault();
        const updatedInfo = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            location: this.state.location,
            summary: this.state.summary
        }
        API.editDonor(this.props.paramsId, updatedInfo)
            .then(res => { console.log("post editted"); window.location.reload(); })
            .catch(err => console.log(err))
    }

    editNonProfit = (event) => {
        event.preventDefault();
        const updatedInfo = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            location: this.state.location,
            hoursforpickup: this.state.hoursforpickup,
            summary: this.state.summary
        }
        API.editNonProfit(this.props.paramsId, updatedInfo)
            .then(res => { console.log("post editted"); window.location.reload(); })
            .catch(err => console.log(err))
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
                                    <label htmlFor="name"><strong>Name:</strong></label>
                                    <input className="form-control col-sm-12 mb-2" type="text" id="edit_name" name="name"
                                        maxLength={30} onChange={this.handleChange} defaultValue={this.props.currentName} />
                                    <br />
                                    <label htmlFor="email"><strong>Email:</strong></label>
                                    <input className="form-control col-sm-12 mb-2" type="text" id="edit_email" name="email"
                                        maxLength={50} onChange={this.handleChange} defaultValue={this.props.currentEmail} />
                                    <br />
                                    <label htmlFor="phonenumber"><strong>Phone Number:</strong></label>
                                    {/*<input className="form-control col-sm-12 mb-2" type="text" id="edit_phone"
                                        name="phonenumber" defaultValue={this.props.currentPhonenumber} onChange={this.handleChange} />*/}

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
                                    <label htmlFor="location"><strong>Location:</strong></label>
                                    <PlacesAutocomplete inputProps={inputProps} />
                                    {/* <input className="col-sm-12 mb-2" type="text" id="edit_location" name="location"
                      maxLength={150} onChange={this.handleChange} defaultValue={this.props.currentAddress}/> */}
                                    <br />
                                    {(localStorage.getItem("isDonor") === "true") ? ("") : (
                                        <div>
                                            <label htmlFor="hoursforpickup"><strong>Hours For Pick Up:</strong></label>
                                            <input className="col-sm-12 mb-2" type="text" id="edit_hours" name="hoursforpickup"
                                                maxLength={30} onChange={this.handleChange} defaultValue={this.props.currentPickUpHours} />
                                            <br />
                                        </div>
                                    )}
                                    <label htmlFor="summary"><strong>Summary:</strong></label>
                                    <input className="form-control col-sm-12 mb-2" type="text" id="edit_location" name="summary"
                                        maxLength={500} onChange={this.handleChange} defaultValue={this.props.currentSummary} />
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