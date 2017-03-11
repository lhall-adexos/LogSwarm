// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import request from 'request';
import {streamsDb} from '../helpers/Datastore';

export default class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamData: props.streamData,
            clusterInfo: props.clusterInfo
        };
    }



    render() {
        console.log(this.state.streamData);
        console.log(this.state.clusterInfo);
        return (
            <div id={'stream-' + this.props.streamId} className="stream-dashboard">
                <h1>Stream {this.props.streamData.stream}</h1>
                <h3>Cluster health : {this.state.clusterInfo.lb_status}</h3>
                <p>This is a stream</p>
            </div>
        );
    }
}
