import React, { Component }from "react";
import "./ModalLogin.css";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {Redirect} from "react-router-dom";
class ModalLogin extends Component {
  state = {
      nameLogin:"",
      passwordLogin:"",
      isDonor:false,
      isLoggedIn:false
  }
  componentWillMount(){
    if(localStorage.getItem("jwtToken")){
      if(localStorage.getItem("isDonor")){
        return <Redirect to={"/donor"}/>
      }
      else{
        return <Redirect to={"/NonProfitProfile"}/>
      }
    }
  }
  updateUserlogin = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const  {name, value}  = event.target;
    this.setState({
      [name]: value
    });
  }; 
  Login=event=>{
    event.preventDefault();
    const userInfo={
        email:this.state.emailLogin,
        password:this.state.passwordLogin
    }
    //making sure info is goin gto request
    console.log("im making the post request for login");
    console.log("im sending email "+ userInfo.email);
    console.log("im sending password " + userInfo.password);
    axios.post('/api/auth/login', userInfo)
    .then((result) => {
      console.log("i was working all along"+result.data.test);
      //setting the jwt token when loginin result comes in"
      var token=result.data.token;
      localStorage.setItem('jwtToken',token);
      var decoded = jwt_decode(token);
      var donor=decoded.isDonor;
      var id=decoded.id;      
      localStorage.setItem("isDonor",donor);
      localStorage.setItem("userId",id);
      //redirecting user if 
      this.setState({
        isDonor:donor,
        loggedIn:token
      })
    }).catch(error=>{
      this.setState({ message: 'Login failed. Username or password not match' });
    })
  }
  render() {
    if(this.state.loggedIn){
      if (this.state.isDonor){
        console.log("there is donor and token")
        return <Redirect to={"/donor"}/>
      }
      else{
        console.log("token but no donor")
        return <Redirect to={"/NonProfitProfile"}/>
      }
    }
    return (
       <div className="modal fade" id="modal-login" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel222" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel222">Log in to account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
              {this.state.isDonor}
              {this.state.LoggedIn}
                    <label htmlFor="name-login">Email:</label>
                    <input className="col-sm-12 mb-2" type="email" id="name-login" name="emailLogin" value={this.state.email} onChange={this.updateUserlogin} placeholder="janedoe@email.com" maxLength={30} />
                    <br />
                    <label htmlFor="email-login">Password:</label>
                    <input className="col-sm-12 mb-2" type="password" id="password-login" name="passwordLogin" value={this.state.password} onChange={this.updateUserlogin} maxLength={10} />
                    <br />
                    <div id="alert-message" />
                     <button onClick={this.Login} className="btn btn-primary" type="submit" id="login-user">Login <i className="fa fa-check-circle" /></button> 
                    <br />
                    <span id="cannot-create-error" />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default ModalLogin;