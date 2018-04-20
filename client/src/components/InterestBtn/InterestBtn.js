import React, { Component } from 'react';
import API from "./../utils/API";

//non profits interested in donation post
class InterestBtn extends Component {
    state =
        {
            alreadyInterested: false
        };

    componentDidMount() {
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
            foodId: this.props.foodId,
            nonProfitId: this.props.nonProfitId
        }
        API.addPostInterest(addTogether)
            .then(res => { window.location.reload(); })
            .catch(err => console.log(err))
    }

    removeInterest = () => {
        let removeThese = {
            foodId: this.props.foodId,
            nonProfitId: this.props.nonProfitId
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