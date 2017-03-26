// @flow
import React, {Component} from 'react';
import Sidebar from './Sidebar'
import getGraylogApi from '../helpers/GetGraylogApi';
import {streamsDb} from '../helpers/Datastore';
import StreamDashboard from './StreamDashboard';
import styles from './Common.css';

export default class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'waiting-' + props.streamId,
            data: false,
            streamInfo: false,
            graylogApi: null
        };
        this.fetchStreamInfo();
    }

    fetchStreamInfo() {
        console.log(this.props);
        let _this = this;
        streamsDb.loadDatabase(function (err) {
            streamsDb.findOne({ _id: _this.props.streamId }, function (err, doc) {
                _this.state.streamInfo = doc.stream;

                console.log(doc);
                console.log("State", _this.state);

                let graylogApi = getGraylogApi(
                    doc.stream.credentials.uri,
                    doc.stream.credentials.username,
                    doc.stream.credentials.password);

                _this.state.graylogApi = graylogApi;

                graylogApi.getStream(null, { // path
                    streamId: doc.stream.info.id
                }, function (err, data) { // callback
                    if (!err) {
                        console.log(data);
                        _this.setState({
                            key: 'loaded-' + _this.props.streamId,
                            streamInfo: data
                        });
                    } else {
                        console.log("Error fetching stream", err);
                    }
                });
            });
        });



    }

    render() {
        console.log('rendering key ' + this.state.key);
        let streamOutput;
        if (this.state.streamInfo) {
            streamOutput = <StreamDashboard
                streamId={this.props.streamId}
                streamInfo={this.state.streamInfo}
                graylogApi={this.state.graylogApi}
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
                                    <div className="padded">
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
