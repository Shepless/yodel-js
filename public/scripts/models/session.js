(function () {
    'use strict';

    angular.module('node-console')
        .factory('session-model', ['socketFactory', function (socketFactory) {
            var SessionModel = function (json) {
                var me = this;

                angular.extend(me, json);
                me.isConnected = false;

                var myIoSocket = io.connect('http://localhost:3000/' + me.id),
                    mySocket = socketFactory({
                        ioSocket: myIoSocket
                    });

                mySocket.on('connect', function () {
                    me.isConnected = true;
                });

                mySocket.on('disconnect', function () {
                    me.isConnected = false;
                });

                mySocket.on('local_message', function (message) {
                    var client = me.clients.filter(function (client) {
                        return (client.id === message.clientId);
                    })[0];

                    client.messages.push(message);
                });

                mySocket.on('new_client', function (message) {
                    me.clients.push(message);
                });
            };

            return SessionModel;
        }]);
})();