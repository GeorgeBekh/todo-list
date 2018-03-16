import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import User from '../Models/User.js';
 
class Login extends Component {

    constructor (props) {
        super(props);

        this.state = {
            login: '',
            password: '',
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
        
        this.props.user.authenticate(this.state.login, this.state.password, onSuccess, onFailure);
    }

    isValid () {
        let fieldsNotEmpty = this.state.login && this.state.password;
        
        return fieldsNotEmpty;
    }

    render () {
        const redirect = this.state.successful ? <Redirect push to='/'/> : '';
        let message = '';
        switch (this.state.errorCode) {
            case 'wrongCredentials':
                message = 'Wrong login or password';
                break;
            case '':
                break;
            default:
                message = 'Unknown error';
        }

        return (
          <div>
            <h2>Login</h2>
            <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                <p>{message}</p>
                <input onChange={this.handleInput} 
                       type="email"
                       name="login"
                       placeholder="Email" />
                <input onChange={this.handleInput} 
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
