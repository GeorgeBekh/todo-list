import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import User from '../Models/User.js';
import css from "./../styles/forms.css";

const forms = css.locals;

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
        let error = '';
        switch (this.state.errorCode) {
            case 'wrongCredentials':
                error = 'Wrong login or password';
                break;
            case '':
                break;
            default:
                error = 'Unknown error';
        }
        
        let message = error ? <div className={[forms.error, forms.element].join(" ")}>{error}</div> : '';

        return (
          <div>
            <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                <h2>Login</h2>
                {message}
                <input className={forms.element}
                       onChange={this.handleInput} 
                       type="email"
                       name="login"
                       placeholder="Email" />
                <input className={forms.element}
                       onChange={this.handleInput} 
                       type="password"
                       name="password" 
                       placeholder="Password" />
                <input className={[forms.element, forms.submit].join(' ')}
                       disabled={!this.isValid()}
                       value="Login"
                       type="submit"/>
            </form>
            {redirect}
          </div>
        );
    }
}
 
export default Login;
