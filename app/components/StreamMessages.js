// @flow
import React, { Component } from 'react';
import hash from 'object-hash';
import styles from './Messages.css';

export default class StreamMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        };
        console.log(this.state);
    }

    componentWillReceiveProps(newProps) {
        this.setState({messages: newProps.messages});
    }

    shouldComponentUpdate(nextProps) {
        if (this.state.messages === undefined) {
            this.state.messages = {};
        }
        if (nextProps.messages === undefined) {
            return false;
        }
        return (hash(this.state.messages) != hash(nextProps.messages));
    }

    getMessagesRows() {
        var rows = [];
        var messages = this.state.messages;
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            rows.push(this.getMessagesRow(message));
        }
        return rows;
    }

    getMessagesRow(message) {
        return <tr className={styles['status-' + message.level]} key={"message-" + message._id}>
            <td>{message.level}</td>
            <td>{message.message}</td>
            <td>{message.source}</td>
        </tr>
    }

    render() {
        console.log("Render messages");
        if (this.state.messages === undefined) {
            return null;
        }

        let rows = this.getMessagesRows();

        return (
            <div className="stream-messages table is-narrow">
                <table>
                    <thead>
                    <tr>
                        <th>Level</th>
                        <th>Message</th>
                        <th>Source</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}
