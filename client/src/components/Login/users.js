import React,{ Component }  from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from "../utils/API.js"

class Users extends Component {
    state = {
       users:[]
    }
    
    Logout=event=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("isDonor");
        localStorage.removeItem("userId");

        console.log("token after login" +localStorage.getItem('jwtToken'))
        this.props.history.push("/login");
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