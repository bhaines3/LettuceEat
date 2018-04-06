import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import DonorProfile from "./pages/DonorProfile";
import NonProfitProfile from "./pages/NonProfitProfile";
import Nav from "./components/Nav";
import Card from "./components/Card";
const App = () => (
  <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/donor/:id" component={DonorProfile} />
          <Route exact path="/nonprofit/:id" component={NonProfitProfile} />
        </Switch> 
      </div>
    
  </Router>
);

export default App;


