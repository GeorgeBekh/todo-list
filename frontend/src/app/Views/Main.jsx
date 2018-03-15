import React, { Component } from 'react'
import { BrowserRouter, Route, Link, IndexRoute, NavLink, browserHistory } from 'react-router-dom'
import TodoList from "./TodoList.jsx";
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import User from "./../Models/User.js";
 
class Main extends Component {
    
    constructor (props) {
        super(props);
        this.user = new User();
    }

    render() {
      return (
        <BrowserRouter>
          <div>
            <h1>Simple SPA</h1>
              <ul className="header">
                <li><NavLink to="/">Todo</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/registration">Registration</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" render={props => <TodoList user={this.user} />} />
                <Route path="/login" render={props => <Login user={this.user} />}/>
                <Route path="/registration" render={props => <Registration user={this.user} />}/>
              </div>
          </div>
        </BrowserRouter>
      );
    }
}
 
export default Main;
