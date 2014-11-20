(function () {
    'use strict';

    angular.module('yodel.sessions')
        .factory('session-model', ['web-socket-factory', 'DS', 'client-model', function (webSocketFactory, DS, Client) {
            return DS.defineResource({
                name: 'session',
                relations: {
                    hasMany: {
                        client: {
                            localField: 'clients',
                            foreignKey: 'sessionId'
                        }
                    }
                },
                afterInject: function (resource, attrs) {
                    attrs.isConnected = false;
                    attrs.socket = webSocketFactory.create(attrs.id);

                    attrs.socket.on('connect', function () {
                        attrs.isConnected = true;
                    });

                    attrs.socket.on('disconnect', function () {
                        attrs.isConnected = false;
                    });

//                    attrs.socket.on('local_message', function (message) {
//                        var client = attrs.clients.filter(function (client) {
//                            return (client.id === message.clientId);
//                        })[0];
//
//                        client.messages.push(message);
//                    });

                    attrs.socket.on('new_client', function (client) {
                        Client.inject(client, {
                            findBelongsTo: true
                        });
                    });
                }
            });
        }]);
})();