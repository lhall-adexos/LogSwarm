// @flow
import React, {Component} from 'react';

export default class Stream extends Component {

    constructor(props) {
        console.log('constructor')
        super(props);
        this.state = {
            graylogApi: props.graylogApi,
            intervalId: null,
            updated: new Date().getTime(),
            streamInfo: props.streamInfo,
            processedData: {},
            liveData: {}
        };
    }

    componentDidMount() {
        var intervalId = setInterval(this.getFreshData.bind(this), 2000);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    timer() {
        console.log(this.state);
        // setState method is used to update the state
        this.setState({currentCount: this.state.currentCount - 1});
    }

    getFreshData() {
        let self = this;
        let graylog = this.state.graylogApi;

        graylog.searchRelative({ // parameters
            query: 'streams:' + self.state.streamInfo.id,
            range: '7200'
        }, function(err, data) { // callback
            if (!err) {
                // Process data
                self.processStreamData(data);
                // Update view
                self.setState({
                    liveData: data,
                    updated: new Date().getTime()
                });
            }
        });
    }

    /**
     * @todo move to helper
     */
    processStreamData(data) {
        console.log(this.state);
        console.log("Processing", data);
        var criticalCount = 0;

        for (var i=0; i<data.messages.length; i++) {
            var message = data.messages[i].message;
            if (message.level <= 1) {
                criticalCount = criticalCount + 1;
            }
        }

        this.state.processedData.criticalCount = criticalCount;
    }

    render() {
        // @see https://isabelcastillo.com/error-info-messages-css
        // @todo make components
        let messages = '';
        if (this.state.streamInfo.streamJustCreated !== undefined) {
            // @todo update database
            this.state.streamInfo.streamJustCreated = false;
            messages = <div className="msg-success">
                <i className="fa fa-check"></i>
                Graylog stream was successfully created !
            </div>;
        }

        return (
            <div id={'stream-' + this.props.streamId} className="stream-dashboard">
                {messages}
                <h1>Stream {this.props.streamInfo.title}</h1>
                <p>This is a stream</p>
                <div className="columns">
                    <div className="column">
                        Last update : {this.state.updated}
                    </div>
                    <div className="column">
                        Messages : {this.state.liveData.total_results}
                    </div>
                    <div className="column">
                        Critical : {this.state.processedData.criticalCount}
                    </div>
                    <div className="column">
                        Fourth column
                    </div>
                </div>
            </div>
        );
    }
}
