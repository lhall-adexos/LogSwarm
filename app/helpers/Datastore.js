// @flow
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('uYuky$*NHh3*1QInL#@nF4f0HyoEvl');

var Datastore = require('nedb');

export var streamsDb = new Datastore({
    filename: 'app/streams.data',
    afterSerialization: function(str) {
        return cryptr.encrypt(str);
    },
    beforeDeserialization: function(str) {
        return cryptr.decrypt(str);
    }
});
export var settingsDb = new Datastore({
    filename: 'app/settings.data',
    afterSerialization: function(str) {
        return cryptr.encrypt(str);
    },
    beforeDeserialization: function(str) {
        return cryptr.decrypt(str);
    }
});

export default streamsDb;
