'use strict';

var util = require('util'),
    Bridge = require('./bridge'),
    AngularBridge = function (sessionId, sessionIp, sessionPort, data) {
        Bridge.apply(this, arguments);

        this.moduleName = data.moduleName;
        this.bridgePath = 'api/bridge-templates/angular.js';
    };

util.inherits(AngularBridge, Bridge);

AngularBridge.prototype.formatFileContents = function (content) {
    var me = this;

    return content
        .replace('{{serverIp}}', me.sessionIp)
        .replace('{{port}}', me.sessionPort)
        .replace('{{sessionId}}', me.sessionId)
        .replace('{{moduleName}}', me.moduleName);
};

module.exports = AngularBridge;