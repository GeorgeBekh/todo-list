import React, { Component } from "react";
 
class TodoItem extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        const item = this.props.item;
        return (
          <div>
            <input type="checkbox" onChange={this.props.onToggle} checked={item.checked}/>
            <span>{item.title}</span>
            <button onClick={this.props.onDelete}>X</button>
          </div>
        );
    }
}
 
export default TodoItem;
