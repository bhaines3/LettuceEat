import React, { Component } from 'react';
import API from "./../utils/API";


class ModalViewInterested extends Component {
    state = {
        nonProfitsInterested: []
    };

    componentDidMount() {
        API.findOneFoodPost(this.props.foodId)
            .then(res => { this.setState({ nonProfitsInterested: res.data.NonProfits }) })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="modal fade" id={"modal-allinterested" + this.props.foodId} tabIndex={-1} role="dialog" aria-labelledby="viewAllInterested" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewAllInterested">Organizations Interested in This Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.nonProfitsInterested && this.state.nonProfitsInterested.length ? (
                                this.state.nonProfitsInterested.map(nonProfit => (
                                    <div>
                                        <a href={"/nonprofitprofile/" + nonProfit.id}>{nonProfit.name}</a>
                                        <a href={"mailto:" + nonProfit.email} className="btn btn-primary text-white float-right">Email</a>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                    <h3>No organizations have marked that they are interested</h3>
                                )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalViewInterested;