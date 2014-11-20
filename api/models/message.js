'use strict';

var uuid = require('node-uuid');

var Message = function (clientId, data) {
    this.id = uuid.v4();
    this.clientId = clientId;
    this.timestamp = new Date().getTime();
    this.actor = data.actor;
    this.arguments = data.arguments;
    this.level = data.level;
};

module.exports = Message;