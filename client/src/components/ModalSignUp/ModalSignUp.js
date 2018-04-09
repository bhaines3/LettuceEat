import React,{ Component }  from "react";
import axios from 'axios';
//import API from "../utils/API";
//import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {Redirect} from "react-router-dom";
import "./ModalSignUp.css";
class ModalSignUp extends Component {
  state = {
    name:"",
    email:"",
    isDonor:false,
    phonenumber:"",
    password:"",
    donorLocal:false,
    loggedIn: false
  }
  updateUserSignup = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const  {name, value}  = event.target;
    this.setState({
      [name]: value
    });
  };
  createUser=(event)=>{
    event.preventDefault();
    const newUser={
      name:this.state.name,
      email:this.state.email,
      isDonor:this.state.isDonor,
      phonenumber:this.state.phonenumber,
      password:this.state.password
    }
    axios.post("/api/auth/signup", newUser).then(result=>{
        //reroutes to login page
        const loginUserInfo={
          email:this.state.email,
          password:this.state.password
        }
        axios.post('/api/auth/login', loginUserInfo)
        .then((res) => {
          //setting the jwt token when loginin result comes in"
          const token=res.data.token;
          //saving data to local storage
          this.donorNonDonorSave(token)
            
        }).catch(error=>{
          return "Error creating User"+error;
        }) 
    });
  }
  donorNonDonorSave(token){
    localStorage.setItem('jwtToken',token);
      console.log(token);
      const decoded = jwt_decode(token);
      console.log(JSON.stringify(decoded))
      const donor=decoded.isDonor;
      const id=decoded.id;
      localStorage.setItem("userId",id);
      localStorage.setItem("isDonor",donor); 
      if(donor===null||donor===false){
        const nonProfitId=decoded.NonProfit.id;
        localStorage.setItem("nonProfitId",nonProfitId);
      }
      else{
        const donorId=decoded.Donor.id;
        localStorage.setItem("donorId",donorId);
      }     
      //setting state to redirect user
      this.setState({
        isDonor:donor,
        loggedIn:token
      })
  }
  render() {
    if(this.state.loggedIn){
      if (this.state.donorLocal){
        console.log("there is donor and token")
        return <Redirect to={"/donor"}/>
      }
      else{
        console.log("token but no donor")
        return <Redirect to={"/NonProfitProfile"}/>
      }
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
                  <label>Organization name:</label>
                  <input name= "name" onChange={this.updateUserSignup} value={this.state.articleSearch} type="text" className="form-control col-sm-12 mb-2" placeholder="Jane Doe"/>
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="text" className="form-control col-sm-12 mb-2"  name= "phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} placeholder="(555)555-5555"/>
                </div>
                {/* <!-- Here we capture the Start Year Parameter--> */}
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control col-sm-12 mb-2"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
                </div>
                {/* <!-- Here we capture the End Year Parameter --> */}
                <div className="form-group">
                  <label>Password(6+):</label>
                  <input type="password" className="form-control col-sm-12 mb-2"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
                </div>
                <div className="form-group">
                  <input type="radio" className="form-control col-sm-12 mb-2"name="isDonor" value="true" onChange={this.updateUserSignup} /> Donor
                </div>
                {/* <!-- Here we have our final submit button --> */}
                <button onClick={this.createUser} type="submit" className="btn btn-primary" data-dismiss="modal"><i className="fa fa-plus-circle"></i> Create Account</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    );
};
};

export default ModalSignUp;