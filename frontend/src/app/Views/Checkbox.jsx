import React, { Component } from "react";
import _ from 'lodash';
import css from "./../styles/checkbox.css";

const styles = css.locals;

class Checkbox extends Component {
    
    componentWillMount() {
        const id = _.uniqueId("checkbox_");
        this.setState({id: id});
    }
    
    render () {
        return (
            <div className={styles.container}>
                <input id={this.state.id}
                       checked={this.props.checked}
                       onChange={this.props.onChange}
                       type="checkbox" 
                       className={styles.checkbox} />
                <label htmlFor={this.state.id}>{this.props.label}</label>
            </div>
        );
    }
}
 
export default Checkbox;
