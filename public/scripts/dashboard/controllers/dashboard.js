(function () {
    'use strict';

    angular.module('yodel.dashboard')
        .controller('dashboard-controller', ['$scope', 'session-service', 'sessions', function ($scope, sessionService, sessions) {
            $scope.sessions = sessions;

            $scope.createSession = function () {
                sessionService.create().then(function (newSession) {
                    $scope.sessions.push(newSession);
                });
            }
        }]);
})();