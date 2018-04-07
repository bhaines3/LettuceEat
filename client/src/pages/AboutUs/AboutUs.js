import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./AboutUs.css";
import Nav from '../../components/Nav';
import Card from '../../components/Card';

class AboutUs extends Component {


render() {
    return (

        <div className="container">
            <div className="jumbotron my-3 text-center rounded">
                <h1 className="display-3">LettuceEAT</h1>
                <h3 className="lead">Reducing food waste one bite at a time!</h3>
            </div>
                <Card>

                </Card>
                <br />
        </div>
            )};
  }
  

export default AboutUs;