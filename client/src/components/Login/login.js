import React,{ Component }  from "react";
import axios from 'axios';
//import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        emailLogin:"",
        passwordLogin:"",
        message:""
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
        console.log("im making the post request for login");
        console.log("im sending email "+ userInfo.email);
        console.log("im sending password " + userInfo.password);
        
        axios.post('/api/auth/login', userInfo)
        .then((result) => {
            localStorage.setItem('jwtToken', result.data.token);

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