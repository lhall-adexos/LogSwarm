// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './StreamButton.css';
import image from '../../images/circle-blank.svg';
import {streamsDb} from '../../helpers/Datastore';

export default class StreamButtons extends Component {
    buttons = [];

    constructor(props) {
        super(props);
        this.state = {
            key: Math.random()
        };

        let _this = this;

        let streams;
        streamsDb.loadDatabase(function (err) {
            console.log('DB is loaded');
            streamsDb.find({}, function (err, docs) {
                streams = docs;
                for (var i=0; i < docs.length; i++) {
                    let button = streams[i];
                    _this.buttons.push(<Link key={'stream' + button._id} className={styles['stream']} to={'/stream/' + button._id}>
                        <img src={image} />
                        <span>{button.stream.info.title.charAt(0)}</span>
                    </Link>);
                }
                _this.setState({key: Math.random()});
            });
        })
    }

    render() {
        return <div className="stream-list" key={this.state.key}>{this.buttons}</div>;
    }
}