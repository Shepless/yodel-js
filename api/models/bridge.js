'use strict';

var path = require('path'),
    util = require('util'),
    buildify = require('buildify'),
    socketIoClientPath = 'public/scripts/bower_components/socket.io-client/socket.io.js';


var Bridge = function (sessionId, sessionIp, sessionPort, data) {
    this.sessionId = sessionId;
    this.sessionIp = sessionIp;
    this.sessionPort = sessionPort;
    this.type = data.bridgeType;
    this.bridgePath = 'api/bridge-templates/default.js';
    this.outputFilePath = path.normalize(util.format('.sessions/%s.js', this.sessionId));
};

Bridge.prototype.createBridgeFile = function () {
    var me = this;

    buildify(process.cwd())
        .concat([socketIoClientPath, me.bridgePath])
        .perform(me.formatFileContents.bind(me))
        .save(me.outputFilePath);
};

Bridge.prototype.formatFileContents = function (content) {
    var me = this;

    return content
        .replace('{{serverIp}}', me.sessionIp)
        .replace('{{port}}', me.sessionPort)
        .replace('{{sessionId}}', me.sessionId);
};

module.exports = Bridge;