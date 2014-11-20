'use strict';

var _ = require('lodash'),
    uuid = require('node-uuid'),
    platform = require('platform'),
    Message = require('./message');

var Client = function (sessionId, socketRequest) {
    this.sessionId = sessionId;
    this.id = uuid.v4();
    this.userAgent = platform.parse(socketRequest.headers['user-agent']);
    this.address = socketRequest.connection.remoteAddress;
    this.messages = [];
};

Client.prototype.addMessage = function(data) {
    var me = this;

    var message = new Message(data.clientId, data);

    me.messages.unshift(message);

    return message;
};

module.exports = Client;