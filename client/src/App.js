import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import DonorProfile from "./pages/DonorProfile";
import NonProfitProfile from "./pages/NonProfitProfile";
import Nav from "./components/Nav";
import AllDonors from "./pages/allDonors/allDonors";
import AllNonProfits from "./pages/allNonProfits/allNonProfits";
//import Card from "./components/Card";

// import Users from "./components/Login/users";
// import Login from "./components/Login/login";
//import SignUp from "./components/SignUp/signup";


const App = () => (
  <Router>

      <div>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/allDonors" component={AllDonors} />
          <Route exact path="/allNonProfits" component={AllNonProfits} />
          <Route exact path="/donor" component={DonorProfile} />
          <Route exact path="/NonProfitProfile" component={NonProfitProfile} /> 


          {/* for testing the routing */}
          {/*<Route exact path="/signup" component={SignUp} />*/}
          {/* <Route exact path="/users" component={Users} /> */}
          {/* //<Route exact path="/donor/:id" component={DonorProfile} />
          //<Route exact path="/nonprofit/:id" component={NonProfitProfile} /> */}
        </Switch> 
      </div>
    
  </Router>
);

export default App;


