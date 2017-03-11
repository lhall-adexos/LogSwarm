// @flow
import React, { Component } from 'react';
import NewStreamButton from '../components/buttons/NewStreamButton';

export default class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar" className="pane-mini sidebar padded">
                <NewStreamButton />
            </div>
        );
    }
}
