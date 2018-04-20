import React, { Component } from "react";
import API from "./../../utils/API";
import jwt_decode from "jwt-decode";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MaskedInput from 'react-text-mask';

class ModalSignUp extends Component {
    state = {
        name: "",
        email: "",
        location: "",
        isDonor: false,
        phonenumber: "",
        password: "",
        loggedIn: "",
        message: ""
    }
    updateUserSignup = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //location
    onChange = (location) => this.setState({ location })

    createUser = (event) => {
        event.preventDefault();
        geocodeByAddress(this.state.location)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                const newUser = {
                    name: this.state.name,
                    email: this.state.email,
                    location: this.state.location,
                    isDonor: this.state.isDonor,
                    phonenumber: this.state.phonenumber,
                    password: this.state.password
                }
                API.signUp(newUser)
                    .then(result => {
                        const loginUserInfo = {
                            email: newUser.email,
                            password: newUser.password
                        }
                        API.login(loginUserInfo)
                            .then((res) => {
                                //setting the jwt token when loginin result comes in"
                                const token = res.data.token;
                                //saving data to local storage
                                this.donorNonDonorSave(token)
                                window.location.reload()
                            }).catch(error => this.setState({ message: "Please fill everything out before continuing" }));
                    })
                    .catch(err => this.setState({ message: "Please fill everything out before continuing" }));
            }).catch(err => this.setState({ message: "Please fill everything out before continuing" }));
    }
    donorNonDonorSave(token) {
        sessionStorage.setItem('jwtToken', token);
        //console.log(token);
        const decoded = jwt_decode(token);
        //console.log(JSON.stringify(decoded))
        const donor = decoded.isDonor;
        const id = decoded.id;
        sessionStorage.setItem("userId", id);
        sessionStorage.setItem("isDonor", donor);
        if (donor === null || donor === false) {
            let nonProfitId = decoded.NonProfit.id;
            sessionStorage.setItem("nonProfitId", nonProfitId);
        }
        else {
            let donorId = decoded.Donor.id;
            sessionStorage.setItem("donorId", donorId);
        }
        //setting state to redirect user
        this.setState({
            donorLocal: donor,
            loggedIn: token
        })
    }
    clearForm() {
        this.setState({
            name: "",
            email: "",
            location: "",
            isDonor: false,
            phonenumber: "",
            password: ""
        })
    }
    render() {
        const inputProps = {
            value: this.state.location,
            onChange: this.onChange,
        }
        //redirecting
        // if (this.state.loggedIn) {
        //     window.location.reload()
        // }
        return (
            <div className="modal fade" id="modal-signup" tabIndex={-1} role="dialog" aria-labelledby="SignupModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="SignupModal">Create an Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-3 text-center">Donor</label>
                                    <div className="col-3">
                                        <input type="radio" className="form-control radioBtn mt-2" name="isDonor" value="true" onChange={this.updateUserSignup} />
                                    </div>
                                    <label className="col-3 text-center">NonProfit</label>
                                    <div className="col-3">
                                        <input type="radio" className="col-3 form-control radioBtn mt-2" name="isDonor" value="false" onChange={this.updateUserSignup} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Organization name:</label>
                                <input name="name" onChange={this.updateUserSignup} value={this.state.name} type="text" className="form-control col-sm-12 mb-2" placeholder="Jane Doe" />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                {/*<input type="tel" className="form-control col-sm-12 mb-2" name="phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} placeholder="(555)555-5555" />*/}

                                <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    type="tel:"
                                    value={this.state.phonenumber}
                                    name="phonenumber"
                                    showMask={false}
                                    placeholder="enter phone number"
                                    className="form-control col-sm-12"
                                    onChange={this.updateUserSignup}
                                />

                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text" className="form-control col-sm-12 mb-2" name="email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com" />
                            </div>
                            <div className="form-group">
                                <label>Password(6+):</label>
                                <input type="password" className="form-control col-sm-12 mb-2" name="password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******" />
                            </div>
                            <div className="form-group">
                                <label>Address:</label><br />
                                <PlacesAutocomplete inputProps={inputProps} />
                            </div>
                            <span className="alert-message">{this.state.message}</span>
                            <div className="form-group">
                                <button onClick={this.createUser} type="submit" className="btn btn-primary"><i className="fa fa-plus-circle"></i> Create Account</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default ModalSignUp;