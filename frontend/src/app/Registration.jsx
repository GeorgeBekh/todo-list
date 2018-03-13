import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
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
            passwordConfirmation: '',
            successful: undefined
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
        axios.post(`/api/registration`, {
            login: this.state.login,
            password: this.state.password
        })
        .then(response => {
           this.setState({successful: response.status === 200});
        });
    }

    render() {
        const login = this.state.login;
        const password = this.state.password;
        const passwordConfirmation = this.state.passwordConfirmation;
        const redirect = this.state.successful ? <Redirect push to='/login'/> : '';
        
        let message = '';
        let isNotValid = !this.passwordsMatch();
        
        if (!this.passwordsMatch()) { //TODO: check on state change, set message to state
            message = 'Passwords don\'t match';
        }
        
        return (
          <div>
            <h2>Register</h2>
            <form autoComplete="on">
                <p>{message}</p>
                <input value={login} 
                       onChange={this.handleLoginChange} 
                       type="email"
                       name="email"
                       placeholder="Email"/>
                <input value={password} 
                       onChange={this.handlePasswordChange} 
                       type="password"
                       placeholder="Password"/>
                <input value={passwordConfirmation} 
                       onChange={this.handlePasswordConfirmationChange} 
                       type="password"
                       placeholder="Confirm password"/>
                <button onClick={this.handleFormSubmit} disabled={isNotValid} type="button">Regsiter</button>
            </form>
            {redirect}
          </div>
        );
    }
}
 
export default Registration;
