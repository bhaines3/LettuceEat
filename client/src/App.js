import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import DonorProfile from "./pages/DonorProfile";
import NonProfitProfile from "./pages/NonProfitProfile";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AllDonors from "./pages/allDonors/allDonors";
import AllNonProfits from "./pages/allNonProfits/allNonProfits";

const App = () => (
    <Router>
        <div>
            <Nav/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/aboutus" component={AboutUs} />
                <Route exact path="/allDonors" component={AllDonors} />
                <Route exact path="/allNonProfits" component={AllNonProfits} />
                <Route exact path="/DonorProfile/:id" component={DonorProfile} />
                <Route exact path="/NonProfitProfile/:id" component={NonProfitProfile} />
            </Switch>
            <Footer />
        </div>
    </Router>
);

export default App;


