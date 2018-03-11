import React, { Component } from "react";
import axios from 'axios';
 
class Registration extends Component {
    constructor (props) {
        super(props);
        
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
        this.state = {
            login: '',
            password: '',
            passwordConfirmation: ''
        };
    }

    handleLoginChange (e) {
        this.setState({login: e.target.value});
    }
    
    handlePasswordChange (e) {
        this.setState({password: e.target.value});
    }
    
    handlePasswordConfirmationChange (e) {
        this.setState({passwordConfirmation: e.target.value});
    }
    
    passwordsMatch () {
        return this.state.password === this.state.passwordConfirmation;
    }
    
    handleFormSubmit (e) {
        console.log(this.state);
        axios.post(`/api/registration`, {
            login: this.state.login,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
        });
    }

    render() {
        const login = this.state.login;
        const password = this.state.password;
        const passwordConfirmation = this.state.passwordConfirmation;
        
        let message = '';
        let isNotValid = !this.passwordsMatch();
        
        if (!this.passwordsMatch()) {
            message = 'Passwords don\'t match';
        }
        
        return (
          <div>
            <h2>Register</h2>
            <p>{message}</p>
            <input value={login} 
                   onChange={this.handleLoginChange} 
                   type="text" 
                   placeholder="Email"/>
            <input value={password} 
                   onChange={this.handlePasswordChange} 
                   type="password"
                   placeholder="Password"/>
            <input value={passwordConfirmation} 
                   onChange={this.handlePasswordConfirmationChange} 
                   type="password"
                   placeholder="Confirm password"/>
            <input onClick={this.handleFormSubmit} disabled={isNotValid} value="Register" type="submit"/>
          </div>
        );
    }
}
 
export default Registration;
