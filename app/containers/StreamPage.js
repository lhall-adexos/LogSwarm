// @flow
import React, { Component } from 'react';
import Stream from '../components/Stream';

export default class StreamPage extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    console.log('Navigating to ' + this.props.params.streamId)
    return (
      <Stream key={this.props.params.streamId} streamId={this.props.params.streamId} />
    );
  }
}
