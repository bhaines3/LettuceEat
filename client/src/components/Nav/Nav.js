import React from 'react';
import API from "../utils/API";
import ModalSignUp from '../Modals/ModalSignUp';
import ModalLogin from '../Modals/ModalLogin';
import { Redirect } from "react-router-dom";
import Logo from "./logo.png";
import './Nav.css';

const Logout = event => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem("isDonor");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("donorId");
    sessionStorage.removeItem("nonProfitId");
    API.logout()
        .then(res => { return <Redirect to={"/"} /> })
        .catch(err => console.log(err))
}
const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href={"/"} className="navbar-left"><img id="logo" src={Logo} alt="logo" /></a>
            <div className="navbar-item">
                <a className="nav-link text-light" href={"/"}><h3>LettuceEAT</h3></a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="btn btn-primary text-white" href={"/"}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-primary text-white" href={"/aboutus"}>About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-primary text-white" href={"/allDonors"}>Donors</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-primary text-white" href={"/allNonProfits"}>Non-Profits</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    {/* rendering signup and sign in when not logged in and profile */}
                    {(sessionStorage.getItem("jwtToken") != null) ? (<div>
                        {(sessionStorage.getItem("donorId") !== null) ? (<div>
                            <a className="btn btn-primary text-white" href={"/DonorProfile/" + sessionStorage.getItem("donorId")}>Profile</a>
                            <a href={"/"} className="btn btn-primary text-white" onClick={Logout} id="logoutbtn">Logout</a>
                        </div>) : (<div>
                            <a className="btn btn-primary text-white" href={"/NonProfitProfile/" + sessionStorage.getItem("nonProfitId")}>Profile</a>
                            <a href={"/"} className="btn btn-primary text-white" onClick={Logout} id="logoutbtn">Logout</a>
                        </div>)}
                    </div>) : (
                            <div>
                                <a href="" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-signup">Sign-Up</a>
                                <a href="" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-login">Sign-In</a></div>
                        )}
                </form>
                <ModalLogin />
                <ModalSignUp />
            </div>
        </nav>
    );
};

export default Nav;