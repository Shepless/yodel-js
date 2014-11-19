'use strict';

var Session = require('../models/session'),
    sessions = [];

module.exports = {
    create: function (useragent, ip) {
        var session = new Session(useragent, ip);

        sessions.push(session);

        return session;
    },
    get: function (id) {
        return sessions.filter(function(session) {
            return session.id === id;
        })[0];
    },
    getAll: function () {
        return sessions;
    }
};