import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import User from "../Models/User.js";
import * as TodoListModel from "../Models/TodoList.js";
 
class TodoList extends Component {
    
    constructor (props) {
        super(props);
        
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
        this.state = {
        };
    }
    
    handleKeyPress (e) {
        if(e.key !== 'Enter'){
            return;
        }
        
        console.log(e.target.value);
        e.target.value = '';
    }
    
    render() {
        let redirect = User.isAuthenticated() ? '' : <Redirect push to='/login'/> ;
        
        return (
          <div>
            <h2>TODO-List</h2>
            <input type="text" onKeyPress={this.handleKeyPress}/>
            {redirect}
          </div>
        );
    }
}
 
export default TodoList;
