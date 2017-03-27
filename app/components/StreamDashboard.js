// @flow
import React, {Component} from 'react';
import StreamMessages from './StreamMessages';

export default class StreamDashboard extends Component {

    constructor(props) {
        console.log('constructor')
        super(props);
        this.state = {
            graylogApi: props.graylogApi,
            intervalId: null,
            updated: '',
            streamInfo: props.streamInfo,
            processedData: {},
            liveData: {}
        };
    }

    componentDidMount() {
        var intervalId = setInterval(this.getFreshData.bind(this), 2000);
        this.setState({intervalId: intervalId});
        this.getFreshData();
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getFreshData() {
        let self = this;
        let graylog = this.state.graylogApi;

        graylog.searchRelative({ // parameters
            query: 'streams:' + self.state.streamInfo.id,
            filter: 'streams:' + self.state.streamInfo.id,
            range: '3600',
            limit: 12
        }, function (err, data) { // callback
            if (!err) {
                // Process data
                self.processStreamData(data);
                // Update view
                self.setState({
                    liveData: data,
                    updated: self.getFormattedTime()
                });
            }
        });
    }

    getFormattedTime() {
        return new Date().toLocaleTimeString();
    }

    /**
     * @todo move to helper
     */
    processStreamData(data) {
        console.log(data);
        var criticalCount = 0;
        var messages = [];

        for (var i = 0; i < data.messages.length; i++) {
            var message = data.messages[i].message;
            messages.push(message);
            if (message.level <= 1) {
                criticalCount = criticalCount + 1;
            }
        }

        this.state.processedData.criticalCount = criticalCount;
        this.state.processedData.messages = messages;
    }

    render() {
        // @see https://isabelcastillo.com/error-info-messages-css
        // @todo make components
        let messages = '';
        if (this.state.streamInfo.streamJustCreated !== undefined) {
            // @todo update database
            this.state.streamInfo.streamJustCreated = false;
            messages = <div className="msg-success">
                <i className="fa fa-check" />
                Graylog stream was successfully created !
            </div>;
        }

        return (
            <div id={'stream-' + this.props.streamId} className="stream-dashboard">
                {messages}
                <h1 className="title is-3">Stream {this.props.streamInfo.title}</h1>

                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Last update</p>
                            <p className="title">{this.state.updated}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total messages</p>
                            <p className="title">{this.state.liveData.total_results}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Critical</p>
                            <p className="title">{this.state.processedData.criticalCount}</p>
                        </div>
                    </div>
                </nav>

                <StreamMessages
                    messages={this.state.processedData.messages}
                />

            </div>
        );
    }
}
