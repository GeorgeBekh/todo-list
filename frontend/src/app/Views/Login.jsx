import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import User from '../Models/User.js';
 
class Login extends Component {

    constructor (props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
        this.state = {
            login: '',
            password: '',
            successful: undefined
        };
    }

    handleChange (e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    
     isValid () {
        let fieldsNotEmpty = this.state.login && this.state.password;
        
        return fieldsNotEmpty;
    }
    
    handleFormSubmit (e) {
        e.preventDefault();
        
        let onSuccess = () => {
            this.setState({successful: true});
        };
        let onFailure = () => {
            this.setState({successful: false});
        };
        
        this.props.user.authenticate(this.state.login, this.state.password, onSuccess, onFailure);
    }

    render() {
        const redirect = this.state.successful ? <Redirect push to='/'/> : '';

        return (
          <div>
            <h2>Login</h2>
            <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                <input onChange={this.handleChange} 
                       type="email"
                       name="login"
                       placeholder="Email" />
                <input onChange={this.handleChange} 
                       type="password"
                       name="password" 
                       placeholder="Password" />
                <input disabled={!this.isValid()} value="Login" type="submit"/>
            </form>
            {redirect}
          </div>
        );
    }
}
 
export default Login;
