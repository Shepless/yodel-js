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
                beforeInject: function (resource, attrs) {
                    attrs.isConnected = false;
                    attrs.socket = webSocketFactory.create(attrs.id);

                    attrs.socket.on('connect', function () {
                        attrs.isConnected = true;
                    });

                    attrs.socket.on('disconnect', function () {
                        attrs.isConnected = false;
                    });

                    attrs.socket.on('new_client', function (client) {
                        Client.inject(client, {
                            linkInverse: true
                        });
                    });
                }
            });
        }]);
})();