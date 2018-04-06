import React,{ Component }  from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from "../utils/API.js"

class Users extends Component {
    state = {
       users:[]
    }
    componentDidMount = () => {
        console.log(axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken'));
       
        API.findAllusers()
          .then(res => {
            this.setState({ users: res.data });
            console.log(this.state.users);
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.props.history.push("/login");
            }
          });
      
    }; 
    Logout=event=>{
        localStorage.removeItem('jwtToken');
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