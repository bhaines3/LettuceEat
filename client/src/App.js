import React,{ Component }  from "react";
import API from "./components/utils/API";
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

//===CODE BELOW HERE SHOULD ONLY BE ADJUSTED BY BRANDON OR MICHELLE.
//===THIS SHOULD SOMEWHAT REFLECT FUTURE PURPOSE OF APP.JS. PERLA,
//===YOU SHOULD MOVE YOUR CODE TO HOME.JS WHEN BRANDON IS DONE WITH IT.


// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import DonorProfile from "./pages/DonorProfile";

// const App = () => (
//   <Router>
//     <div>
//       <Switch>
//         <Route exact path="/donor/:id" component={DonorProfile} />
//       </Switch>
//     </div>
//   </Router>
// );

export default App;


