'use strict';

var socketIo = require('socket.io'),
    io;

module.exports = {
    init: function (server) {
        io = socketIo(server);
    },

    create: function (sessionId) {
        return io.of('/' + sessionId);
    },

    get io() {
        return io;
    }
};