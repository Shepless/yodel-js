'use strict';

var types = {};

module.exports = {
    register: function (type, Bridge) {
        types[type] = Bridge;
    },
    create: function (session, data) {
        var Bridge = types[data.bridgeType];

        if (!Bridge) {
            throw new Error('Cannot find bridge type ' + data.bridgeType);
        }

        return new Bridge(session.id, session.serverIp, session.port, data);
    }
};