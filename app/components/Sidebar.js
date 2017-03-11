// @flow
import React, { Component } from 'react';
import NewStreamButton from '../components/buttons/NewStreamButton';
import StreamButtons from '../components/buttons/StreamButtons';

export default class Sidebar extends Component {

    render() {
        return (
            <div id="sidebar" className="pane-mini sidebar padded">
                <StreamButtons />
                <NewStreamButton />
            </div>
        );
    }
}
