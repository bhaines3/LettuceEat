import React, { Component } from 'react';
import { Link } from "react-router-dom";



class AboutUs extends Component {


render() {
    return (

        <div className="container">
            <div className="jumbotron mt-4 my-3 text-primary text-center rounded">
                <h1 className="display-3">LettuceEAT</h1>
                <h3 className="lead">Reducing food waste one bite at a time!</h3>
            </div>
            <div className=" row statImg mx-auto">
                <div className="col-6">
                <div className="card border-primary mb-3">
                    <div className="card-header bg-primary">OUR STORY</div>
                    <div className="card-body">
                        {/* <h4 className="card-title">Primary card title</h4> */}
                        <p className="card-text">Our team wanted to do a project that actually would make a difference in the real world. We threw around some different ideas but all came to a quick conclusion that it would be a great idea to help reduce some of the food waste here in the greater Tucson area. After doing some quick research, the numbers we found were staggering! According to an article written by The Swag, a 2012 report from the National Resources Defense Council (NRDC) revealed a long list of statistics that show just how big the food waste problem is in America, and some of the statistics are likely to shock you just like they shocked us! </p>
                        <ol>
                            <li>Americans throw away $165 billion of food each year.</li>
                            <li>40% of food is wasted in the United States every year.</li>
                            <li>35 million tons of food are wasted in the United States each year.</li>
                            <li>The average American household throws away $2,200 of food each year.</li>
                            <li>The average American throws away 300 lbs. of food per year.</li>
                            <li>More than 20 lbs. of food is wasted per person every month in the United States.</li>
                            <li>20% of food that the average American buys is never eaten.</li>
                            <li>90% of food is thrown away too soon.</li>
                            <li>Food waste in American has grown by 204% since 1960 and 50% since 1990.</li>
                            <li>Reducing food waste by just 15% would be enough to feed more than 25 million Americans every year.</li>
                        </ol>
                        <br/>
                        <p className="card-text">We feel this is a major problem so we decided to create an app called “LecttuceEAT” which connects local restaurants and/or businesses with a surplus of unsold food to non-profit organizations in the greater Tucson area. LettuceEAT aims to reduce food waste one bite at a time!</p>
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