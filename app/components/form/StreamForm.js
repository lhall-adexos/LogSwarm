// @flow
import React, {Component} from 'react';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../../store/configureStore';
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import Options from './Options';
import { streamsDb } from '../../helpers/Datastore';
import getGraylogApi from '../../helpers/GetGraylogApi';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

export default class StreamForm extends Component {

    constructor(props) {
        super(props);
        let time = new Date().getTime();
        this.state = {
            update: time,
            formSent: false,
            username: '',
            password: '',
            uri: '',
            stream: null,
            streams: []
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
        console.log('Submitted');
        console.log(this.state);
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

        let api;
        if (valid) {
            let _this = this;
            // Load streams
            api = getGraylogApi(this.state.uri, this.state.username, this.state.password);

            if (this.state.stream === null) {
                api.getStreams(function(err, data) {  // only callback
                    if (!err) {
                        console.log(data);
                        let time = new Date().getTime();
                        console.log("Stream ID " + data.streams[0].id);
                        _this.setState({
                            update: time,
                            streams: data.streams
                        });
                        console.log(_this.state);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                this.saveData(api);
            }
        }
        else {
            console.log('Form is not valid');
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

    saveData(graylogApi) {
        console.log('Saving data');

        if (!this.state.stream) {
            console.log("Stream ID unavailable");
            return false;
        }

        let streamInfo = graylogApi.getStream(null, { // path
            streamId: this.state.stream
        }, function (err, data) { // callback
            if (!err) {
                console.log("Stream info retrieved", data);
                var storeData = {
                    streamInfo: data
                };
                storeData.streamJustCreated = true;
                console.log(storeData);

                var doc = {
                    storeData
                };
                // Save data and move user to the new stream page
                streamsDb.loadDatabase(function (err) {
                    streamsDb.insert(doc, function (err, newDoc) {
                        if (newDoc._id) {
                            console.log('New data inserted : ' + newDoc._id);
                            history.push('/stream/' + newDoc._id);
                            return true;
                        }
                    });
                });
            }
        })
        return false;
    }

    render() {
        console.log('rendering stream form ' + this.state.update);
        let selectStream = '';
        let validationText = 'Load streams';
        if (this.state.streams.length > 0) {
            console.log('Streams found');
            var options = [];
            for (var i = 0; i < this.state.streams.length; i++) {
                console.log(this.state.streams[i]);
                var stream = this.state.streams[i];
                if ('undefined' !== stream.id) {
                    options.push({
                        id: stream.id,
                        label: stream.title
                    });
                }
            }

            validationText = 'Save new stream';

            selectStream = <div className="form-group">
                <label>Select stream</label>
                <Options
                    onChange={this.handleInputChange}
                    uniqueName="stream"
                    required={true}
                    items={options} />
            </div>
        }



        return <div className="form-container" key={'udpated-' + this.state.update}>

            <form id="StreamForm" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <label>User</label>
                    <TextInput
                        ref="username"
                        text="Username"
                        uniqueName="username"
                        required={true}
                        validate={() => this.commonValidate()}
                        onChange={this.handleInputChange}
                        value={this.state.username}
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
                        value={this.state.password}
                    />
                </div>
                <div className="form-group">
                    <label>URI</label>
                    <TextInput
                        ref="uri"
                        text="https://graylog.org/api"
                        uniqueName="uri"
                        required={true}
                        validate={() => this.commonValidate()}
                        onChange={this.handleInputChange}
                        value={this.state.uri}
                    />
                </div>

                {selectStream}

                <div className="form-actions">
                    <button type="submit" className="btn btn-form btn-primary">{validationText}</button>
                </div>
            </form>
        </div>;
    }
}