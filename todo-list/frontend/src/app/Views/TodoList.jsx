import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TodoItem from "./TodoItem.jsx";
import User from "../Models/User.js";
import TodoListModel from "../Models/TodoListModel.js";
import TodoListNetworkStorage from "../Models/TodoListNetworkStorage.js";
import Checkbox from "./Checkbox.jsx";
import css from "./../styles/to-do-list.css";
import FilterItem from "./FilterItem.jsx";
const styles = css.locals;
 
class TodoList extends Component {

    constructor (props) {
        super(props);

        this.state = {
            userAuthenticated: undefined,
            newTodo: '',
            filter: 'all',
            pending: true
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentWillMount () {
        this.props.user.checkAuthentication(((isAuthenticated) => {
            this.setState({userAuthenticated: isAuthenticated});
        }).bind(this));

        this._initializeList();
    }
    
    _initializeList () {
        this.model = new TodoListModel();
        this.networkStorage = new TodoListNetworkStorage(this.props.user);

        this.model.subscribe((() => this.forceUpdate()).bind(this)); //TODO: how to do it "The React Way"?
        this.model.subscribe(this.networkStorage.onChangeCallback);

        this.networkStorage.getItems((items => {
            this.model.init(items);
            this.setState({pending: false});
        }).bind(this));
    }

    handleInput (e) {
        this.setState({newTodo: e.target.value});
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

    handleCheckAll (e) {
        this.model.setAll(e.target.checked);
    }

    handleFilterChange (filterName) {
        this.setState({filter: filterName});
    }

    handleItemToggle (item) {
        this.model.toggle(item);
    }

    handleItemDelete (item) {
        this.model.delete(item);
    }

    render () {
        let redirect = this.state.userAuthenticated === false ? <Redirect push to='/login'/> : '';
        let list = [];
        let items = this.model.getItems(this.state.filter);
	let value = '';
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
            <h2>To-Do List</h2>
            <div className={styles.item}>
                <Checkbox checked={this.model.allChecked()} 
                          onChange={this.handleCheckAll} />
                <input className={styles.input}
                       type="text" 
                       value={this.state.newTodo}
                       onChange={this.handleInput}
                       onKeyPress={this.handleKeyPress} 
                       disabled={this.state.pending} 
                       placeholder="Type and press Enter"/>
            </div>
            {list}
            <div className={styles.filterContainer}>
	      <FilterItem onChange={this.handleFilterChange}
			  value={value = 'all'}
			  active={this.state.filter === value}
			  label='All'
			  />
              <FilterItem onChange={this.handleFilterChange}
			  value={value = 'unchecked'}
			  active={this.state.filter === value}
			  label='Active'
			  />
	      <FilterItem onChange={this.handleFilterChange}
			  value={value = 'checked'}
			  active={this.state.filter === value}
			  label='Completed'
			  />
            </div>
            {redirect}
          </div>
        );
    }
}

export default TodoList;
