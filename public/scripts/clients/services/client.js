(function () {
    'use strict';

    angular.module('yodel.clients')
        .service('client-service', ['$http', function ($http) {
            this.getAll = function () {
                return $http.get('/session/:sessionId/client').then(function (response) {
                    return response.data.map(function (sessionData) {
                        return sessionData;
                    });
                });
            };

            this.get = function (sessionId, clientId) {
                return $http.get('/session/' + sessionId + '/client/' + clientId).then(function (response) {
                    return response.data;
                });
            };
        }]);
})();