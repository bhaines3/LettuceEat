import React,{ Component }  from "react";
//mport API from "./components/utils/API";
import SignUp from "./components/SignUp/signup.js";
class App extends Component {
    state = {
      email:"",
      password:"" 
    };
    
    updateUserlogin = event => {
      // Destructure the name and value properties off of event.target
      // Update the appropriate state
      const  {name, value}  = event.target;
      this.setState({
        [name]: value
      });
    }; 
    render() {
      return (
        <div className="container">
          <div className="container" id="loginContainer">
          <form id="loginform">
            <div className="form-group">
              <label>email:</label>
              <input type="text" className="form-control"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
            </div>
            <div className="form-group">
              <label>password(6+):</label>
              <input type="password" className="form-control"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
            </div>
            <button onClick={this.login} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Login</button>
          </form>
          </div>
          <SignUp/>
        </div>
      )
    }
}
  export default App;


