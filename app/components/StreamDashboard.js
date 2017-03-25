// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: new Date().getTime(),
            streamInfo: props.streamInfo,
            clusterStats: {}
        };
    }

    render() {

        // @see https://isabelcastillo.com/error-info-messages-css
        // @todo make components
        let messages = '';
        if (this.state.streamInfo.streamJustCreated !== undefined) {
            // @todo update database
            this.state.streamInfo.streamJustCreated = false;
            messages = <div className="msg-success">
                <i className="fa fa-check"></i>
                Graylog stream was successfully created !
            </div>;
        }

        return (
            <div id={'stream-' + this.props.streamId} className="stream-dashboard" key={'last-updated-' + this.state.updated}>
                {messages}
                <h1>Stream {this.props.streamInfo.title}</h1>
                <p>This is a stream</p>
            </div>
        );
    }
}
