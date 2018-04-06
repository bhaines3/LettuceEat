import React,{ Component }  from "react";
import axios from 'axios';
//import API from "../utils/API";
import { Link } from 'react-router-dom';
class SignUp extends Component {
    state = {
      name:"",
      email:"",
      isDonor:false,
      phonenumber:"",
      password:"" 
    }
    componentDidMount = () => {
      console.log("what is local storage" + localStorage.getItem('jwtToken'));
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
          this.props.history.push("/login")
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
          {/* <!-- Here we capture the Start Year Parameter--> */}
          <div className="form-group">
            <label>email:</label>
            <input type="text" className="form-control"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
          </div>
          {/* <!-- Here we capture the End Year Parameter --> */}
          <div className="form-group">
            <label>password(6+):</label>
            <input type="password" className="form-control"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
          </div>
          <div className="form-group">
            <input type="radio" name="isDonor" value="true" onChange={this.updateUserSignup} /> Donor<br/>
          </div>
          {/* <!-- Here we have our final submit button --> */}
          <button onClick={this.createUser} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Create Account</button>
        </form>
        </div>
      );
    }
  }
  
  export default SignUp;