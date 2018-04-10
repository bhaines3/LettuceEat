import React,{ Component }  from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
//import API from "../utils/API";
import { Link } from 'react-router-dom';
import {Redirect} from "react-router-dom";
class SignUp extends Component {
  constructor(props){
    super(props);
      this.state = {
        name:"",
        email:"",
        location:"4771 N Warner Terrace, Tucson AZ 85349",
        phonenumber:"",
        password:"" ,
        isDonor:false,
        LoggedIn:false
      }
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
      console.log(this.state.location);
      const newUser={
        name:this.state.name,
        email:this.state.email,
        location:this.state.location,
        isDonor:this.state.isDonor,
        phonenumber:this.state.phonenumber,
        password:this.state.password
      }
      console.log("sending location"+newUser.location);
      axios.post("/api/auth/signup", newUser).then(result=>{
        //reroutes to login page
        const loginUserInfo={
          email:this.state.email,
          password:this.state.password
        }
        axios.post('/api/auth/login', loginUserInfo)
        .then((res) => {
          var token=res.data.token;
          localStorage.setItem('jwtToken',token);
          var decoded = jwt_decode(token);
          var donor=decoded.isDonor;
          var id=decoded.id;  
        
          localStorage.setItem("isDonor",decoded.isDonor);
          localStorage.setItem("userId",decoded.id);
            console.log("token is sent to front end when user is found"+ res.data.token);
            console.log("isDonor"+ res.data.isDonor);
            
        }).catch(error=>{
                this.setState({ message: 'Login failed. Username or password not match' });
        }) 
      });
    }
    render() {
      //redirecting user if 
      const tokenPresent=localStorage.getItem("jwtToken");
      const isDonor=localStorage.getItem("isDonor");
      if(tokenPresent){
        if (isDonor){
          return (<Redirect to={"/donor"}/>)
        }
        else{
          return (<Redirect to={"/"}/>)
        }
        
      }
      
      return (
        <div className="container" id="signUpcontainer">
        {this.state.name}<br/>
        {this.state.email}<br/>
        {this.state.password}<br/>
        {this.state.phonenumber}<br/>
        {this.state.isDonor}
  
        <form id="sign-upform">
          <div className="form-group">
            <label>volunteer name or business name:</label>
            <input name= "name" onChange={this.updateUserSignup} value={this.state.articleSearch} type="text" className="form-control" placeholder="Jane Doe"/>
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" className="form-control"  name= "phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} placeholder="(555)555-5555"/>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" className="form-control"  name= "location" value={this.state.location} onChange={this.updateUserSignup} placeholder="4897 N Warner Terrace, Tucson Arizona"/>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
          </div>
          <div className="form-group">
            <label>Password (6+):</label>
            <input type="password" className="form-control"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
          </div>
          <div className="form-group">
            <input type="radio" name="isDonor" value="true" onChange={this.updateUserSignup} /> Donor<br/>
          </div>
          <button onClick={this.createUser} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Create Account</button>
        </form>
        </div>
      );
    }
  }
  
  export default SignUp;