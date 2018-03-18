import React, { Component } from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import TodoList from "./TodoList.jsx";
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import User from "./../Models/User.js";
import styles from "./../styles/main.css";
console.log(styles);
class Main extends Component {

    constructor (props) {
        super(props);
        this.user = new User();
    }

    render () {
      return (
        <BrowserRouter>
          <div>
            <h1 className={styles.locals.header}>Simple SPA</h1>
            <a href="https://github.com/GeorgeBekh/todo-list" target="_blank">Source code</a>
            <h2>Routes</h2>
              <ul>
                <li><Link to="/">Todo</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registration">Registration</Link></li>
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
