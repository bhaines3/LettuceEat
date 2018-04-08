import React,{ Component }  from "react";
import axios from 'axios';
//import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

class Login extends Component {
    state = {
        emailLogin:"",
        passwordLogin:""
    }
    
    updateUserlogin = event => {
      // Destructure the name and value properties off of event.target
      // Update the appropriate state
      const  {name, value}  = event.target;
      this.setState({
        [name]: value
      });
    }; 
    Login=event=>{
        event.preventDefault();
        const userInfo={
            email:this.state.emailLogin,
            password:this.state.passwordLogin
        }
        //making sure info is goin gto request
        console.log("im making the post request for login");
        console.log("im sending email "+ userInfo.email);
        console.log("im sending password " + userInfo.password);
    
        axios.post('/api/auth/login', userInfo)
        .then((result) => {
            //setting the jwt token when loginin result comes in"
            var token=result.data.token;
            localStorage.setItem('jwtToken',token);
            var decoded = jwt_decode(token);
            
            localStorage.setItem("isDonor",decoded.isDonor);
            localStorage.setItem("userId",decoded.id);
            console.log("token is sent to front end when user is found"+ result.data.jwtToken);

            //this.setState({mesage:""});
            this.props.history.push("/users");
        }).catch(error=>{
                this.setState({ message: 'Login failed. Username or password not match' });
        })
    }
    render() {
        return (
            <div className="container" id="loginContainer">
            {this.state.email}
                <form id="loginform">
                    <div className="form-group">
                    <label>email:</label>
                    <input type="text" className="form-control"  name="emailLogin" value={this.state.email} onChange={this.updateUserlogin} placeholder="janedoe@email.com"/>
                    </div>
                    <div className="form-group">
                    <label>password(6+):</label>
                    <input type="password" className="form-control"  name="passwordLogin" value={this.state.password} onChange={this.updateUserlogin} placeholder="******"/>
                    </div>
                    <button onClick={this.Login} type="submit" className="btn btn-default"><i className="fa fa-search"></i> Login</button>
                </form>
            </div>

        )
    }
}
export default Login;