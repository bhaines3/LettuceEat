import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// DO NOT USE, these are just references from other activities
// import Articles from "./pages/Articles";
// import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "./components/Jumbotron";
// import API from "./utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "./components/Grid";
// import { List, ListItem } from "./components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

const App = () => (
  <Router>
    <div>
      <Switch>
      {/* <Route exact path="/" component={Books} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;