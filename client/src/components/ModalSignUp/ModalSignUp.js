import React,{ Component }  from "react";
import axios from 'axios';
import API from "../utils/API";
import { Link } from 'react-router-dom';
import "./ModalSignUp.css";
class ModalSignUp extends Component {
  state = {
    name:"",
    email:"",
    isDonor:false,
    phonenumber:"",
    password:"" 
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
      // isDonor:this.state.isDonor,
      phonenumber:this.state.phonenumber,
      password:this.state.password
    }
    axios.post("/api/auth/signup", newUser).then(result=>{
        //reroutes to login page
        // this.props.history.push("/login")
        window.location="/"+this.state.name;
    });
    //passport will take care of this 
    // //CHECK if user exists before creating a new account
    // API.findOneuser(newUser).then((res)=>{
    //   //if user exists send a msg for them to create choose other emaill
    //   //console.log("data:" + JSON.stringify(res.data));
    //   if(!res.data){
    //     API.createUser(newUser).then(()=>{
    //       console.log("User has been created.");
    //     })
    //   }
    //   //if user doesnt not exist make new account
    //   else{
    //     console.log("An account for this email account already exists.")
    //   }
    // })
  }
  render() {
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
              {/* <div className="form-group">
                    <label htmlFor="new-name">Name:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_name" name="new-name" maxLength={30} />
                    <br />
                    <label htmlFor="new-email">Email:</label>
                    <input className="col-sm-12 mb-2" type="email" id="new_email" name="new-email" maxLength={500} />
                    <br />
                    <label htmlFor="new-password">Password:</label>
                    <input className="col-sm-12 mb-2" type="password" id="new_password" name="new-password" maxLength={15} />
                    <br />
                    <label htmlFor="new-phone-number">Phone:</label>
                    <input className="col-sm-12 mb-2" type="number" id="new_phone_number" name="new-new_phone_number" maxLength={13} />
                    <br />

                    <div id="alert-message" />
                     <button className="btn btn-outline-primary" type="submit" id="create-new-user">Create <i className="fas fa-plus-circle"></i></button> 
                    <br />
                    <span id="cannot-create-error" />
                </div> */}
                <form id="sign-upform">
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
          
          {/* <div className="form-group">
            <input type="radio" name="isDonor" value="true" onChange={this.updateUserSignup} /> Donor<br/>
          </div> */}
          {/* <!-- Here we have our final submit button --> */}
          <button onClick={this.createUser} type="submit" className="btn btn-primary"><i className="fa fa-plus-circle"></i> Create Account</button>
        </form>
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