import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TodoItem from "./TodoItem.jsx";
import User from "../Models/User.js";
import TodoListModel from "../Models/TodoListModel.js";
import TodoListNetworkStorage from "../Models/TodoListNetworkStorage.js";
 
class TodoList extends Component {

    constructor (props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);

        this.model = new TodoListModel();
        this.networkStorage = new TodoListNetworkStorage(this.props.user);

        this.model.subscribe((() => this.forceUpdate()).bind(this)); //TODO: how to do it "The React Way"?
        this.model.subscribe(this.networkStorage.onChangeCallback);

        this.networkStorage.getItems((items => {
            this.model.init(items);
            this.setState({pending: false});
        }).bind(this));

        this.state = {
            pending: true,
            newTodo: '',
            filter: 'all'
        };
    }

    handleItemToggle (item) {
        this.model.toggle(item);
    }

    handleItemDelete (item) {
        this.model.delete(item);
    }

    handleInput (e) {
        this.setState({newTodo: e.target.value});
    }

    handleCheckAll (e) {
        this.model.setAll(e.target.checked);
    }
    
    handleFilterChange (e) {
        this.setState({filter: e.target.value});
    }

    handleKeyPress (e) {
        if(e.key !== 'Enter'){
            return;
        }

        let value = this.state.newTodo.trim();
        if (value) {
            this.model.add(value);
            this.setState({newTodo: ''});
        }
    }

    render() {
        let redirect = this.props.user.isAuthenticated() ? '' : <Redirect push to='/login'/> ;
        let list = [];
        let items = this.model.getItems(this.state.filter);

        for (var i=0; i < items.length; i++) {
            let item = items[i];
            list.push(
                <TodoItem key={i}
                          item={item} 
                          onToggle={this.handleItemToggle.bind(this, item)}
                          onDelete={this.handleItemDelete.bind(this, item)} />
            );
        } 

        return (
          <div>
            <h2>TODO-List</h2>
            <div>
                <input type="checkbox" checked={this.model.allChecked()} onChange={this.handleCheckAll} />
                <input type="text" 
                       value={this.state.newTodo}
                       onChange={this.handleInput}
                       onKeyPress={this.handleKeyPress} 
                       disabled={this.state.pending} />
            </div>
            {list}
            <div>
                <label>
                    <input type="radio" 
                           name="filter" 
                           value="all" 
                           onClick={this.handleFilterChange} />
                    All
                </label>
                <label>
                    <input type="radio" 
                           name="filter"
                           value="unchecked"
                           onClick={this.handleFilterChange} />
                    Active
                </label>
                <label>
                    <input type="radio" 
                           name="filter" 
                           value="checked"
                           onClick={this.handleFilterChange} />
                    Completed
                </label>
            </div>
            {redirect}
          </div>
        );
    }
}
 
export default TodoList;
