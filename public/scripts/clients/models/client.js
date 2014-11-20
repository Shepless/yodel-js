(function () {
    'use strict';

    angular.module('yodel.clients')
        .factory('client-model', ['web-socket-factory', 'DS', 'message-model', function (webSocketFactory, DS, Message) {
            return DS.defineResource({
                name: 'client',
                relations: {
                    belongsTo: {
                        session: {
                            localField: 'session',
                            localKey: 'sessionId',
                            parent: true
                        }
                    },
                    hasMany: {
                        message: {
                            localField: 'messages',
                            foreignKey: 'clientId'
                        }
                    }
                },
                beforeInject: function (resource, attrs) {
                    var session = DS.get('session', attrs.sessionId);

                    session.socket.on('local_message', function (message) {
                        Message.inject(message, {
                            linkInverse: true
                        });
                    });
                }
            });
        }]);
})();