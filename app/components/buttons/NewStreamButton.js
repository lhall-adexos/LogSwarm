// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './NewStreamButton.css';

export default class NewStreamButton extends Component {

    render() {
        return <Link className={styles['add-stream']} to="/newStream">
            <img src="images/circle-blank.svg"/>
            <span>+</span>
        </Link>;
    }
}