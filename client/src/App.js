import React,{ Component }  from "react";
import API from "./utils/API";
//import axios from "axios";
class App extends Component {
  state = {
    name:"",
    email:"",
    isDonor:"im",
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
  createUser=()=>{
    const newUser={
      name:this.state.name,
      email:this.state.email,
      isDonor:false,
      phonenumber:this.state.phonenumber,
      password:this.state.password
    }
    //check first if user exists
    API.findUser(newUser.email).then((res)=>{
      //if user exists
      if(res.data.email){
        console.log("user exists choose another email")
      }
      //if user doesn not exist make new account
      else{
        API.createUser(newUser).then(()=>{
          console.log("user has been created");
        })
      }
    })
  }
  render() {
    return (
      <div className="container">
      {this.state.name}<br/>
      {this.state.email}<br/>
      {this.state.password}<br/>
      <form id="sign-up">
        <div className="form-group">
          <label>volunteer name or business name:</label>
          <input name= "name" onChange={this.updateUserSignup} value={this.state.articleSearch} type="text" className="form-control" placeholder="Jane Doe"/>
        </div>
        {/* <!-- Here we capture the Start Year Parameter--> */}
        <div className="form-group">
          <label>email:</label>
          <input type="text" className="form-control"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
        </div>
        {/* <!-- Here we capture the End Year Parameter --> */}
        <div className="form-group">
          <label>password:</label>
          <input type="password" className="form-control"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" className="form-control"  name= "phonenumber" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
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

export default App;

