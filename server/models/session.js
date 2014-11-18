'use strict';

var uuid = require('node-uuid'),
    ip = require('ip'),
    SocketFactory = require('../socket-factory'),
    Client = require('./client');

function Session () {
    var me = this;

    me.id = uuid.v4();
    me.port = 3000;
    me.serverIp = ip.address();
    me.clients = [];

    var socket = SocketFactory.create(me.id);

    socket.on('connection', function (socketInstance) {
        var isClient = socketInstance.request._query.isClient,
            clientId = socketInstance.request._query.clientId;

        if (isClient && !clientId) {
            var newClient = new Client(me.id, socketInstance.request);
            me.clients.push(newClient);
            socket.emit('new_client', newClient);
        }

        socketInstance.on('client_message', function (message) {
            var matchedClient = me.findClient(message.clientId);

            if (matchedClient) {
                var newMessage = matchedClient.addMessage(message);
                socketInstance.broadcast.emit('local_message', newMessage);
            }
        });
    });
}

Session.prototype.findClient = function (clientId) {
    var me = this;

    return me.clients.filter(function (client) {
        return (clientId === client.id);
    })[0];
};

module.exports = Session;