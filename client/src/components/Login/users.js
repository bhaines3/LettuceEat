import React,{ Component }  from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from "../utils/API.js"

class Users extends Component {
    state = {
       users:[]
    }
    componentDidMount = () => {
        //returns the users jwt token.
        console.log("what is local storage" + localStorage.getItem('jwtToken'));
        //what is the purpose of this below? this is where im sending my to ken to the header
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
       
        // API.findAllusers()
        //   .then(res => {
        //     this.setState({ users: res.data });
            
        //   })
        //   .catch((error) => {
        //       console.log("users error front end" + error);
        //     if(error.response.status === 401) {
        //       this.props.history.push("/login");
        //     }
        //   });
      
    }; 
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        //console.log("what is my token after signout"+localStorage.getItem('jwtToken'))
        this.props.history.push("/");
       
    }
    render() {
        return (
            <div className="container" id="logoutbtn">
            {this.state.users.map(user=>(
                <div>{user.email}</div>
            ))}
                <button onClick={this.Logout} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Logout</button>
            </div>
        )
    }
}
export default Users;