// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
// This module is currently broken : https://github.com/kolomiichenko/graylog-api/pull/11
import graylog from 'graylog-api';

export default class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: new Date().getTime(),
            streamData: props.streamData,
            clusterInfo: props.clusterInfo,
            clusterStats: {}
        };

        var _this = this;

        var dummyAnchor = document.createElement('a');
        dummyAnchor.href = props.streamData.uri;
        var port;
        if (dummyAnchor.port != '') {
            port = dummyAnchor.port;
        } else {
            if (dummyAnchor.protocol == 'https:') {
                port = 443;
            }
        }

        var api = graylog.connect({
            basicAuth: {
                username: props.streamData.username,
                password: props.streamData.password
            },
            protocol: dummyAnchor.protocol.replace(':', ''),
            host: dummyAnchor.hostname,
            port: port,
            path: dummyAnchor.pathname
        });
        api.getClusterStats(function(err, data) { // callback
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                _this.setState({
                    clusterStats: data
                });
            }
        });
    }

    render() {

        // @see https://isabelcastillo.com/error-info-messages-css
        // @todo make components
        let successMessage = '';
        if (this.state.streamData.streamJustCreated) {
            // @todo update database
            this.state.streamData.streamJustCreated = false;
            successMessage = <div className="msg-success">
                <i className="fa fa-check"></i>
                Graylog stream was successfully created !
            </div>;
        }

        return (
            <div id={'stream-' + this.props.streamId} className="stream-dashboard" key={'last-updated-' + this.state.updated}>
                {successMessage}
                <h1>Stream {this.props.streamData.stream}</h1>
                <h3>Cluster health : {this.state.clusterInfo.lb_status}</h3>
                <p>This is a stream</p>
            </div>
        );
    }
}
