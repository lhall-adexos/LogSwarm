// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import Sidebar from './Sidebar'
import StreamForm from './form/StreamForm';
import styles from './Common.css';

export default class NewStream extends Component {
    render() {
        return (
            <div>
                <div className={styles.container} data-tid="container">
                    <div className="window">
                        <div className="window-content">
                            <div className="pane-group">
                                <Sidebar/>
                                <div className="pane">
                                    <div className="padded-more">
                                        <h1>Add a stream</h1>

                                        <StreamForm/>
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
