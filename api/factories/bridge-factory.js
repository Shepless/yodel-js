'use strict';

var path = require('path'),
    util = require('util'),
    buildify = require('buildify'),
    bridgeTypes = {};

module.exports = {
    register: function (bridgeType, fileName) {
        bridgeTypes[bridgeType] = fileName;
    },
    create: function (session, bridgeType) {
        if (!bridgeTypes[bridgeType]) {
            throw new Error('Cannot find bridge type ' + bridgeType);
        }

        var socketIoClientPath = 'public/scripts/bower_components/socket.io-client/socket.io.js',
            bridgePath = 'api/bridge-templates/' + bridgeTypes[bridgeType],
            outputFilePath = path.normalize(util.format('.sessions/%s.js', session.id));

        buildify(process.cwd())
            .concat([socketIoClientPath, bridgePath])
            .perform(function (content) {
                return content
                    .replace('{{serverIp}}', session.serverIp)
                    .replace('{{port}}', session.port)
                    .replace('{{sessionId}}', session.id);
            })
            .save(outputFilePath);

        return outputFilePath;
    }
};