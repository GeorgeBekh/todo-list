import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink} from 'react-router-dom'
import TodoList from "./TodoList.jsx";
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import User from "./../Models/User.js";
import css from "./../styles/main.css";

const styles = css.locals;

class Main extends Component {

    constructor (props) {
        super(props);
        this.user = new User();
    }

    render () {
      return (
        <BrowserRouter>
            <div>
                <div className={styles.header}>
                    <NavLink className={styles.headerItem} 
                             activeClassName={styles.isActive} 
                             exact={true}
                             to="/">
                        To-Do List
                    </NavLink>
                    <NavLink className={styles.headerItem}
                             activeClassName={styles.isActive}
                             to="/login">
                        Login
                    </NavLink>
                    <NavLink className={styles.headerItem}
                             activeClassName={styles.isActive}
                             to="/registration">
                        Register
                    </NavLink>
                    <a className={[styles.headerItem, styles.sourceCode].join(" ")} 
                       href="https://github.com/GeorgeBekh/web-projects" 
                       target="_blank">
                       <img className={styles.icon} src='/img/github-icon.png'/>
                        Source code
                    </a>
                </div>
                <div className={styles.content}>
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
