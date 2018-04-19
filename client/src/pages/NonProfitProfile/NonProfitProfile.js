import React, { Component } from "react";
import API from "../../components/utils/API";
import FoodCard from '../../components/FoodCard';
import ProfileJumbotron from '../../components/ProfileJumbotron';

class NonProfitProfile extends Component {
    state = {
        nonprofit: {},
        foodpost: [],
        donors: []
    };
    componentDidMount() {
        //Why does it matter which nonProfit is viewing the nonProfit page? -Michelle
        const nonProfitId = localStorage.getItem("nonProfitId");
        const idAllNonProfitsPg = this.props.match.params.id;
        console.log(nonProfitId);
        API.findAllDonors()
            .then(res => { this.setState({ donors: res.data }) })
            .catch(err => console.log(err));

        //What is the purpose of this? -Michelle
        if (nonProfitId !== idAllNonProfitsPg) {
            API.findOneNonProfit(idAllNonProfitsPg)
                .then(res => { this.setState({ nonprofit: res.data, foodpost: res.data.FoodPosts }) })
                .catch(err => console.log(err));
        }
        else {
            API.findOneNonProfit(nonProfitId)
                .then(res => { this.setState({ nonprofit: res.data, foodpost: res.data.FoodPosts }) })
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <ProfileJumbotron
                        name={this.state.nonprofit.name}
                        address={this.state.nonprofit.location}
                        phonenumber={this.state.nonprofit.phonenumber}
                        email={this.state.nonprofit.email}
                        summary={this.state.nonprofit.summary}
                        isDonor={false}
                        hoursForPickUp={this.state.nonprofit.hoursforpickup}
                        website={this.state.nonprofit.website}
                        paramsId={this.props.match.params.id}
                    >
                        <br />
                    </ProfileJumbotron>
                    <h3><u>Food Posts Interested In</u></h3>
                    {this.state.nonprofit.FoodPosts && this.state.nonprofit.FoodPosts.length ? (
                        this.state.nonprofit.FoodPosts.map(FoodPost => (
                            <div>
                                <FoodCard
                                    key={FoodPost.id}
                                    foodId={FoodPost.id}
                                    title={FoodPost.title}
                                    desc={FoodPost.desc}
                                    pickupdate={FoodPost.pickupdate}
                                    pickupwindow={FoodPost.pickupwindow}
                                    donorId={FoodPost.DonorId}
                                />
                                <br />
                            </div>
                        ))
                    ) : (
                            <div>
                                <br />
                                <h4>This organization has not marked interest in any food posts. Check back later!</h4>
                                <br />
                            </div>
                        )}
                </div>

            </div>
        )
    }
}

export default NonProfitProfile;