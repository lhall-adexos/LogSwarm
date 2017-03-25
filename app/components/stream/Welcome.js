// @flow
import React, {Component} from 'react';
import styles from './Stream.css';

export default class Welcome extends Component {
    render() {
        return (
            <div className={style.welcome + ' msg-success'}>
                <h2>New stream successfully added !</h2>
            </div>
        );
    }
}
