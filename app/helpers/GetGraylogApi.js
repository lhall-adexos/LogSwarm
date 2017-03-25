// @flow
var graylog = require("graylog-api");
/**
 *
 * @returns {*}
 * @param uri
 * @param username
 * @param password
 */
export default (uri: string = '', username: string = '', password: string = '') =>{
    var dummyAnchor = document.createElement('a');
    dummyAnchor.href = uri;
    var port;
    if (dummyAnchor.port != '') {
        port = dummyAnchor.port;
    } else {
        if (dummyAnchor.protocol == 'http:') {
            port = 80;
        } else if (dummyAnchor.protocol == 'https:') {
            port = 443;
        }
    }
    var api = graylog.connect({
        basicAuth: {
            username: username,
            password: password
        },
        protocol: dummyAnchor.protocol.replace(':', ''),
        host: dummyAnchor.hostname,
        port: port,
        path: dummyAnchor.pathname
    });

    return api;
}
