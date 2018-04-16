import React, { Component } from "react";
import API from "../../components/utils/API";
import FoodCard from '../../components/FoodCard';
import ProfileJumbotron from '../../components/ProfileJumbotron';
import ModalAddPost from '../../components/Modals/ModalAddPost';

class DonorProfile extends Component {
    state = {
        donor: [],
        foodposts: [],
        redirect: false
    };
    componentWillMount() {
        //ANYBODY CAN SEE DONOR PROFILE NO NEED FOR BELOW
        // const donor=localStorage.getItem("isDonor");
        // console.log("donor b4 donrspg " +donor);
        // if(donor==="false" || donor==null ){
        //     console.log("donor in check donrspg " +donor)
        //    return this.setState({
        //         redirect:true
        //     })
        // }
    }
    componentDidMount() {
        //What is the purpose of this? -Michelle
        const donorId = localStorage.getItem("donorId");
        const idAllDonorsPg = this.props.match.params.id;
        if (donorId !== idAllDonorsPg) {

            this.getDonorInfo(idAllDonorsPg);
        }
        else {
            this.getDonorInfo(donorId);
        }

    }

    getDonorInfo = (donorId) => {
        API.findOneDonor(donorId)
            .then(res => { this.setState({ donor: res.data }) })
            .catch(err => console.log(err));

        API.filterFoodPostsByDonor(donorId)
            .then(res => { console.log(res.data); this.setState({ foodposts: res.data }) })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="container">
                <ProfileJumbotron
                    name={this.state.donor.name}
                    address={this.state.donor.location}
                    phonenumber={this.state.donor.phonenumber}
                    email={this.state.donor.email}
                    summary={this.state.donor.summary || null}
                    isDonor={true}
                    paramsId={this.props.match.params.id}
                />

                {(localStorage.getItem("donorId") === this.props.match.params.id) ? (
                    <a href="" className="btn btn-primary text-white" data-toggle="modal" data-target="#modal-addpost">Add New Post</a>
                ) : ("")}
                {this.state.foodposts && this.state.foodposts.length ? (
                    this.state.foodposts.map(FoodPost => (
                        <div>
                            <FoodCard
                                key={FoodPost.id}
                                foodId={FoodPost.id}
                                title={FoodPost.title}
                                desc={FoodPost.desc}
                                pickupdate={FoodPost.pickupdate}
                                pickupwindow={FoodPost.pickupwindow}
                                donorId={this.props.match.params.id}
                            >
                            </FoodCard>
                            <br />
                        </div>
                    ))
                ) : (
                        <h3>No Food Posts</h3>
                    )}
                <br />
                <br />
                <ModalAddPost donorId={this.state.donor.id} />
            </div>
        )
    }
}

export default DonorProfile;