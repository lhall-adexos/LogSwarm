// @flow
import React, {Component} from 'react';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../../store/configureStore';
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import {streamsDb} from '../../helpers/Datastore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

export default class StreamForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formSent: false,
            username: '',
            password: '',
            uri: '',
            stream: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        var valid = true;

        for (var ref in this.refs) {
            var state = this.refs[ref].state;
            if (state.required) {
                this.validateRequired(this.refs[ref]);
            }
            if (state.valid == false) {
                valid = false;
            }
        }

        if (valid) {
            this.saveData();
        }

        event.preventDefault();
    }

    validateRequired(input) {
        if (input.state.required == true && input.state.isEmpty) {
            input.setState({
                errorMessage: input.state.emptyMessage,
                errorVisible: true
            });
        }
    }

    validateEmail(value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    commonValidate() {
        return true;
    }

    saveData() {
        var data = this.state;
        data.streamJustCreated = true;
        var doc = {
            data
        };
        // Save data and move user to the new stream page
        streamsDb.loadDatabase(function (err) {
            streamsDb.insert(doc, function (err, newDoc) {
                if (newDoc._id) {
                    console.log('New data inserted : ' + newDoc._id);
                    history.push('/stream/' + newDoc._id);
                }
            });
        });
    }

    render() {
        return <div className="form-container">

            <form id="StreamForm" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <TextInput
                        ref="username"
                        text="Username"
                        uniqueName="username"
                        required={true}
                        validate={() => this.commonValidate()}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <PasswordInput
                        ref="password"
                        text="Password"
                        uniqueName="password"
                        required={true}
                        validate={() => this.commonValidate()}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>URI</label>
                    <TextInput
                        ref="uri"
                        text="https://graylog.org/api/"
                        uniqueName="uri"
                        required={true}
                        validate={() => this.commonValidate()}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Stream</label>
                    <TextInput
                        ref="stream"
                        text="Stream ID"
                        uniqueName="stream"
                        required={true}
                        validate={() => this.commonValidate()}
                        onChange={this.handleInputChange}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-form btn-primary">Save</button>
                </div>
            </form>
        </div>;
    }
}