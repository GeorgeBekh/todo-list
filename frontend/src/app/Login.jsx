import React, { Component } from "react";
 
class Login extends Component {

    constructor (props) {
        super(props);
        
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
        this.state = {
            login: '',
            password: ''
        };
    }

    handleLoginChange (e) {
        this.setState({login: e.target.value});
    }
    
    handlePasswordChange (e) {
        this.setState({password: e.target.value});
    }
    
    handleFormSubmit (e) {
        console.log(this.state);
    }

    render() {
        const login = this.state.login;
        const password = this.state.password;
        return (
          <div>
            <h2>Login</h2>
            <input value={login} 
                   onChange={this.handleLoginChange} 
                   type="text" 
                   placeholder="email"/>
            <input value={password} 
                   onChange={this.handlePasswordChange} 
                   type="password"/>
            <input onClick={this.handleFormSubmit} value="Login" type="submit"/>
          </div>
        );
    }
}
 
export default Login;
