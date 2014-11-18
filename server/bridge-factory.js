'use strict';

var path = require('path'),
    util = require('util'),
    buildify = require('buildify');

module.exports = {
    create: function (session) {
        var socketIoClientPath = 'client/scripts/bower_components/socket.io-client/socket.io.js',
            bridgePath = 'client/bridge-template.js',
            outputFilePath = path.normalize(util.format('%s/%s.js', 'client/sessions/', session.id));

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