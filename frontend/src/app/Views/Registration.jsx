import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import User from '../Models/User.js';
 
class Registration extends Component {

    constructor (props) {
        super(props);
        
        this.state = {
            login: '',
            password: '',
            passwordConfirmation: '',
            successful: undefined,
            errorCode: ''
        };
        
        this.handleInput = this.handleInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInput (e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    
    handleFormSubmit (e) {
        e.preventDefault();

        let onSuccess = () => {
            this.setState({successful: true});
        };
        let onFailure = errorCode => {
            this.setState({
                successful: false,
                errorCode: errorCode
            });
        };
        
        this.props.user.register(this.state.login, this.state.password, onSuccess, onFailure);
    }
    
    isValid () {
        let fieldsNotEmpty = this.state.login && this.state.password && this.state.passwordConfirmation;
        let passwordsMatch = this.state.password === this.state.passwordConfirmation;
        let emailValid = (/^.+@.+/).test(this.state.login);
        
        return passwordsMatch && emailValid && fieldsNotEmpty;
    }

    render () {
        const redirect = this.state.successful ? <Redirect push to='/login'/> : '';
        let message = '';
        switch (this.state.errorCode) {
            case 'userExists':
                message = 'User already exists';
                break;
            case '':
                break;
            default:
                message = 'Unknown error';
        }

        return (
          <div>
            <h2>Register</h2>
            <p>{message}</p>
            <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                <input onChange={this.handleInput} 
                       type="email"
                       name="login"
                       placeholder="Email"/>
                <input onChange={this.handleInput} 
                       type="password"
                       name="password"
                       placeholder="Password"/>
                <input onChange={this.handleInput} 
                       type="password"
                       name="passwordConfirmation"
                       placeholder="Confirm password"/>
                <input disabled={!this.isValid()} value="Register" type="submit"/>
            </form>
            {redirect}
          </div>
        );
    }
}
 
export default Registration;
