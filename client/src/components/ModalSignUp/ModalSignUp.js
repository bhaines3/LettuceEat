import React, { Component } from "react";
import axios from 'axios';
// import API from "../utils/API";
//import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class ModalSignUp extends Component {
    state = {
        name: "",
        email: "",
        location: "",
        isDonor: false,
        phonenumber: "",
        password: "",
        loggedIn: ""
    }
    componentWillMount() {
        //clearing the form when it is close
        //this.clearForm();
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
                console.log('Success', latLng);
                const newUser = {
                    name: this.state.name,
                    email: this.state.email,
                    location: this.state.location,
                    isDonor: this.state.isDonor,
                    phonenumber: this.state.phonenumber,
                    password: this.state.password
                }

                //console.log("creating" +newUser.name);
                axios.post("/api/signup", newUser).then(result => {
                    //reroutes to login page
                    const loginUserInfo = {
                        email: newUser.email,
                        //this.state.email,
                        password: newUser.password
                        //this.state.password
                    }
                    axios.post('/api/login', loginUserInfo)
                        .then((res) => {
                            //setting the jwt token when loginin result comes in"
                            const token = res.data.token;

                            //saving data to local storage
                            this.donorNonDonorSave(token)
                        }).catch(error => console.error('Error', error));

                });
            })
    }
    donorNonDonorSave(token) {
        localStorage.setItem('jwtToken', token);
        //console.log(token);
        const decoded = jwt_decode(token);
        //console.log(JSON.stringify(decoded))
        const donor = decoded.isDonor;
        const id = decoded.id;
        localStorage.setItem("userId", id);
        localStorage.setItem("isDonor", donor);
        if (donor === null || donor === false) {
            let nonProfitId = decoded.NonProfit.id;
            localStorage.setItem("nonProfitId", nonProfitId);
        }
        else {
            let donorId = decoded.Donor.id;
            localStorage.setItem("donorId", donorId);
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
        if (this.state.loggedIn) {
            window.location.reload()
        }
        return (
            <div className="modal fade" id="modal-signup" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel111" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel111">Create an Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Donor</label>
                                        <input type="radio" className="form-control" name="isDonor" value="true" onChange={this.updateUserSignup} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>NonProfit</label>
                                        <input type="radio" className="form-control" name="isDonor" value="false" onChange={this.updateUserSignup} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Organization name:</label>
                                <input name="name" onChange={this.updateUserSignup} value={this.state.name} type="text" className="form-control col-sm-12 mb-2" placeholder="Jane Doe" />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input type="tel" className="form-control col-sm-12 mb-2" name="phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} placeholder="(555)555-5555" />

                                {/*<input type='tel' className="form-control col-sm-12" name="phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} pattern='[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}'  title='Phone Number (Format: (999)999-9999)' />*/}

                                {/*<input type="tel" className="form-control col-sm-12"  name="phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$" />*/}

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
                            <div className="form-group">
                                <button onClick={this.createUser} type="submit" className="btn btn-primary" data-dismiss="modal"><i className="fa fa-plus-circle"></i> Create Account</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default ModalSignUp;