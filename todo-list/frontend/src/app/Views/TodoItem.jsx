import React, { Component } from "react";
import Checkbox from "./Checkbox.jsx";
import css from "./../styles/to-do-list.css";

const styles = css.locals;

class TodoItem extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        const item = this.props.item;
        return (
          <div className={styles.item}>
            <Checkbox onChange={this.props.onToggle} checked={item.checked}/>
            <span className={styles.itemText}>{item.title}</span>
            <div className={styles.closeButton} onClick={this.props.onDelete}>
                <div>×</div>
            </div>
          </div>
        );
    }
}
 
export default TodoItem;
