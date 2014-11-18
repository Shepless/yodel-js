'use strict';

var path = require('path'),
    util = require('util'),
    buildify = require('buildify');

module.exports = {
    create: function (session) {
        var socketIoClientPath = 'public/scripts/bower_components/socket.io-client/socket.io.js',
            bridgePath = 'api/bridge-templates/default.js',
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