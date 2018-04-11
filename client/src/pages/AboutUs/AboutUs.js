import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./AboutUs.css";



class AboutUs extends Component {


render() {
    return (

        <div className="container">
            <div className="jumbotron my-3 text-primary text-center rounded">
                <h1 className="display-3">LettuceEAT</h1>
                <h3 className="lead">Reducing food waste one bite at a time!</h3>
            </div>
            <div className=" row statImg mx-auto">
                <div className="col-6">
                <div className="card border-primary mb-3">
                    <div className="card-header bg-primary">OUR STORY</div>
                    <div className="card-body">
                        {/* <h4 className="card-title">Primary card title</h4> */}
                        <p className="card-text">Did you know that according to USDA’s Economic Research Service, the US wastes 30-40% of its food supply?! That’s over 133 BILLION pounds of food each year!  To help alleviate this problem, LettuceEAT connects local restaurants and/or businesses with a surplus of unsold food to non-profit organizations in the greater Tucson area. LettuceEAT aims to reduce food waste one bite at a time!</p>
                    </div>
                </div>
                </div>
                <div className="col-6">
                    <img src="http://www.theswagusa.com/wp-content/uploads/2017/04/Food-Waste-in-America-Infographic-The-Swag-USA.png" className="img-fluid" alt="Food Waste Statistics" />
                </div>
            </div>   
            <br />
       </div>
        
            
            )};
  }
  

export default AboutUs;