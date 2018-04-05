<<<<<<< HEAD
import React, { Component }  from "react";
import API from "./utils/API";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import User from './pages/User';
import Donor from './pages/Donor';
//import axios from "axios";
// class App extends Component {
//   state = {
//     name:"",
//     email:"",
//     isDonor:false,
//     phonenumber:"",
//     password:"" 
//   };
  
//   updateUserSignup = event => {
//     // Destructure the name and value properties off of event.target
//     // Update the appropriate state
//     const  {name, value}  = event.target;
//     this.setState({
//       [name]: value
//     });
//   };
//   createUser=(event)=>{
//     event.preventDefault();
//     const newUser={
//       name:this.state.name,
//       email:this.state.email,
//       isDonor:this.state.isDonor,
//       phonenumber:this.state.phonenumber,
//       password:this.state.password
//     }
//     console.log(newUser.name);
//     // //check first if user exists
//     // API.findUser(newUser.email).then((res)=>{
//     //   //if user exists
//     //   if(res.data.email){
//     //     console.log("user exists choose another email")
//     //   }
//     //   //if user doesn not exist make new account
//     //   else{
//         API.createUser(newUser).then(()=>{
//           console.log("user has been created");
//         })
//       //}
//     //})
//   }
//   render() {
//     return (
//       <div className="container">
//       {this.state.name}<br/>
//       {this.state.email}<br/>
//       {this.state.password}<br/>
//       {this.state.phonenumber}<br/>
//       {this.state.isDonor}

//       <form id="sign-up">
//         <div className="form-group">
//           <label>volunteer name or business name:</label>
//           <input name= "name" onChange={this.updateUserSignup} value={this.state.articleSearch} type="text" className="form-control" placeholder="Jane Doe"/>
//         </div>
//         <div className="form-group">
//           <label>Phone:</label>
//           <input type="text" className="form-control"  name= "phonenumber" value={this.state.phonenumber} onChange={this.updateUserSignup} placeholder="(555)555-5555"/>
//         </div>
//         {/* <!-- Here we capture the Start Year Parameter--> */}
//         <div className="form-group">
//           <label>email:</label>
//           <input type="text" className="form-control"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
//         </div>
//         {/* <!-- Here we capture the End Year Parameter --> */}
//         <div className="form-group">
//           <label>password(6+):</label>
//           <input type="password" className="form-control"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
//         </div>
//         <div className="form-group">
//           <input type="radio" name="isDonor" value="true" onChange={this.updateUserSignup} /> Donor<br/>
//         </div>
//         {/* <!-- Here we have our final submit button --> */}
//         <button onClick={this.createUser} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Create Account</button>
//       </form>
//       </div>
//     );
//   }
// }
class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <Nav />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donor" component={Donor} />
          <Route exact path="/user" component={User} />
        </Switch>
      </div>
    </Router>
    );
  }
}
=======
// import React,{ Component }  from "react";
// import API from "./components/utils/API";
// import SignUp from "./components/SignUp/signup.js";
// class App extends Component {
//     state = {
//       email:"",
//       password:"" 
//     };
    
//     updateUserlogin = event => {
//       // Destructure the name and value properties off of event.target
//       // Update the appropriate state
//       const  {name, value}  = event.target;
//       this.setState({
//         [name]: value
//       });
//     }; 
//     render() {
//       return (
//         <div className="container">
//           <div className="container" id="loginContainer">
//           <form id="loginform">
//             <div className="form-group">
//               <label>email:</label>
//               <input type="text" className="form-control"  name= "email" value={this.state.email} onChange={this.updateUserSignup} placeholder="janedoe@email.com"/>
//             </div>
//             <div className="form-group">
//               <label>password(6+):</label>
//               <input type="password" className="form-control"  name= "password" value={this.state.password} onChange={this.updateUserSignup} placeholder="******"/>
//             </div>
//             <button onClick={this.login} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Login</button>
//           </form>
//           </div>
//           <SignUp/>
//         </div>
//       )
//     }
// }

//===CODE BELOW HERE SHOULD ONLY BE ADJUSTED BY BRANDON OR MICHELLE.
//===THIS SHOULD SOMEWHAT REFLECT FUTURE PURPOSE OF APP.JS. PERLA,
//===YOU SHOULD MOVE YOUR CODE TO HOME.JS WHEN BRANDON IS DONE WITH IT.
//===IF YOU WANT TO ADD TO DATABASE, MAKE SURE THE BOTTOM IS COMMENTED OUT AND THAT THE CODE ABOVE THIS IS ACTIVE.
//===IF YOU WANT TO VIEW OTHER PAGES FOR NOW, MAKE SURE THE CODE ABOVE THIS IS COMMENTED OUT AND THAT THE CODE BELOW IS ACTIVE. THANKS!


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DonorProfile from "./pages/DonorProfile";
import NonProfitProfile from "./pages/NonProfitProfile";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/donor/:id" component={DonorProfile} />
        <Route exact path="/nonprofit/:id" component={NonProfitProfile} />
      </Switch>
    </div>
  </Router>
);
>>>>>>> d15ce8e1d0b6abb6b4ff0429109040bcb7125b52

export default App;


