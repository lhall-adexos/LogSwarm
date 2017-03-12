// @flow

// @todo initialize Graylog API client from this module
var dummyAnchor = document.createElement('a');
dummyAnchor.href = props.streamData.uri;
var port;
if (dummyAnchor.port != '') {
    port = dummyAnchor.port;
} else {
    if (dummyAnchor.protocol == 'https:') {
        port = 443;
    }
}

var api = graylog.connect({
    basicAuth: {
        username: props.streamData.username,
        password: props.streamData.password
    },
    protocol: dummyAnchor.protocol.replace(':', ''),
    host: dummyAnchor.hostname,
    port: port,
    path: dummyAnchor.pathname
});

export default api;
