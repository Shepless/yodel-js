'use strict';

var _ = require('lodash'),
    uuid = require('node-uuid'),
    platform = require('platform');

var Client = function (sessionId, socketRequest) {
    this.sessionId = sessionId;
    this.id = uuid.v4();
    this.userAgent = platform.parse(socketRequest.headers['user-agent']);
    this.address = socketRequest.connection.remoteAddress;
    this.messages = [];
};

Client.prototype.addMessage = function(message) {
    var me = this;

    var newMessage = _.extend(message, {
        clientId: me.id
    });

    me.messages.push(newMessage);

    return newMessage;
};

module.exports = Client;