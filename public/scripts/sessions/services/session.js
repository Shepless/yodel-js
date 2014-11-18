(function () {
    'use strict';

    angular.module('yodel.sessions')
        .service('session-service', ['$http', 'session-model', function ($http, SessionModel) {
            this.create = function () {
                return $http.post('/session').then(function (response) {
                    return new SessionModel(response.data);
                });
            };

            this.getAll = function () {
                return $http.get('/session').then(function (response) {
                    return response.data.map(function (sessionData) {
                        return new SessionModel(sessionData);
                    });
                });
            };

            this.get = function (id) {
                return $http.get('/session/' + id).then(function (response) {
                    return new SessionModel(response.data);
                });
            };
        }]);
})();