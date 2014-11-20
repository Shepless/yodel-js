'use strict';

var Session = require('../models/session'),
    sessions = [];

module.exports = {
    create: function (name, bridgeType) {
        var session = new Session(name, bridgeType);

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