import React, { Component }from "react";
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
  //   if(localStorage.getItem("jwtToken")){
  //     if(localStorage.getItem("isDonor")){
  //       return <Redirect to={"/donor"}/>
  //     }
  //     else{
  //       return <Redirect to={"/NonProfitProfile"}/>
  //     }
  //   }
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
    // console.log("im making the post request for login");
    // console.log("im sending email "+ userInfo.email);
    // console.log("im sending password " + userInfo.password);
    axios.post('/api/login', userInfo)
    .then((res) => {
      //setting the jwt token when loginin result comes in"
      const token=res.data.token;
      console.log(token)
      //saving data to local storage
      this.donorNonDonorSave(token)
      
    }).catch(error=>{
      console.log("bitches: " + JSON.stringify(error));
      this.setState({ message: 'Login failed. Username or password not match' });
    })
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
  clearSignin(){
    this.setState({
      email:"",
      password:""
    })
  }
  
  render() {
    if(this.state.loggedIn){
      window.location.reload();
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
                    <label htmlFor="name-login">Email:</label>
                    <input className="form-control col-sm-12 mb-2" type="email" id="name-login" name="emailLogin" value={this.state.email} onChange={this.updateUserlogin} placeholder="janedoe@email.com" maxLength={30} />
                    <br />
                    <label htmlFor="email-login">Password:</label>
                    <input className="form-control col-sm-12 mb-2" type="password" id="password-login" name="passwordLogin" value={this.state.password} onChange={this.updateUserlogin} placeholder="******" maxLength={10} />
                    <br />
                    <div id="alert-message" />
                     <button onClick={this.Login} className="btn btn-primary" type="submit" id="login-user" data-dismiss="modal">Login <i className="fa fa-check-circle" /></button> 
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