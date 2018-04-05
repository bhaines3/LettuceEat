import React,{ Component }  from "react";
import API from "../utils/API";
class SignUp extends Component {
    state = {
      name:"",
      email:"",
      isDonor:false,
      phonenumber:"",
      password:"" 
    };
    
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
      //console.log(newUser.email);
      //CHECK if user exists before creating a new account
      API.findOneuser(newUser).then((res)=>{
        //if user exists
        console.log(res.data);
        if(!res.data){
          API.createUser(newUser).then(()=>{
            console.log("user has been created");
          })
        }
        //if user doesnt not exist make new account
        else{
          console.log("user exists choose another email")
        }
      })
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