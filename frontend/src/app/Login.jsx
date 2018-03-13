import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import store from 'store2';
 
class Login extends Component {

    constructor (props) {
        super(props);
        
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
        this.state = {
            login: '',
            password: '',
            successful: undefined
        };
    }

    handleLoginChange (e) {
        this.setState({login: e.target.value});
    }
    
    handlePasswordChange (e) {
        this.setState({password: e.target.value});
    }
    
    handleFormSubmit (e) {
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
        const redirect = this.state.successful ? <Redirect push to='/login'/> : '';

        return (
          <div>
            <h2>Login</h2>
            <form autoComplete="on">
                <input value={login} 
                       onChange={this.handleLoginChange} 
                       type="email"
                       name="email"
                       placeholder="Email" />
                <input value={password} 
                       onChange={this.handlePasswordChange} 
                       type="password"
                       name="password" />
                <button onClick={this.handleFormSubmit} type="button">Login</button>
            </form>
           
          </div>
        );
    }
}
 
export default Login;
