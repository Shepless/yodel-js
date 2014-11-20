'use strict';

var uuid = require('node-uuid'),
    ip = require('ip'),
    SocketFactory = require('../factories/socket-factory'),
    Client = require('./client');

function Session(name, bridgeType) {
    var me = this;

    me.id = uuid.v4();
    me.name = name;
    me.port = 3000;
    me.serverIp = ip.address();
    me.created = new Date().toString();
    me.lastActive = me.created;
    me.bridgeType = bridgeType;
    me.clients = [];

    var socket = SocketFactory.create(me.id);

    socket.on('connection', function (socketInstance) {
        var isClient = socketInstance.request._query.isClient,
            clientId = socketInstance.request._query.clientId;

        if (isClient && !clientId) {
            var newClient = new Client(me.id, socketInstance.request);
            me.clients.push(newClient);
            console.log('pushing new client....', newClient.id);
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