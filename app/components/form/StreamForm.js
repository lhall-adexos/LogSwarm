// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'

export default class StreamForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

        console.log(this.state);

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Validate form');

        for (var ref in this.refs) {
            var state = this.refs[ref].state;
            console.log(state);
            if (state.required) {
                this.validateRequired(this.refs[ref]);
            }
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

    }

    render() {
        return <form id="StreamForm" onSubmit={(e) => this.handleSubmit(e)}>
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
        </form>;
    }
}