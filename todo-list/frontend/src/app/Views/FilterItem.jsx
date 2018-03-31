import React, { Component } from "react";
import css from "./../styles/filter-item.css";

const styles = css.locals;

class FilterItem extends Component {

    constructor (props) {
	super(props);
	this.onClick = this.onClick.bind(this);
    }

    onClick () {
	this.props.onChange(this.props.value);
    }

    render () {
        return (
	    <label onClick={this.onClick}
		   className={styles.item + " "  + (this.props.active ? styles.active : '') }>
              {this.props.label}
	    </label>
        );
    }
}

export default FilterItem;
