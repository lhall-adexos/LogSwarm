// @flow
import React, {Component} from 'react';
import Router, {Link} from 'react-router';
import Sidebar from './Sidebar'
import request from 'request';
import {streamsDb} from '../helpers/Datastore';
import StreamDashboard from './StreamDashboard';
import styles from './Common.css';

export default class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'waiting-' + props.streamId,
            streamData: false,
            clusterInfo: false
        };
        this.fetchClusterInfo();
    }

    fetchClusterInfo() {
        let _this = this;
        streamsDb.loadDatabase(function (err) {
            streamsDb.findOne({ _id: _this.props.streamId }, function (err, doc) {
                _this.state.streamData = doc.data;

                request(_this.state.streamData.uri + 'cluster', {
                    'auth': {
                        'user': _this.state.streamData.username,
                        'pass': _this.state.streamData.password
                    },
                    'json': true
                },function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body); // Print the HTML for the Google homepage.

                    let clusterInfo = {};
                    console.log('Requesting rendering for stream ' + _this.state.streamData.stream);
                    if (body != undefined) {
                        clusterInfo = body[Object.keys(body)[0]];
                        _this.setState({
                            key: 'loaded-' + _this.props.streamId,
                            clusterInfo: clusterInfo
                        });
                    } else {
                        _this.setState({
                            key: 'error-' + _this.props.streamId,
                            clusterInfo: clusterInfo
                        });
                    }
                });
            });
        });



    }

    render() {
        console.log('rendering key ' + this.state.key);
        let streamOutput;
        if (this.state.streamData) {
            streamOutput = <StreamDashboard
                streamId={this.props.streamId}
                streamData={this.state.streamData}
                clusterInfo={this.state.clusterInfo}
            />
        }

        return (
            <div>
                <div className={styles.container} data-tid="container">
                    <div className="window">
                        <div className="window-content">
                            <div className="pane-group">
                                <Sidebar/>
                                <div className="pane" key={'stream-' + this.state.key}>
                                    <div className="padded-more">
                                        {streamOutput}
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
