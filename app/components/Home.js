// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Common.css';
import Sidebar from './Sidebar'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className={styles.container} data-tid="container">
                    <div className="window">
                        <div className="window-content">
                            <div className="pane-group">
                                <Sidebar />
                                <div className="pane">
                                    <div className="padded-more">
                                        <h1>Welcome to LogSwarm !</h1>

                                        <p>
                                            Please add a new Graylog stream. Note that you will need the API credentials to fetch data.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
