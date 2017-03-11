// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './StreamButton.css';

export default class NewStreamButton extends Component {

    render() {
        return <Link className={styles['stream'] + ' ' + 'new-stream'} to="/newStream">
            <img src="./images/circle-dashed.svg"/>
            <span>+</span>
        </Link>;
    }
}