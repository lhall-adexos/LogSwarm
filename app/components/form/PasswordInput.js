// @flow
import React, {Component} from 'react';
import TextInput from './TextInput';
import InputError from './InputError';

export default class PasswordInput extends TextInput {
    constructor(props) {
        super(props);
        this.state = {
            required: (props.required),
            isEmpty: true,
            value: '',
            valid: false,
            errorMessage: "Input is invalid",
            emptyMessage: "Input is required",
            errorVisible: false
        };
    }

    render() {

        return (
            <div className="form-group">
                <input
                    type="password"
                    placeholder={this.props.text}
                    className={'form-control input input-' + this.props.uniqueName}
                    onChange={(e) => this.handleChange(e)}
                    onBlur={(e) => this.handleBlur(e)}
                    name={this.props.uniqueName}
                    value={this.state.value} />

                <InputError
                    visible={this.state.errorVisible}
                    errorMessage={this.state.errorMessage} />
            </div>
        );
    }
}