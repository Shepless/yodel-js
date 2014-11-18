(function () {
    'use strict';

    angular.module('yodel.sessions')
        .factory('session-model', ['web-socket-factory', function (webSocketFactory) {
            var SessionModel = function (json) {
                var me = this;

                angular.extend(me, json);
                me.isConnected = false;
                me.socket = webSocketFactory.create(me.id);

                me.socket.on('connect', function () {
                    me.isConnected = true;
                });

                me.socket.on('disconnect', function () {
                    me.isConnected = false;
                });

                me.socket.on('local_message', function (message) {
                    var client = me.clients.filter(function (client) {
                        return (client.id === message.clientId);
                    })[0];

                    client.messages.push(message);
                });

                me.socket.on('new_client', function (message) {
                    me.clients.push(message);
                });
            };

            return SessionModel;
        }]);
})();