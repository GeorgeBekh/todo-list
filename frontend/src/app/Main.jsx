import React, { Component } from 'react'
import { BrowserRouter, Route, Link, IndexRoute, NavLink } from 'react-router-dom'
import TodoList from "./TodoList.jsx";
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
 
class Main extends Component {
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
              <Route exact path="/" component={TodoList}/>
              <Route path="/login" component={Login}/>
              <Route path="/registration" component={Registration}/>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default Main;
