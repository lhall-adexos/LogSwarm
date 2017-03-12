// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './StreamButton.css';
import image from '../../images/circle-dashed.svg';

export default class NewStreamButton extends Component {

    render() {
        return <Link className={styles['stream'] + ' ' + 'new-stream'} to="/newStream">
            <img src={image}/>
            <span>+</span>
        </Link>;
    }
}