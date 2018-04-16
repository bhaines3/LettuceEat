import React, { Component } from 'react';
import API from "./../utils/API";
class InterestBtn extends Component {
    state =
        {
            foodId: "",
            nonProfitId: "",
            alreadyInterested: false
        };

    componentDidMount() {
        this.setState({ nonProfitId: this.props.nonProfitId })
        API.findOneFoodPost(this.props.foodId)
            .then(res => { this.setState({ foodId: res.data.id }) })
            .catch(err => console.log(err));
        API.findOneNonProfit(this.props.nonProfitId)
            .then(res => {
                let foodIdArray = res.data.FoodPosts.map(foodPost => foodPost.id)
                if (foodIdArray.includes(parseInt(this.props.foodId, 10))) {
                    this.setState({ alreadyInterested: true })
                }
                else {
                    this.setState({ alreadyInterested: false })
                }
            })

    }

    addInterest = () => {
        let addTogether = {
            foodId: this.state.foodId,
            nonProfitId: this.state.nonProfitId
        }
        API.addPostInterest(addTogether)
            .then(res => { window.location.reload(); })
            .catch(err => console.log(err))
    }

    removeInterest = () => {
        let removeThese = {
            foodId: this.state.foodId,
            nonProfitId: this.state.nonProfitId
        }
        API.removePostInterest(removeThese)
            .then(res => { window.location.reload(); })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {(this.state.alreadyInterested) ? (
                    <button className="delete-btn btn btn-danger float-right interestedBtn" onClick={this.removeInterest}>
                        Remove Interest
        </button>
                ) : (
                        <button className="delete-btn btn btn-danger float-right interestedBtn" onClick={this.addInterest}>
                            Interested
        </button>
                    )}
            </div>
        )
    }
};

export default InterestBtn;