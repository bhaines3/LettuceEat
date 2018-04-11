import React,{ Component }  from "react";
import axios from 'axios';
//import API from "../utils/API";
//import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {Redirect} from "react-router-dom";
import "./ModalSignUp.css";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class ModalSignUp extends Component {
  state = {
    name:"",
    email:"",
    location:"",
    // lat:"",
    // lng:"",
    latlng:[],
    isDonor:false,
    phonenumber:"",
    password:"",
    loggedIn:"",
    donorLocal:""
  }
  updateUserSignup = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const  {name, value}  = event.target;
    this.setState({
      [name]: value
    });
  };
  onChange = (location) => this.setState({ location })
  createUser=(event)=>{
    event.preventDefault();
    //const latlngArray=[];
    geocodeByAddress(this.state.location)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng);
      //latlngArray.push(latLng);
      //console.log(latlngArray);  
      // this.setState({
      //   lat:latLng.lat,
      //   lng:latLng.lng
      // });
      console.log(this.state.lat);
      console.log(this.state.lng);
      const newUser={
        name:this.state.name,
          email:this.state.email,
          location:this.state.location,
          // lat:this.state.lat,
          // lng:this.state.lng,
          isDonor:this.state.isDonor,
          phonenumber:this.state.phonenumber,
          password:this.state.password
      }
      console.log("creating" +newUser.name);
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
        }).catch(error => console.error('Error', error))
        
      });
  })
  }
  donorNonDonorSave(token){
    localStorage.setItem('jwtToken',token);
    console.log(token);
    const decoded = jwt_decode(token);
    //console.log(JSON.stringify(decoded))
    const donor=decoded.isDonor;
    const id=decoded.id;
    localStorage.setItem("userId",id);
    localStorage.setItem("isDonor",donor);
    if(donor===null||donor===false){
      let nonProfitId=decoded.NonProfit.id;
      localStorage.setItem("nonProfitId",nonProfitId);
    }
    else{
      let donorId=decoded.Donor.id;
      localStorage.setItem("donorId",donorId);
    }     
    //setting state to redirect user
    this.setState({
      donorLocal:donor,
      loggedIn:token
    })
  } 
  render() {
    const inputProps = {
      value: this.state.location,
      onChange: this.onChange,
    }
    
    if(this.state.loggedIn){
      if (this.state.isDonor){
        console.log("there is donor and token")
        return <Redirect to={"/DonorProfile/"+localStorage.getItem("donorId")}/>
      }
      else{
        console.log("token but no donor")
        return <Redirect to={"/NonProfitProfile/"+localStorage.getItem("nonProfitId")}/>
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
                  <input name= "name" onChange={this.updateUserSignup} value={this.state.name} type="text" className="form-control col-sm-12 mb-2" placeholder="Jane Doe"/>
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="text" className="form-control col-sm-12 mb-2"  name= "phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} placeholder="(555)555-5555"/>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control col-sm-12 mb-2"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
                </div>
                <div className="form-group">
                  <label>Password(6+):</label>
                  <input type="password" className="form-control col-sm-12 mb-2"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
                </div>
                <div className="form-group">
                  <label>Address:</label><br/>
                  <PlacesAutocomplete inputProps={inputProps}/>
                  {/* <input type="text" className="form-control"  name= "location" value={this.state.location} onChange={this.updateUserSignup} placeholder="4897 N Warner Terrace, Tucson Arizona"/> */}
                </div>
                <div className="form-group">
                  <input type="radio" className="form-control col-sm-12 mb-2"name="isDonor" value="true" onChange={this.updateUserSignup} /><div>Donor</div>
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