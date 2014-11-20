(function () {
    'use strict';

    angular.module('yodel.messages')
        .factory('message-model', ['DS', function (DS) {
            return DS.defineResource({
                name: 'message',
                relations: {
                    belongsTo: {
                        client: {
                            localField: 'client',
                            localKey: 'clientId',
                            parent: true
                        }
                    }
                }
            });
        }]);
})();