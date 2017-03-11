// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class StreamForm extends Component {

    render() {
        return <form id="StreamForm">
            <div className="form-group">
                <label>Username</label>
                <input type="email" className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label>URI</label>
                <input type="uri" className="form-control"
                       placeholder="https://graylog.org/api/"/>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-form btn-primary">Save</button>
            </div>
        </form>;
    }
}