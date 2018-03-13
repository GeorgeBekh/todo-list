import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import store from 'store2';
 
class Login extends Component {

    constructor (props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
        this.state = {
            login: '',
            password: '',
            valid: false,
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
        
        axios.post(`/api/login`, {
            login: this.state.login,
            password: this.state.password
        })
        .then(response => {
            let successful = response.status === 200;
            this.setState({successful: successful});
            
            if (!successful) {
                return;
            }

            store.session('user', response.data);
        });
    }

    render() {
        const login = this.state.login;
        const password = this.state.password;
        const redirect = this.state.successful ? <Redirect push to='/'/> : '';

        return (
          <div>
            <h2>Login</h2>
            <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                <input value={login} 
                       onChange={this.handleChange} 
                       type="email"
                       name="login"
                       placeholder="Email" />
                <input value={password} 
                       onChange={this.handleChange} 
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
